import { useMemo } from "react";

import type { Pet } from "@/api";

export interface PetsProps {
  pets: Array<Pet>
}

export const Pets = ({ pets }: PetsProps) => {
  const cats = useMemo(() => {
    const cats = pets.filter((pet) => pet.type === "Cat");

    return cats.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
  }, [pets]);

  return (
    <ul>
      {cats.map((pet) => {
        return <li key={pet.name}>{pet.name}</li>;
      })}
    </ul>
  );
}
