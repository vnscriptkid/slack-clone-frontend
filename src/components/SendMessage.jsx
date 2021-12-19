import styled from "styled-components";
import { Input } from "semantic-ui-react";
import { Formik } from "formik";
import { useMutation } from "@apollo/client";
import { CREATE_MESSAGE } from "../graphql/message";

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
`;

const ENTER_KEY = 13;

const SendMessage = ({ channelName, channelId }) => {
  const [createMessage] = useMutation(CREATE_MESSAGE, {});

  return (
    <Formik
      onSubmit={async ({ text }, actions) => {
        text = text.trim();

        if (!text) return;

        await createMessage({
          variables: {
            channelId,
            text,
          },
        });

        actions.setSubmitting(false);
        actions.resetForm({
          values: {
            text: "",
          },
        });
      }}
      initialValues={{ text: "" }}
    >
      {({ values: { text }, handleChange, handleSubmit }) => (
        <SendMessageWrapper>
          <Input
            value={text}
            name="text"
            onChange={handleChange}
            onKeyDown={(e) => e.keyCode === ENTER_KEY && handleSubmit(e)}
            fluid
            placeholder={`Message #${channelName}`}
          />
        </SendMessageWrapper>
      )}
    </Formik>
  );
};

export default SendMessage;
