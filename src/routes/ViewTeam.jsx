import React from "react";

import Channels from "../components/Channels";
import Header from "../components/Header";
import Messages from "../components/Messages";
import Input from "../components/Input";
import AppLayout from "../components/AppLayout";
import Teams from "../components/Teams";

const ViewTeam = () => (
  <AppLayout>
    <Teams>Teams</Teams>
    <Channels>Channels</Channels>
    <Header>Header</Header>
    <Messages>
      <ul className="message-list">
        <li />
        <li />
      </ul>
    </Messages>
    <Input>
      <input type="text" placeholder="CSS Grid Layout Module" />
    </Input>
  </AppLayout>
);

export default ViewTeam;
