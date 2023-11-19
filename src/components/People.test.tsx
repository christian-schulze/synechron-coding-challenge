import { ReactNode } from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";

import type { FetchPeopleResponse, Person } from "@/api";

import { People } from "@/components/People.tsx";
import { expect } from "vitest";

const queryClient = new QueryClient();

const customRender = (children: ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
  );
};

describe("<People>", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.doMock();
  });

  it("renders loading indicator", () => {
    fetchMock.mockResponse(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ body: "ok" }), 100),
        ),
    );

    customRender(<People />);

    expect(screen.getByText("Calling API...")).toBeVisible();
  });

  it("renders people", async () => {
    const person1: Person = {
      name: "Bob",
      gender: "Male",
      age: 23,
      pets: [
        { name: "Garfield", type: "Cat" },
        { name: "Fido", type: "Dog" },
      ],
    };
    const person2: Person = {
      name: "Jennifer",
      gender: "Female",
      age: 18,
      pets: [{ name: "Garfield", type: "Cat" }],
    };
    const response: FetchPeopleResponse = [person1, person2];

    fetchMock.mockResponse(JSON.stringify(response));

    customRender(<People />);

    await new Promise((r) => setTimeout(() => r(""), 100));

    let rows: HTMLElement[] = [];
    await waitFor(() => {
      rows = screen.getAllByRole("row");
      expect(rows.length).toEqual(3);
    });

    expect(within(rows[0]).getByText("Name")).toBeVisible();
    expect(within(rows[0]).getByText("Gender")).toBeVisible();

    expect(within(rows[1]).getByText("Bob")).toBeVisible();
    expect(within(rows[1]).getByText("Male")).toBeVisible();

    expect(within(rows[2]).getByText("Jennifer")).toBeVisible();
    expect(within(rows[2]).getByText("Female")).toBeVisible();
  });
});
