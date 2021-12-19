import gql from "graphql-tag";

export const ME_QUERY = gql`
  query GetMyInfo {
    me {
      id
      username
      teams {
        id
        name
        channels {
          id
          name
        }
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
