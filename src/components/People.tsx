import { useQuery } from "react-query";
import styled from "@emotion/styled";

import { fetchPeople } from "@/api";
import type { FetchPeopleResponse } from "@/api";
import { Pets } from "@/components/Pets.tsx";

const StyledHeader = styled.td`
  font-weight: bolder;
`;

const StyledNameCell = styled.td`
  vertical-align: top;
`;

const StyledGenderCell = styled.td`
  vertical-align: top;
`;

export const People = () => {
  const { error, isError, isLoading, data } = useQuery<
    FetchPeopleResponse,
    Error
  >("people", fetchPeople);

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (isLoading) {
    return <div>Calling API...</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <StyledHeader>
            Name
          </StyledHeader>
          <StyledHeader>
            Gender
          </StyledHeader>
        </tr>
      </thead>
      <tbody>
        {data && data.map((person) => {
          return (
            <tr key={person.name + person.gender}>
              <StyledNameCell key={person.name}>
                {person.name}
              </StyledNameCell>
              <StyledGenderCell>
                {person.gender}
                <br />
                <Pets pets={person.pets || []} />
              </StyledGenderCell>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
