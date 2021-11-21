import { observer, useLocalObservable } from "mobx-react-lite";

import { Button, Container, Header, Input } from "semantic-ui-react";

const Login = () => {
  const form = useLocalObservable(() => ({
    email: "",
    password: "",
    setValue(key, value) {
      this[key] = value;
    },
  }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    form.setValue(name, value);
  };

  const handleSubmit = () => {
    const { email, password } = form;
    console.log("^^ submit: ", { email, password });
    // call api
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
