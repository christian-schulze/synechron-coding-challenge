import { render, screen } from "@testing-library/react";

import type { Pet } from "@/api";

import { Pets } from "@/components/Pets.tsx";
import { expect } from "vitest";

describe("<Pets>", () => {
  it("renders cat names in alphabetical order", () => {
    const dog1: Pet = {"name": "Sam", "type": "Dog"};
    const dog2: Pet = {"name": "Fido", "type": "Dog"};
    const cat1: Pet = {"name": "Tom", "type": "Cat"};
    const cat2: Pet = {"name": "Garfield", "type": "Cat"};

    render(<Pets pets={[cat1, dog1, dog2, cat2]} />);

    const listItems = screen.getAllByRole('listitem');

    expect(listItems.length).toEqual(2);
    expect(listItems[0].textContent).toContain(cat2.name);
    expect(listItems[1].textContent).toContain(cat1.name);
  });
});
