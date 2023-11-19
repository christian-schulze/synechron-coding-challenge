// TODO: in a real app, the url will be configurable, perhaps using environment variables.

export type Gender = 'Female' | 'Male';

export type PetType = 'Cat' | 'Dog';

export interface Pet {
  name: string;
  type: PetType;
}

export interface Person {
  name: string;
  gender: Gender;
  age: number;
  pets: Array<Pet>;
}

export type FetchPeopleResponse = Array<Person>;

export const fetchPeople = async (): Promise<FetchPeopleResponse> => {
  return fetch(
    "https://gist.githubusercontent.com/medibank-digital/a1fc81a93200a7b9d5f8b7eae0fac6f8/raw/de10a4fcf717e6c431e88c965072c784808fd6b2/people.json",
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return new Error(`HTTP ${response.status}: There was an error loading people.`);
  });
};
