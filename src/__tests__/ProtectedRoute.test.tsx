import { describe, it, expect, beforeEach, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import * as useUserModule from "../context/useUser";
import AuthRoute from "../components/ProtectedRoute/ProtectedRoute";

vi.mock("../context/useUser", () => ({
  useUser: vi.fn(),
}));

const mockedUseUser = vi.mocked(useUserModule.useUser);

describe("AuthRoute", () => {
  const mockElement = <div>Protected Content</div>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders null when finishedAuthenticating is false", () => {
    mockedUseUser.mockReturnValue({
      isLogged: false,
      finishedAuthenticating: false,
      read: [],
    });

    const { container } = render(
      <MemoryRouter>
        <AuthRoute requireAuth={true} redirectTo="/login" element={mockElement} />
      </MemoryRouter>
    );

    expect(container.firstChild).toBeNull();
  });

  it("redirects to redirectTo if requireAuth=true and user not logged", () => {
    mockedUseUser.mockReturnValue({
      isLogged: false,
      finishedAuthenticating: true,
      read: [],
    });

    const { container } = render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={<AuthRoute requireAuth={true} redirectTo="/login" element={mockElement} />}
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(container).toHaveTextContent("Login Page");
    expect(container).not.toHaveTextContent("Protected Content");
  });

  it("redirects to redirectTo if requireAuth=false and user logged", () => {
    mockedUseUser.mockReturnValue({
      isLogged: true,
      finishedAuthenticating: true,
      read: [],
    });

    const { container } = render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route
            path="/login"
            element={<AuthRoute requireAuth={false} redirectTo="/profile" element={<div>Login Page</div>} />}
          />
          <Route path="/profile" element={<div>Profile Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(container).toHaveTextContent("Profile Page");
    expect(container).not.toHaveTextContent("Login Page");
  });

  it("renders the element if auth conditions are met (requireAuth=true and logged in)", () => {
    mockedUseUser.mockReturnValue({
      isLogged: true,
      finishedAuthenticating: true,
      read: [],
    });

    const { getByText } = render(
      <MemoryRouter>
        <AuthRoute requireAuth={true} redirectTo="/login" element={mockElement} />
      </MemoryRouter>
    );

    expect(getByText("Protected Content")).toBeDefined();
  });

  it("renders the element if auth conditions are met (requireAuth=false and not logged in)", () => {
    mockedUseUser.mockReturnValue({
      isLogged: false,
      finishedAuthenticating: true,
      read: [],
    });

    const { getByText } = render(
      <MemoryRouter>
        <AuthRoute requireAuth={false} redirectTo="/login" element={<div>Public Content</div>} />
      </MemoryRouter>
    );

    expect(getByText("Public Content")).toBeDefined();
  });
});
