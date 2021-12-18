import Header from "../components/Header";
import SendMessage from "../components/SendMessage";
import AppLayout from "../components/AppLayout";
import Sidebar from "../containers/Sidebar";
import { useQuery } from "@apollo/client";
import { ALL_TEAMS } from "../graphql/team";
import { useParams, Navigate } from "react-router";
import MessageContainer from "../containers/MessageContainer";

const ViewTeam = () => {
  const { teamId } = useParams();
  const queryInfo = useQuery(ALL_TEAMS);

  const { data, loading, error } = queryInfo;

  if (loading) return <div>loading...</div>;
  if (error) return <div>oops</div>;

  const { allTeams, invitedTeams } = data;

  const teams = [...allTeams, ...invitedTeams];

  if (teams.length === 0) {
    return <Navigate to="/create-team" />;
  }

  const team = teams.find((t) => t.id === parseInt(teamId)) || teams[0];

  const channel = team.channels[0];

  return (
    <AppLayout>
      <Sidebar
        currentTeam={team}
        allTeams={teams.map(({ id, name }) => ({
          id,
          letter: name.charAt(0).toUpperCase(),
        }))}
      />
      <Header channelName="general" />
      {channel && <MessageContainer channelId={channel.id} />}
      {channel && (
        <SendMessage channelName={channel.name} channelId={channel.id} />
      )}
    </AppLayout>
  );
};

export default ViewTeam;
