import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const ALL_USERS = gql`
  query GetAllUsers {
    allUsers {
      id
      username
      email
    }
  }
`;

function Home() {
  const queryInfo = useQuery(ALL_USERS);

  const { data: { allUsers = [] } = {}, loading, error } = queryInfo;

  if (error) return <div>oops</div>;

  return (
    <div>
      <h1>heading</h1>

      {loading ? (
        <span>loading...</span>
      ) : (
        allUsers.map((user) => <li key={user.id}>{user.email}</li>)
      )}
    </div>
  );
}

export default Home;
