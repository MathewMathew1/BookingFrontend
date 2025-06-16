import { useEffect, useRef, useCallback, useState } from "react";
import { Volume } from "../../types/Volume";
import BookItem from "../BookItem/BookItem";
import BookItemSkeleton from "../BookItemSkeletor/BookItemSkeletor";
import {
  VirtualizedList,
  VirtualizedListRef,
} from "@mathewmathew1/virtualized-list";

interface VolumeListProps {
  volumes: Volume[];
  fetchMore: () => void;
  loading: boolean;
}

const VolumeList = ({ volumes, fetchMore, loading }: VolumeListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemHeight, setItemHeight] = useState(150);

  const ref = useRef<VirtualizedListRef | null>(null);

  // now probably better idea would be to get height of component and virtualized with different sizes, but it requires some setup
  // i would probably remove virtualization at all there not that many items anyway
  const calculateHeight = () => {
    const windowWidth = window.innerWidth;
    const height = Math.min(Math.max(windowWidth * 0.35, 250), 350);

    setItemHeight(height);
  };

  useEffect(() => {
    calculateHeight();
    window.addEventListener("resize", calculateHeight);
    return () => window.removeEventListener("resize", calculateHeight);
  }, []);

  const handleScroll = useCallback(
    (offset: number) => {
      const container = ref.current?.scrollContainer;
      if (!container) return;

      const atBottom =
        offset + container.clientHeight >= container.scrollHeight - 10;

      if (atBottom) fetchMore();
    },
    [fetchMore]
  );

  return (
    <div
      ref={containerRef}
      className="mt-6  h-[600px]  bg-gray-900 rounded shadow-inner p-4 border border-gray-700"
    >
      {loading && volumes.length === 0 ? (
        <BookItemSkeleton />
      ) : (
        <>
          {volumes.length === 0 ? (
            <>
              <p className="text-gray-400 mt-2 text-center">No results</p>
            </>
          ) : (
            <VirtualizedList
              ref={ref}
              data={volumes}
              itemSize={itemHeight}
              onScroll={handleScroll}
              direction="vertical"
              height={550}
              ItemComponent={BookItem}
            />
          )}
        </>
      )}
    </div>
  );
};

export default VolumeList;
