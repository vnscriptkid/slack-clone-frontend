import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { observer, useLocalObservable } from "mobx-react-lite";
import { useNavigate } from "react-router";
import {
  Button,
  Container,
  Form,
  Header,
  Input,
  Message,
} from "semantic-ui-react";

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
  const { email, password, setValue, setErrors, errors } = useLocalObservable(
    () => ({
      email: "",
      password: "",
      errors: {},
      setValue(key, value) {
        this[key] = value;
      },
      setErrors(errors) {
        this.errors = errors;
      },
    })
  );

  const [login, { loading }] = useMutation(LOGIN);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValue(name, value);
  };

  const handleSubmit = async () => {
    setErrors({});
    const res = await login({ variables: { email, password } });

    const { ok, token, refreshToken, errors } = res.data.login;

    if (ok) {
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      navigate("/");
    } else {
      console.error({ errors });
      // [ { path: 'name', message: 'invalid' } ]
      const errorsMap = {};
      for (let { path, message } of errors) {
        errorsMap[path] = message;
      }
      setErrors(errorsMap);
    }
  };

  const errorsList = Object.values(errors);

  return (
    <Container text>
      <Form>
        <Header as="h2">Login</Header>
        <Form.Field error={!!errors.email}>
          <Input
            name="email"
            value={email}
            onChange={handleInputChange}
            placeholder="Email"
            fluid
          />
        </Form.Field>
        <Form.Field error={!!errors.password}>
          <Input
            name="password"
            value={password}
            onChange={handleInputChange}
            type="password"
            placeholder="Password"
            fluid
          />
        </Form.Field>
        <Button loading={loading} disabled={loading} onClick={handleSubmit}>
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

export default observer(Login);
