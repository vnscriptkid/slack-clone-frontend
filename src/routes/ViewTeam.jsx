import Header from "../components/Header";
import Messages from "../components/Messages";
import SendMessage from "../components/SendMessage";
import AppLayout from "../components/AppLayout";
import Sidebar from "../containers/Sidebar";
import { useParams } from "react-router";

const ViewTeam = () => {
  const { teamId } = useParams();

  return (
    <AppLayout>
      <Sidebar currentTeamId={teamId} />
      <Header channelName="general" />
      <Messages>
        <ul className="message-list">
          <li />
          <li />
        </ul>
      </Messages>
      <SendMessage channelName="general" />
    </AppLayout>
  );
};

export default ViewTeam;
