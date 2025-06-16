import { Routes, Route } from "react-router-dom";
import ToastContainer from "./components/ToastContainer/ToastContainer";
import ToastProvider from "./context/useToast";
import { UserDataProvider } from "./context/useUser";
import AuthRoute from "./components/ProtectedRoute/ProtectedRoute";
import Main from "./pages/Main/Main";
import Profile from "./pages/Profile/Profile";
import Navbar from "./components/Navbar/Navbar";
import { useState, useEffect } from "react";
import OfflineReadCollection from "./offlineStorage/OfflineReadCollector";

export default function App() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

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

  return (
    <ToastProvider>
      <UserDataProvider>
        <Navbar />
        {isOffline ? (
          <OfflineReadCollection />
        ) : (
          <main className="sm:p-4 w-full sm:max-w-[90%] sm:mx-auto text-white flex flex-col items-center">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route
                path="/profile"
                element={
                  <AuthRoute
                    requireAuth={true}
                    redirectTo="/"
                    element={<Profile />}
                  />
                }
              />
            </Routes>
          </main>
        )}
        <ToastContainer />
      </UserDataProvider>
    </ToastProvider>
  );
}


