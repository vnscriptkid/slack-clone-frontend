import gql from "graphql-tag";

export const ALL_TEAMS = gql`
  query GetAllTeams {
    allTeams {
      id
      name
      owner
      channels {
        id
        name
      }
    }
    invitedTeams {
      id
      name
      owner
      channels {
        id
        name
      }
    }
  }
`;

export const ADD_TEAM_MEMBER = gql`
  mutation ($email: String!, $teamId: Int!) {
    addTeamMember(email: $email, teamId: $teamId) {
      ok
      errors {
        path
        message
      }
    }
  }
`;
