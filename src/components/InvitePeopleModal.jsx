import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import { useParams } from "react-router";
import { Form, Input, Button, Modal, Message } from "semantic-ui-react";
import { ADD_TEAM_MEMBER } from "../graphql/team";
import normalizeErrors from "../normalizeErrors";

const InvitePeopleModal = ({ open, setModalOpen }) => {
  const { teamId } = useParams();

  const [addTeamMember] = useMutation(ADD_TEAM_MEMBER);

  return (
    <Modal open={open} onClose={() => setModalOpen(false)}>
      <Modal.Header>Add People to your Team</Modal.Header>
      <Modal.Content>
        <Formik
          initialValues={{ email: "" }}
          onSubmit={async ({ email }, { setSubmitting, setErrors }) => {
            try {
              const res = await addTeamMember({
                variables: { email, teamId: parseInt(teamId) },
              });

              const { ok, errors } = res.data.addTeamMember;

              if (ok) {
                setModalOpen(false);
              } else {
                setErrors(normalizeErrors(errors));
              }
            } catch (e) {
              console.error(e);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            isSubmitting,
            handleChange,
            handleSubmit,
            values: { email },
            errors,
          }) => (
            <Form error={!!errors.email}>
              <Form.Field>
                <Input
                  value={email}
                  onChange={handleChange}
                  name="email"
                  fluid
                  placeholder="User's email"
                />
                <Message error list={errors.email} />
              </Form.Field>
              <Form.Group widths="equal">
                <Button
                  disabled={isSubmitting}
                  fluid
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={isSubmitting} fluid>
                  Add User
                </Button>
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Modal.Content>
    </Modal>
  );
};

export default InvitePeopleModal;
