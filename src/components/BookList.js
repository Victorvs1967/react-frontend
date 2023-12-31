import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';

const BookList = () => {

  const [ books, setBooks ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  const token = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null;

  useEffect(() => {
    if (token) {
      setLoading(true);

      fetch('http://localhost:8000/api/books', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '.concat(token),
        }
      })
        .then(response => response.json())
        .then(data => {
          setBooks(data);
          setLoading(false);
        });
    }
  }, [ token ]);

  const remove = async id => {
    await fetch('http://localhost:8000/api/books/'.concat(id), {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '.concat(token),
      }
    }).then(() => {
      let updatedBooks = [ ...books ].filter(i => i._id !== id);
      setBooks(updatedBooks);
    });
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  const bookList = books.map(book => {
    return (
      <tr key={ book._id }>
        <td style={{ whiteSpace: 'nowrap' }}>{ book.title }</td>
        <td>{ book.author || '' }</td>
        <td>{ book.year || '' }</td>
        <td>
          <ButtonGroup>
            <Button size='sm' color='primary' tag={ Link } to={ '/books/'.concat(book._id) }>Edit</Button>
            <Button size='sm' color='danger' onClick={ () => remove(book._id) }>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    );
  });

  const title = 'My Book';

  return (
    <div>
      <AppNavbar />
      <table>
        <tbody>
          <tr></tr>
        </tbody>
      </table>
      <Container fluid>
        <div className='float-end'>
          <Button color='success' tag={ Link } to="/books/new">Add Book</Button>
        </div>
        <h3>{ title }</h3>
        <Table className='mt-4'>
          <thead>
            <tr>
              <th width="20%">Title</th>
              <th width="20%">Author</th>
              <th width="20%">Year</th>
              <th width="20%">Actions</th>
            </tr>
          </thead>
          <tbody>{ bookList }</tbody>
        </Table>
      </Container>
    </div>
  );
};

export default BookList;