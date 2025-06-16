import { useEffect, useState } from "react";
import { useUser } from "../context/useUser";
import BookItem from "../components/BookItem/BookItem";

function OfflineReadCollection() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const { read } = useUser();

  useEffect(() => {
    function updateOnlineStatus() {
      setIsOffline(!navigator.onLine);
    }

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  if (!isOffline) return null;

  if (read.length === 0) {
    return <div className="text-gray-400 p-4">No cached read books available offline.</div>;
  }

  return (
    <div className="p-4 bg-gray-900 rounded shadow-md max-h-[600px] overflow-auto">
      <h2 className="text-white text-xl mb-4">Offline Read Collection</h2>
      {read.map((volume, index) => (
        <BookItem key={volume.id} data={read} index={index} />
      ))}
    </div>
  );
}

export default OfflineReadCollection;
