import React from "react";
import { observer, useLocalObservable } from "mobx-react";
import {
  Message,
  Form,
  Button,
  Input,
  Container,
  Header,
} from "semantic-ui-react";
import { useMutation, gql } from "@apollo/client";

const CreateTeam = () => {
  const { errors, name, setName, setErrors } = useLocalObservable(() => ({
    name: "",
    errors: {},
    setName(value) {
      this.name = value;
    },
    setErrors(errors) {
      this.errors = errors;
    },
  }));

  const [createTeam, { loading }] = useMutation(CREATE_TEAM);

  async function handleSubmit() {
    setErrors({});
    const res = await createTeam({ variables: { name } });

    const { ok, errors } = res.data.createTeam;

    if (ok) {
      setName("");
    } else {
      let _errors = {};
      for (let { message, path } of errors) {
        _errors[path] = message;
      }
      setErrors(_errors);
    }
  }

  const errorsList = Object.values(errors);

  return (
    <Container text>
      <Header as="h2">Create a team</Header>
      <Form onSubmit={handleSubmit}>
        <Form.Field error={!!errors.name}>
          <Input
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Name"
            fluid
          />
        </Form.Field>
        <Button loading={loading} disabled={loading}>
          Submit
        </Button>
      </Form>
      {errorsList.length ? (
        <Message
          error
          header="There was some errors with your submission"
          list={errorsList}
        />
      ) : null}
    </Container>
  );
};

const CREATE_TEAM = gql`
  mutation CreateTeam($name: String!) {
    createTeam(name: $name) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default observer(CreateTeam);
