import { render, screen, act } from "@testing-library/react";
import VolumeList from "../components/VolumeList/VolumeList";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../context/useUser", async () => {
  const actual = await vi.importActual("../context/useUser");
  return {
    ...actual,
    useUser: () => ({
      isLogged: true,
      finishedAuthenticating: true,
      read: mockVolumes,
    }),
  };
});

function createMockVolume(id: string) {
  return {
    id,
    volumeInfo: {
      title: `Book Title ${id}`,
      subtitle: `Subtitle ${id}`,
      description: `Description for book ${id}`,
      authors: [`Author ${id}`],
    },
  };
}

const mockVolumes = Array.from({ length: 5 }, (_, i) => createMockVolume(String(i + 1)));

describe("VolumeList", () => {
  let fetchMoreMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMoreMock = vi.fn();
  });

  it("renders loading skeleton when loading and no volumes", () => {
    render(<VolumeList volumes={[]} fetchMore={fetchMoreMock} loading={true} />);
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("renders no results message when volumes empty and not loading", () => {
    render(<VolumeList volumes={[]} fetchMore={fetchMoreMock} loading={false} />);
    expect(screen.getByText(/no results/i)).toBeInTheDocument();
  });

  it("renders volumes when data present", () => {
    render(<VolumeList volumes={mockVolumes} fetchMore={fetchMoreMock} loading={false} />);
    expect(screen.getAllByText(/book/i).length).toBeGreaterThan(0);
  });


});
