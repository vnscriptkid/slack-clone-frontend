import gql from "graphql-tag";

export const ALL_TEAMS = gql`
  query GetAllTeams {
    allTeams {
      id
      name
      channels {
        id
        name
      }
    }
  }
`;
