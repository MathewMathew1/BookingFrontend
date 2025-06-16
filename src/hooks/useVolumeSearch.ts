import { useState, useEffect, useCallback, useRef } from "react";
import { FieldType, OrderBy } from "../types/Search";
import { Volume } from "../types/Volume";
import { useUpdateToast } from "../context/useToast";
import { BooksEndpoints } from "../api/endpoints";
import { severityColors } from "../types/Toast";


type SearchParams = {
  q: string;
  field: FieldType;
  orderBy: OrderBy;
  langRestrict: string;
};

export function useVolumesSearch() {
  const [volumes, setVolumes] = useState<Volume[]>([]);
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true)

  const { addToast } = useUpdateToast();

  const fetchInProgressRef = useRef(false);

  const serializeParamsToUrl = useCallback((params: SearchParams) => {
    const urlParams = new URLSearchParams();
    if (params.q) urlParams.set("q", params.q);
    if (params.field) urlParams.set("field", params.field);
    if (params.orderBy) urlParams.set("orderBy", params.orderBy);
    if (params.langRestrict) urlParams.set("langRestrict", params.langRestrict);

    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }, []);

  const fetchVolumes = useCallback(
    async (params: SearchParams, start: number, replaceResults: boolean) => {
      setLoading(true);
      fetchInProgressRef.current = true;

      const url = BooksEndpoints.search({
        q: params.q,
        field: params.field,
        orderBy: params.orderBy,
        startIndex: start,
        langRestrict: params.langRestrict,
      });

      try {
        const response = await fetch(url);

        if (response.status === 429) {
          addToast({
            toastText: "Rate limit exceeded. Please try again later.",
            severity: severityColors.error,
          });
          setLoading(false);
          return;
        }

        if (!response.ok) {
          addToast({
            toastText: `Error fetching results: ${response.statusText}`,
            severity: severityColors.error,
          });
          setLoading(false);
          return;
        }
        
        const data = await response.json();
        setHasMore(data.hasMore || false)
        const newVolumes: Volume[] = data.items || [];

        setVolumes((prev) =>
          replaceResults ? newVolumes : [...prev, ...newVolumes]
        );
        setStartIndex(start + newVolumes.length);
      } catch (error) {
        addToast({
          toastText: "Network error occurred during search.",
          severity: severityColors.error,
        });
        console.error("Search error:", error);
      } finally {
        fetchInProgressRef.current = false;
        setLoading(false);
      }
    },
    [addToast]
  );

  const handleSearch = useCallback(
    (params: SearchParams) => {
      setHasMore(true)
      setSearchParams(params);
      setStartIndex(0);
      serializeParamsToUrl(params);
      fetchVolumes(params, 0, true);
    },
    [fetchVolumes, serializeParamsToUrl]
  );

  const handleFetchMore = useCallback(() => {

    if (!searchParams || fetchInProgressRef.current || !hasMore) return;
  
    fetchVolumes(searchParams, startIndex, false);
  }, [fetchVolumes, loading, searchParams, startIndex]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (!q) return;

    const field = (params.get("field") as FieldType) || FieldType.general;
    const orderBy = (params.get("orderBy") as OrderBy) || OrderBy.relevance;
    const langRestrict = params.get("langRestrict") || "";

    const initialParams: SearchParams = { q, field, orderBy, langRestrict };
    setSearchParams(initialParams);
    fetchVolumes(initialParams, 0, true);
  }, []);

  return {
    volumes,
    loading,
    handleSearch,
    handleFetchMore,
    searchParams,
  };
}
