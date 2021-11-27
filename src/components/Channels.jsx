import { useState } from "react";
import { Icon } from "semantic-ui-react";
import styled from "styled-components";
import AddChannelModal from "./AddChannelModal";
import InvitePeopleModal from "./InvitePeopleModal";

const paddingLeft = "padding-left: 10px";

const PushLeft = styled.div`
  ${paddingLeft};
`;

const ChannelWrapper = styled.div`
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: #4e3a4c;
  color: #958993;
  overflow: scroll;
`;

const TeamNameHeader = styled.h1`
  color: #fff;
  font-size: 20px;
`;

const SideBarList = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0px;
`;

const SideBarListHeader = styled.li`
  ${paddingLeft};
`;

const SideBarListItem = styled.li`
  padding: 2px;
  ${paddingLeft};
  &:hover {
    background: #3e313c;
  }
`;

const Green = styled.span`
  color: #38978d;
`;

const Bubble = ({ on = true }) => (on ? <Green>●</Green> : "○");

const channel = ({ id, name }) => (
  <SideBarListItem key={`channel-${id}`}># {name}</SideBarListItem>
);

const user = ({ id, name }) => (
  <SideBarListItem key={`user-${id}`}>
    <Bubble /> {name}
  </SideBarListItem>
);

const Channels = ({ teamName, username, channels, users }) => {
  const [addChannelModalOpen, setAddChannelModalOpen] = useState(false);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  return (
    <>
      <ChannelWrapper>
        <PushLeft>
          <TeamNameHeader>{teamName}</TeamNameHeader>
          {username}
        </PushLeft>
        <div>
          <SideBarList>
            <SideBarListHeader>
              Channels{" "}
              <Icon
                onClick={() => setAddChannelModalOpen(true)}
                name="add circle"
              />
            </SideBarListHeader>
            {channels.map(channel)}
          </SideBarList>
        </div>
        <div>
          <SideBarList>
            <SideBarListHeader>Direct Messages</SideBarListHeader>
            {users.map(user)}
          </SideBarList>
        </div>
        <div>
          <a href="#invite-people" onClick={() => setInviteModalOpen(true)}>
            + Invite People
          </a>
        </div>
      </ChannelWrapper>
      <AddChannelModal
        open={addChannelModalOpen}
        setModalOpen={setAddChannelModalOpen}
      />
      <InvitePeopleModal
        open={inviteModalOpen}
        setModalOpen={setInviteModalOpen}
      />
    </>
  );
};

export default Channels;
