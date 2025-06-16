import { useState } from "react";
import { FieldType, OrderBy } from "../../types/Search";
import Button from "../Button/Button";

type SearchPanelProps = {
  onSearch: (params: {
    q: string;
    field: FieldType;
    orderBy: OrderBy;
    langRestrict: string;
  }) => void;
  loading: boolean;
};

export default function SearchPanel({ onSearch, loading }: SearchPanelProps) {
  const [q, setQ] = useState("");
  const [field, setField] = useState<FieldType>(FieldType.general);
  const [orderBy, setOrderBy] = useState<OrderBy>(OrderBy.relevance);
  const [langRestrict, setLangRestrict] = useState("");

  const handleSearchClick = () => {
    if (!q.trim()) return;
    onSearch({ q, field, orderBy, langRestrict });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className="p-4 bg-gray-900 text-white rounded shadow-md">
      <div className="flex flex-col md:flex-row md:items-end md:gap-4 gap-4 mb-4">
        <div className="flex-1">
          <label className="block mb-1 font-semibold" htmlFor="query">
            Search Query
          </label>
          <input
            id="query"
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
            placeholder="Enter search terms"
          />
        </div>

        <div className="flex-1">
          <label className="block mb-1 font-semibold" htmlFor="field">
            Field
          </label>
          <select
            id="field"
            value={field}
            onChange={(e) => setField(e.target.value as FieldType)}
            onKeyDown={handleKeyDown}
            className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
          >
            {Object.entries(FieldType).map(([key, val]) => (
              <option key={key} value={val}>
                {key}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block mb-1 font-semibold" htmlFor="orderBy">
            Order By
          </label>
          <select
            id="orderBy"
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value as OrderBy)}
            onKeyDown={handleKeyDown}
            className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
          >
            {Object.entries(OrderBy).map(([key, val]) => (
              <option key={key} value={val}>
                {key}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-24">
          <label className="block mb-1 font-semibold" htmlFor="langRestrict">
            Language
          </label>
          <input
            id="langRestrict"
            type="text"
            maxLength={2}
            value={langRestrict}
            onChange={(e) => setLangRestrict(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-2 bg-gray-800 text-white border border-gray-700 rounded"
            placeholder="en"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button color="blue" onClick={handleSearchClick} disabled={!q.trim()}>
          Search
        </Button>
      </div>
    </div>
  );
}
