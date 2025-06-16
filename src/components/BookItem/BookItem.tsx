import { CSSProperties, FC, useMemo } from "react";
import { Volume } from "../../types/Volume";
import { useUpdateUser, useUser } from "../../context/useUser";

interface BookItemProps {
  data: Volume[];
  index: number;
  style?: CSSProperties;
  additionalData?: any;
}

const BookItem: FC<BookItemProps> = ({ data, index, style }) => {
  const volume = data[index];
  const { title, subtitle, description } = volume.volumeInfo;

  const { isLogged, read } = useUser();
  const { addToRead, removeFromRead } = useUpdateUser();

  const isRead = useMemo(() => {
    return read.some((fav) => fav.id === volume.id);
  }, [read.length, volume.id]);

  const toggleRead = async () => {
    if (!isLogged) return;

    if (isRead) {
      await removeFromRead(volume);
    } else {
      await addToRead(volume);
    }
  };

  return (
    <div
      className="bg-gray-800 text-white p-4 rounded shadow-sm hover:shadow-md transition-shadow flex flex-col"
      style={style}
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold">{title || "Untitled"}</h2>
          {subtitle && (
            <p className="text-sm text-gray-300 italic mt-1">{subtitle}</p>
          )}
        </div>
        {isLogged ? (
        <button
          onClick={toggleRead}
          disabled={!isLogged}
          aria-pressed={isRead}
          aria-label={isRead ? "Remove from Read" : "Add to Read"}
          className={`ml-4 px-2 py-1 rounded text-sm font-medium transition-colors ${
            isRead
              ? "bg-red-600 hover:bg-red-700"
              : "bg-gray-600 hover:bg-gray-700"
          }`}
          type="button"
        >
          
            
              {isRead ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 12H4"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              )}
            
          
        </button>) : null}
      </div>

      {description && (
        <p
          className="text-sm text-gray-300 mt-2 cursor-help flex-1 transition-all duration-300 ease-in-out overflow-hidden"
          title={description}
        >
          {description}
        </p>
      )}

      <div className="text-xs text-gray-400 mt-2 leading-snug space-y-1">
        <p>
          {volume.volumeInfo.authors?.join(", ") ?? "Unknown Author"}
          {volume.volumeInfo.publishedDate ? (
            <span> · {volume.volumeInfo.publishedDate}</span>
          ) : null}
        </p>
        <p>
          {volume.volumeInfo.pageCount ? (
            <span>{volume.volumeInfo.pageCount} pages</span>
          ) : null}
          {volume.volumeInfo.averageRating != null ? (
            <span>
              {volume.volumeInfo.pageCount ? " · " : ""}★{" "}
              {volume.volumeInfo.averageRating.toFixed(1)}
            </span>
          ) : null}
          {volume.volumeInfo.categories?.[0] ? (
            <span> · {volume.volumeInfo.categories[0]}</span>
          ) : null}
        </p>
      </div>
    </div>
  );
};

export default BookItem;
