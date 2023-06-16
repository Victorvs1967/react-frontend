import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

const Login = () => {

  const initialState = {
    username: '',
    password: ''
  };

  const [ auth, setAuth ] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = event => {
    const { name, value } = event.target;
    setAuth({ ...auth, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    await fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      body: JSON.stringify(auth),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        sessionStorage.clear();
        sessionStorage.setItem('token', data['token']);
    });

    setAuth(initialState);
    navigate('/books')
  }

  const title = 'Login';

  return (
    <div>
      <AppNavbar />
      <Container>
        <h3>{ title }</h3>
        <Form onSubmit={ handleSubmit }>
          <FormGroup>
            <Label for='username'>Username</Label>
            <Input type='text' name='username' id='username' onChange={ handleChange } autoComplete='name' />
          </FormGroup>
          <FormGroup>
            <Label for='password'>Password</Label>
            <Input type='password' name='password' id='password' onChange={ handleChange } />
          </FormGroup>
          <FormGroup>
            <Button color="primary" type='submit' style={{ marginRight: '10px' }}>Login</Button>
            <Button color="secondary" tag={ Link } to="/">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  );
};

export default Login;