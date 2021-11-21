import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Button,
  Container,
  Form,
  Header,
  Input,
  Message,
} from "semantic-ui-react";

const REGISTER = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [register, { data, loading }] = useMutation(REGISTER);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const res = await register({ variables: formData });

    const { ok, errors } = res.data.register;

    if (ok) {
      navigate("/");
    } else {
      const errorsObj = {};
      for (let { message, path } of errors) {
        errorsObj[path] = message;
      }
      setErrors(errorsObj);
    }
  };

  const { username, email, password } = formData;

  const errorsList = Object.values(errors).filter((v) => !!v);

  return (
    <Container text>
      <Header as="h2">Register</Header>
      <Form onSubmit={handleSubmit}>
        <Form.Input error={!!errors.username}>
          <Input
            name="username"
            onChange={handleInputChange}
            value={username}
            placeholder="Username"
            fluid
          />
        </Form.Input>
        <Form.Input error={!!errors.email}>
          <Input
            name="email"
            onChange={handleInputChange}
            value={email}
            placeholder="Email"
            fluid
          />
        </Form.Input>
        <Form.Input error={!!errors.password}>
          <Input
            name="password"
            onChange={handleInputChange}
            value={password}
            type="password"
            placeholder="Password"
            fluid
          />
        </Form.Input>
        <Button disabled={loading} loading={loading}>
          Submit
        </Button>
      </Form>
      {errorsList.length > 0 && (
        <Message
          error
          header="There was some errors with your submission"
          list={errorsList}
        />
      )}
    </Container>
  );
};

export default Register;
