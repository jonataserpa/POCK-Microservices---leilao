import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Home from "./page";

// Mock the ui-kit components
vi.mock("@repo/ui-kit", () => ({
  Header: () => <div data-testid="header">Header</div>,
  Footer: () => <div data-testid="footer">Footer</div>,
  CampaignCard: ({ campaign }: { campaign: { title: string } }) => (
    <div data-testid="campaign-card">{campaign.title}</div>
  ),
}));

// Mock fetch
global.fetch = vi.fn();

describe("Home Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders campaigns correctly", async () => {
    const mockCampaigns = [
      {
        id: "1",
        title: "Campaign 1",
        slug: "camp-1",
        lang: "pt-BR",
        tenantId: "t1",
      },
      {
        id: "2",
        title: "Campaign 2",
        slug: "camp-2",
        lang: "pt-BR",
        tenantId: "t2",
      },
    ];

    const mockTenants = [
      { id: "t1", name: "Tenant 1" },
      { id: "t2", name: "Tenant 2" },
    ];

    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      (url: string) => {
        if (url.includes("/campaigns")) {
          return Promise.resolve({
            ok: true,
            json: async () => mockCampaigns,
          });
        }
        if (url.includes("/tenants")) {
          return Promise.resolve({
            ok: true,
            json: async () => mockTenants,
          });
        }
        return Promise.reject(new Error("Unknown URL"));
      },
    );

    const jsx = await Home({ searchParams: Promise.resolve({}) });
    render(jsx);

    expect(screen.getByTestId("header")).toBeDefined();
    expect(screen.getByTestId("footer")).toBeDefined();
    expect(screen.getAllByTestId("campaign-card")).toHaveLength(2);
    expect(screen.getByText("Campaign 1")).toBeDefined();
    expect(screen.getByText("Campaign 2")).toBeDefined();
  });

  it("handles fetch error gracefully", async () => {
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error("API Error"),
    );

    const jsx = await Home({ searchParams: Promise.resolve({}) });
    render(jsx);

    expect(screen.getByTestId("header")).toBeDefined();
    expect(screen.queryByTestId("campaign-card")).toBeNull();
  });
});
