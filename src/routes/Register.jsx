import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";
import { Button, Container, Header, Input } from "semantic-ui-react";

const REGISTER = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password)
  }
`;

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [register, { data, loading, error }] = useMutation(REGISTER);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    console.log("^^ submit: ", { formData });
    const res = await register({ variables: formData });
    console.log("^^ done: ", { res });
  };

  const { username, email, password } = formData;

  console.log({ data, loading, error });

  return (
    <Container text>
      <Header as="h2">Register</Header>
      <Input
        name="username"
        onChange={handleInputChange}
        value={username}
        placeholder="Username"
        fluid
      />
      <Input
        name="email"
        onChange={handleInputChange}
        value={email}
        placeholder="Email"
        fluid
      />
      <Input
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
    </Container>
  );
};

export default Register;
