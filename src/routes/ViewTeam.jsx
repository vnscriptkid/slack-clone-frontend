import Header from "../components/Header";
import SendMessage from "../components/SendMessage";
import AppLayout from "../components/AppLayout";
import Sidebar from "../containers/Sidebar";
import { useQuery } from "@apollo/client";
import { ALL_TEAMS } from "../graphql/team";
import { useParams, Navigate } from "react-router";
import MessageContainer from "../containers/MessageContainer";

const ViewTeam = () => {
  const { teamId, channelId } = useParams();
  const queryInfo = useQuery(ALL_TEAMS);

  const { data, loading, error } = queryInfo;

  if (loading) return <div>loading...</div>;
  if (error) return <div>oops</div>;

  const { allTeams, invitedTeams } = data;

  const teams = [...allTeams, ...invitedTeams];

  if (teams.length === 0) {
    return <Navigate to="/create-team" />;
  }

  const currentTeam = teams.find((t) => t.id === parseInt(teamId)) || teams[0];

  const currentChannel =
    currentTeam.channels.find((c) => c.id === parseInt(channelId)) ||
    currentTeam.channels[0];

  return (
    <AppLayout>
      <Sidebar
        currentTeam={currentTeam}
        allTeams={teams.map(({ id, name }) => ({
          id,
          letter: name.charAt(0).toUpperCase(),
        }))}
      />
      <Header channelName={currentChannel.name} />
      {currentChannel && <MessageContainer channelId={currentChannel.id} />}
      {currentChannel && (
        <SendMessage
          channelName={currentChannel.name}
          channelId={currentChannel.id}
        />
      )}
    </AppLayout>
  );
};

export default ViewTeam;
