import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LeadForm } from "@/components/shared/lead-form";

const programs = [
  { slug: "group-boxing", name: "Group Boxing Classes" },
  { slug: "personal-training", name: "Personal Training" },
];

describe("LeadForm", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders the fields and program options", () => {
    render(<LeadForm source="TRIAL" programs={programs} />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Group Boxing Classes" })).toBeInTheDocument();
  });

  it("shows validation errors and does not call fetch on invalid submit", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();

    render(<LeadForm source="TRIAL" programs={programs} />);
    await user.click(screen.getByRole("button", { name: /book my free trial/i }));

    expect(await screen.findByText(/please enter your name/i)).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("posts to /api/leads and shows the success state on a valid submit", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: { id: "abc" } }),
    });
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();

    render(<LeadForm source="TRIAL" programs={programs} />);
    await user.type(screen.getByLabelText(/name/i), "Jane Doe");
    await user.type(screen.getByLabelText(/email/i), "jane@example.com");
    await user.type(screen.getByLabelText(/phone/i), "832-555-0100");
    await user.click(screen.getByRole("button", { name: /book my free trial/i }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledWith("/api/leads", expect.anything()));
    expect(await screen.findByText(/you're in/i)).toBeInTheDocument();

    const [, options] = fetchMock.mock.calls[0];
    expect(JSON.parse(options.body)).toMatchObject({
      name: "Jane Doe",
      email: "jane@example.com",
      source: "TRIAL",
    });
  });

  it("surfaces a server error message", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ error: "Something went wrong. Please try again." }),
    });
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();

    render(<LeadForm source="TRIAL" programs={programs} />);
    await user.type(screen.getByLabelText(/name/i), "Jane Doe");
    await user.type(screen.getByLabelText(/email/i), "jane@example.com");
    await user.type(screen.getByLabelText(/phone/i), "832-555-0100");
    await user.click(screen.getByRole("button", { name: /book my free trial/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/something went wrong/i);
  });
});
