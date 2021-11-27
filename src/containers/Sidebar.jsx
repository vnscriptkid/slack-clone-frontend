import { useQuery, gql } from "@apollo/client";
import Channels from "../components/Channels";
import Teams from "../components/Teams";
import { get } from "lodash";

const ALL_TEAMS = gql`
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

const Sidebar = ({ currentTeamId }) => {
  const queryInfo = useQuery(ALL_TEAMS);

  const { data, loading, error } = queryInfo;

  if (loading) return <div>loading...</div>;
  if (error) return <div>oops</div>;

  const { allTeams } = data;
  const team =
    allTeams.find((t) => t.id === Number(currentTeamId)) || allTeams[0];

  return (
    <>
      <Teams
        teams={allTeams.map(({ id, name }) => ({
          id,
          letter: name.charAt(0).toUpperCase(),
        }))}
      />
      <Channels
        teamName={get(team, "name", "The Team")}
        username="Username"
        channels={team.channels.map(({ id, name }) => ({ id, name }))}
        users={[
          { id: 1, name: "slackbot" },
          { id: 2, name: "user1" },
        ]}
      />
    </>
  );
};

export default Sidebar;
