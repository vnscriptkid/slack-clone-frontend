import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const TeamWrapper = styled.div`
  grid-column: 1;
  grid-row: 1 / 4;
  background-color: #362234;
  color: #958993;
  overflow: scroll;
`;

const TeamList = styled.ul`
  width: 100%;
  padding-left: 0px;
  list-style: none;
`;

const TeamListItem = styled.li`
  height: 50px;
  width: 50px;
  background-color: #676066;
  color: #fff;
  margin: auto;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-radius: 11px;
  &:hover {
    border-style: solid;
    border-width: thick;
    border-color: #767676;
  }
`;

const Team = ({ id, letter }) => {
  return (
    <Link key={`team-${id}`} to={`/view-team/${id}/0`}>
      <TeamListItem>{letter}</TeamListItem>
    </Link>
  );
};

const Teams = ({ teams }) => (
  <TeamWrapper>
    <TeamList>{teams.map(Team)}</TeamList>
  </TeamWrapper>
);

export default Teams;
