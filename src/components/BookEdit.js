import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';


const BookEdit = () => {

  const initialFormState = {
    title: '',
    author: '',
    year: ''
  };

  const [ book, setBook ] = useState(initialFormState);
  const navigate = useNavigate();
  const { id } = useParams();

  const token = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null;

  useEffect(() => {
    if (id !== 'new' && token) {
      fetch('http://localhost:8000/api/books/'.concat(id), {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '.concat(token),
        },
      })
        .then(response => response.json())
        .then(data => setBook(data));
    }
  }, [ id, token, setBook ]);

  const handleChange = event => {
    const { name, value } = event.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    await fetch('http://localhost:8000/api/books'.concat(book._id ? `/${book._id}` : ''), {
      method: book._id ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '.concat(token),
      },
      body: JSON.stringify(book)
    });

    setBook(initialFormState);
    navigate('/books');
  };

  const title = <h2>{ book._id ? 'Edit Book' : 'Add Book' }</h2>;

  return (
    <div>
      <AppNavbar />
      <Container>
        <h3>{ title }</h3>
        <Form onSubmit={ handleSubmit }>
          <FormGroup>
            <Label for='title'>Title</Label>
            <Input type='text' name='title' id='title' value={ book.title || '' } onChange={ handleChange } autoComplete='name' />
          </FormGroup>
          <FormGroup>
            <Label for='author'>Author</Label>
            <Input type='text' name='author' id='author' value={ book.author || '' } onChange={ handleChange } autoComplete='address-level1' />
          </FormGroup>
          <FormGroup>
            <Label for='year'>Year</Label>
            <Input type='text' name='year' id='year' value={ book.year || '' } onChange={ handleChange } autoComplete='address-level1' />
          </FormGroup>
          <FormGroup>
            <Button color='primary' type='submit' style={{ marginRight: '10px' }}>Save</Button>
            <Button color='secondary' tag={ Link } to="/books">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  )
};


export default BookEdit;