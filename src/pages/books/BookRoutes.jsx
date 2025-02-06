import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../../components/ProtectedRoute';

// Importa las páginas
import BooksPage from './books';
import RequestBook from './RequestBook'
import CreateBook from './CreateBook';
import EditBook from './EditBook';

export const BookRoutes = () => {
    return (
        <Routes>
            <Route
                path="/books"
                element={
                    <ProtectedRoute>
                        <BooksPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/books-request/:id"
                element={
                    <ProtectedRoute>
                        <RequestBook />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/books-create"
                element={
                    <ProtectedRoute>
                        <CreateBook />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/books-edit/:id"
                element={
                    <ProtectedRoute>
                        <EditBook />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};

