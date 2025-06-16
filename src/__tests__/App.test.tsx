import { render, screen } from "@testing-library/react";
import App from "../App";
import { setNavigatorOnline } from "../tests/utilis/onlineStatus";
import { afterEach, describe, expect, test } from "vitest";
import { MemoryRouter } from "react-router-dom";

describe("App offline/online behavior", () => {
  afterEach(() => {
    setNavigatorOnline(true); 
  });

  test("displays offline component when offline", () => {
    setNavigatorOnline(false);
    render(      <MemoryRouter>
        <App />
      </MemoryRouter>);
    expect(screen.getByText(/No cached read books available offline/i)).toBeInTheDocument();
  });

  test("displays main app content when online", () => {
    setNavigatorOnline(true);
    render(      <MemoryRouter>
        <App />
      </MemoryRouter>);
    expect(screen.queryByText(/No cached read books available offline/i)).not.toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
