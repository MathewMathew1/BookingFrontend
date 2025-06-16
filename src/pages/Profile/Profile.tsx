import { useState } from "react";
import { useUser } from "../../context/useUser";
import BookItem from "../../components/BookItem/BookItem";

export default function Profile() {
  const { userInfo, isLogged, finishedAuthenticating } = useUser();
  const { read } = useUser();

  const [spoilerHidden, setSpoilerHidden] = useState(true);

  if (!finishedAuthenticating) {
    return <div className="text-gray-400 p-4">Loading profile...</div>;
  }

  if (!isLogged || !userInfo) {
    return <div className="text-red-500 p-4">You must be logged in to view the profile.</div>;
  }

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen w-full sm:w-[80%] mx-auto">
      <section className="flex items-center space-x-4 mb-8">
        {userInfo.profilePicture ? (
          <img
            src={userInfo.profilePicture}
            alt="User Avatar"
            className="w-16 h-16 rounded-full object-cover border border-gray-700"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-xl font-semibold">
            {userInfo.email?.[0].toUpperCase() || "U"}
          </div>
        )}
        <div>
          <p className="text-gray-400">{userInfo.email}</p>
        </div>
      </section>

      <section>
        <button
          className="mb-4 px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
          onClick={() => setSpoilerHidden(!spoilerHidden)}
          aria-expanded={!spoilerHidden}
          aria-controls="read-books-list"
          type="button"
        >
          {spoilerHidden ? "Show Read Books" : "Hide Read Books"} ({read.length})
        </button>

        {!spoilerHidden && (
          <>
            {read.length === 0 ? (
              <p className="text-gray-400">No books in your read collection.</p>
            ) : (
              <div
                id="read-books-list"
                className="space-y-6 max-h-[600px] overflow-auto pr-2"
                role="list"
              >
                {read.map((volume, index) => (
                  <BookItem
                    key={volume.id}
                    data={read}
                    index={index}
                    style={{}}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
