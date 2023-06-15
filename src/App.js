import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import BookList from './components/BookList';
import BookEdit from './components/BookEdit';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={ <Home /> } />
        <Route exact path='/login' element={ <Login /> } />
        <Route exact={ true } path='/books' element={ <BookList /> } />
        <Route path='/books/:id' element={ <BookEdit /> } />
      </Routes>
    </Router>
  );
}

export default App;
