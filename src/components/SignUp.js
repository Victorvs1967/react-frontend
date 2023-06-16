import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Button, Form, FormGroup, Input, Label } from "reactstrap";
import AppNavbar from "./AppNavbar";

const SignUp = () => {

  const initialState = {
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: '',
  }

  const [ user, setUser ] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    await fetch('http://localhost:8000/auth/signup', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    setUser(initialState);
    navigate('/');
  };

  const title = 'Sign Up';

  return (
    <>
      <AppNavbar />
      <Container>
        <h3>{ title }</h3>
        <Form onSubmit={ handleSubmit }>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input type="text" name="username" id="username" onChange={ handleChange } autoComplete="name" />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" onChange={ handleChange } />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" onChange={ handleChange } autoComplete="email" />
          </FormGroup>
          <FormGroup>
            <Label for="first_name">First Name</Label>
            <Input type="text" name="first_name" id="first_name" onChange={ handleChange } autoComplete="name" />
          </FormGroup>
          <FormGroup>
            <Label for="last_name">Last Name</Label>
            <Input type="text" name="last_name" id="last_name" onChange={ handleChange } autoComplete="name" />
          </FormGroup>
          <FormGroup>
            <Button color='primary' type="submit" style={{ marginRight: '10px' }}>Sign Up</Button>
            <Button color='secondary' tag={ Link } to='/'>Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </>
  );
};

export default SignUp;