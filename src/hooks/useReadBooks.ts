import { useState, useEffect } from "react";
import { useUpdateToast } from "../context/useToast";
import { Volume } from "../types/Volume";
import { severityColors } from "../types/Toast";
import { UserBookStorage } from "../api/endpoints";
import { getCachedRead, saveReadToCache } from "../offlineStorage/offlineStorage"

export function useReadBooks() {
  const [read, setRead] = useState<Volume[]>([]);
  const { addToast } = useUpdateToast();

  useEffect(() => {
    getCachedRead().then(setRead);
  }, []);

  useEffect(() => {
    saveReadToCache(read);
  }, [read]);

  const handleResponse = async (response: Response, successMsg: string) => {
    if (response.status === 429) {
      addToast({
        toastText: "Rate limit exceeded. Please try again later.",
        severity: severityColors.error,
      });
      return false;
    }
    if (!response.ok) {
      addToast({
        toastText: `Request failed: ${response.statusText}`,
        severity: severityColors.error,
      });
      return false;
    }
    addToast({ toastText: successMsg, severity: severityColors.success });
    return true;
  };

  const addToRead = async (volume: Volume) => {
    setRead((prev) => {
      if (prev.find((v) => v.id === volume.id)) return prev;
      return [...prev, volume];
    });

    try {
      const response = await fetch(`${UserBookStorage.addToRead}` + encodeURIComponent(volume.id), {
        method: "POST",
        credentials: "include",
      });
      const success = await handleResponse(response, "Book added to read.");
      if (!success) {
        addToast({
          toastText: "Failed to sync add with server, saved offline.",
          severity: severityColors.warning,
        });
      }
    } catch {
      addToast({
        toastText: "Network error while adding book, saved offline.",
        severity: severityColors.warning,
      });
    }
  };

  const removeFromRead = async (volume: Volume) => {
    setRead((prev) => prev.filter((v) => v.id !== volume.id));

    try {
      const response = await fetch(`${UserBookStorage.removeFromRead}` + encodeURIComponent(volume.id), {
        method: "POST",
        credentials: "include",
      });
      const success = await handleResponse(response, "Book removed from read.");
      if (!success) {
        addToast({
          toastText: "Failed to sync removal with server, saved offline.",
          severity: severityColors.warning,
        });
      }
    } catch {
      addToast({
        toastText: "Network error while removing book, saved offline.",
        severity: severityColors.warning,
      });
    }
  };

  return {
    read,
    addToRead,
    removeFromRead,
    setRead,
  };
}

