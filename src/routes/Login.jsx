import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { observer, useLocalObservable } from "mobx-react-lite";
import { Button, Container, Header, Input } from "semantic-ui-react";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        message
        path
      }
    }
  }
`;

const Login = () => {
  const form = useLocalObservable(() => ({
    email: "",
    password: "",
    setValue(key, value) {
      this[key] = value;
    },
  }));

  const [login, { data, loading, error }] = useMutation(LOGIN);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    form.setValue(name, value);
  };

  const handleSubmit = async () => {
    const { email, password } = form;
    console.log("^^ submit: ", { email, password });

    await login({ variables: { email, password } });

    const { ok, token, refreshToken, errors } = data.login;

    if (ok) {
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      console.log("^^ token set");
    } else {
      console.log({ errors });
    }
  };

  return (
    <Container text>
      <Header as="h2">Login</Header>
      <Input
        name="email"
        value={form.email}
        onChange={handleInputChange}
        placeholder="Email"
        fluid
      />
      <Input
        name="password"
        value={form.password}
        onChange={handleInputChange}
        type="password"
        placeholder="Password"
        fluid
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </Container>
  );
};

export default observer(Login);
