import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import * as useUserModule from "../context/useUser";
import Navbar from "../components/Navbar/Navbar";

vi.mock("../context/useUser", () => ({
  useUser: vi.fn(),
}));

const mockedUseUser = vi.mocked(useUserModule.useUser);

describe("Navbar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows login button and question mark when not logged in", () => {
    mockedUseUser.mockReturnValue({ isLogged: false, finishedAuthenticating: true, read: [] });

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByText("?")).toBeInTheDocument();
    expect(screen.queryByTestId("profile-avatar")).not.toBeInTheDocument();
  });

  it("shows profile avatar when logged in", () => {
    mockedUseUser.mockReturnValue({ isLogged: true, finishedAuthenticating: true, read: [] });

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.queryByRole("button", { name: /login/i })).not.toBeInTheDocument();
    expect(screen.queryByText("?")).not.toBeInTheDocument();
    expect(screen.getByTestId("profile-avatar")).toBeInTheDocument();
  });


});
