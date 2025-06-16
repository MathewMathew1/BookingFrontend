import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { UserContext, UserUpdateContext } from "../context/useUser";
import type { Volume } from "../types/Volume";
import OfflineReadCollection from "./OfflineReadCollector";

const mockVolume: Volume = {
  id: "abc123",
  volumeInfo: {
    title: "Test Book",
    authors: ["Author One"],
  },
};

describe("OfflineReadCollection", () => {
  const originalNavigatorOnLine = navigator.onLine;

  beforeEach(() => {
    Object.defineProperty(window.navigator, "onLine", {
      value: false,
      configurable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(window.navigator, "onLine", {
      value: originalNavigatorOnLine,
      configurable: true,
    });
  });

  it("renders cached books when offline", () => {
    render(
      <UserContext.Provider
        value={{
          isLogged: true,
          finishedAuthenticating: true,
          userInfo: undefined,
          read: [mockVolume],
        }}
      >
        <UserUpdateContext.Provider
          value={{
            addToRead: async () => {},
            removeFromRead: async () => {},
          }}
        >
          <OfflineReadCollection />
        </UserUpdateContext.Provider>
      </UserContext.Provider>
    );

    expect(screen.getByText("Offline Read Collection")).toBeInTheDocument();
    expect(screen.getByText("Test Book")).toBeInTheDocument();
  });
});

