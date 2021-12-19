import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import { useParams } from "react-router";
import { Button, Form, Input, Modal } from "semantic-ui-react";
import { CREATE_CHANNEL } from "../graphql/channel";

const AddChannelModal = ({ open, setModalOpen }) => {
  const [createChannel] = useMutation(CREATE_CHANNEL, {
    update(cache, { data: { createChannel } }) {
      cache.modify({
        fields: {
          allTeams(existingTeams = []) {
            const newTeamRef = cache.writeFragment({
              data: createChannel.channel,
              fragment: gql`
                fragment NewChannel on Channel {
                  id
                  name
                }
              `,
            });

            return [...existingTeams, newTeamRef];
          },
        },
      });
    },
    optimisticResponse({ name }) {
      return {
        createChannel: {
          ok: true,
          channel: {
            id: -1,
            name,
            __typename: "Channel",
          },
          errors: null,
        },
      };
    },
  });

  const { teamId } = useParams();

  return (
    <Modal open={open} onClose={() => setModalOpen(false)}>
      <Modal.Header>Add Channel</Modal.Header>
      <Modal.Content>
        <Formik
          initialValues={{ name: "" }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              if (!teamId) throw new Error("teamId is required.");
              await createChannel({
                variables: { name: values.name, teamId: parseInt(teamId) },
              });
              setModalOpen(false);
            } catch (e) {
              console.error(e);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            isSubmitting,
            handleSubmit,
            handleChange,
            handleBlur,
            values: { name },
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <Input
                  name="name"
                  value={name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fluid
                  placeholder="Channel name"
                />
              </Form.Field>
              <Form.Group widths="equal">
                <Button
                  disabled={isSubmitting}
                  fluid
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button disabled={isSubmitting} fluid>
                  Create Channel
                </Button>
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Modal.Content>
    </Modal>
  );
};

export default AddChannelModal;
