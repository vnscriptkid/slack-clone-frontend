import Channels from "../components/Channels";
import Teams from "../components/Teams";
import { get } from "lodash";
import useAuth from "../useAuth";

const Sidebar = ({ allTeams = [], currentTeam = {} }) => {
  const { currentUser } = useAuth();

  return (
    <>
      <Teams teams={allTeams} />
      <Channels
        teamName={get(currentTeam, "name", "The Team")}
        username="Username"
        channels={currentTeam.channels.map(({ id, name }) => ({ id, name }))}
        users={[
          { id: 1, name: "slackbot" },
          { id: 2, name: "user1" },
        ]}
        isOwner={currentUser?.id === currentTeam.owner}
      />
    </>
  );
};

export default Sidebar;
