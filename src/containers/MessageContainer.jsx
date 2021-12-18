import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Comment } from "semantic-ui-react";

import Messages from "../components/Messages";

const MessageContainer = ({ channelId }) => {
  const queryInfo = useQuery(MESSAGES, {
    variables: {
      channelId,
    },
  });

  const { data, loading, error } = queryInfo;

  if (loading) return null;

  if (error) return "oops";

  return (
    <Messages>
      <Comment.Group>
        {data.messages.map((m) => (
          <Comment key={`${m.id}-message`}>
            <Comment.Content>
              <Comment.Author as="a">{m.user.username}</Comment.Author>
              <Comment.Metadata>
                <div>{m.created_at}</div>
              </Comment.Metadata>
              <Comment.Text>{m.text}</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        ))}
      </Comment.Group>
    </Messages>
  );
};

const MESSAGES = gql`
  query ($channelId: Int!) {
    messages(channelId: $channelId) {
      id
      text
      user {
        username
      }
      created_at
    }
  }
`;

export default MessageContainer;
