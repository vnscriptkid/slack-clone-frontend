import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useEffect } from "react";
import { Comment } from "semantic-ui-react";

import Messages from "../components/Messages";

const newChannelMessageSubscription = gql`
  subscription ($channelId: Int!) {
    newChannelMessage(channelId: $channelId) {
      id
      text
      user {
        username
      }
      created_at
    }
  }
`;

const MessageContainer = ({ channelId }) => {
  const queryInfo = useQuery(MESSAGES, {
    variables: {
      channelId,
    },
  });

  useEffect(() => {
    queryInfo.subscribeToMore({
      document: newChannelMessageSubscription,
      variables: { channelId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const newItem = subscriptionData.data.newChannelMessage;

        return Object.assign({}, prev, {
          messages: [newItem, ...prev.messages],
        });
      },
    });
  }, []);

  const { data, loading, error } = queryInfo;

  if (loading) return null;

  if (error) return "oops";

  return (
    <Messages>
      <Comment.Group
        style={{ display: "flex", flexDirection: "column-reverse" }}
      >
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
  query GetChannelMessages($channelId: Int!) {
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
