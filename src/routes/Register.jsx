import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Container, Header, Input, Message } from "semantic-ui-react";

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

  const [register, { data, loading, error }] = useMutation(REGISTER);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const res = await register({ variables: formData });

    if (res.data.register.ok) {
      navigate("/");
    } else {
      const errorsObj = {};
      for (let { message, path } of res.data.register.errors) {
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
      <Input
        error={!!errors.username}
        name="username"
        onChange={handleInputChange}
        value={username}
        placeholder="Username"
        fluid
      />
      <Input
        error={!!errors.email}
        name="email"
        onChange={handleInputChange}
        value={email}
        placeholder="Email"
        fluid
      />
      <Input
        error={!!errors.password}
        name="password"
        onChange={handleInputChange}
        value={password}
        type="password"
        placeholder="Password"
        fluid
      />
      <Button disabled={loading} loading={loading} onClick={handleSubmit}>
        Submit
      </Button>
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
