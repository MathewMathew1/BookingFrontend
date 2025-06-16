import { useState, useEffect, createContext, useContext } from "react";
import type { Volume } from "../types/Volume";
import type { UserData, UserInfo } from "../types/UserData";
import { AuthEndpoints } from "../api/endpoints";
import { useReadBooks } from "../hooks/useReadBooks";
import { getCachedRead, saveReadToCache } from "../offlineStorage/offlineStorage";

export interface UserContextProps {
  isLogged: boolean;
  finishedAuthenticating: boolean;
  userInfo?: UserInfo;
  read: Volume[];
}

export interface UpdateUserContextProps {
  addToRead: (volume: Volume) => Promise<void>;
  removeFromRead: (volume: Volume) => Promise<void>;
}

export const UserContext = createContext<UserContextProps>({} as UserContextProps);
export const UserUpdateContext = createContext<UpdateUserContextProps>({} as UpdateUserContextProps);

export function useUser() {
  return useContext(UserContext);
}

export function useUpdateUser() {
  return useContext(UserUpdateContext);
}

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);
  const [finishedAuthenticating, setFinishedAuthenticating] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const { read, addToRead, removeFromRead, setRead } = useReadBooks();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(AuthEndpoints.profile, {
          credentials: "include",
        });

        if (response.ok) {
          const data: UserData = await response.json();
          const { read: fetchedRead, ...info } = data;

          setUserInfo(info);
          setRead(fetchedRead || []);
          await saveReadToCache(fetchedRead || []);
          setIsLogged(true);
        } else {
          throw new Error("Unauthorized");
        }
      } catch {
        const offlineRead = await getCachedRead();
        setRead(offlineRead);
        setIsLogged(false); 
      } finally {
        setFinishedAuthenticating(true);
      }
    };

    fetchProfile();
  }, [setRead]);

  return (
    <UserContext.Provider value={{ isLogged, finishedAuthenticating, userInfo, read }}>
      <UserUpdateContext.Provider value={{ addToRead, removeFromRead }}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
};


