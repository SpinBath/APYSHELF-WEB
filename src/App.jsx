import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { BooksFormPage } from './pages/BooksFormPage'
import { Navigation } from './components/Navigation'

import Home from './pages/main/main'

import Signin from './pages/Sign in/signin'
import Signon from './pages/Sign on/signon'
import HomePage from './pages/home/home'
import BooksPage from './pages/books/books'
import LoansPage from './pages/loans/loans'
import AccountPage from './pages/account/account'



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signon" element={<Signon />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/loans" element={<LoansPage />} />
        <Route path="/account" element={<AccountPage />} />


        <Route path="/signout" element={<Home />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/books/:id" element={<BooksPage />} />
        <Route path="/books-create" element={<BooksFormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App