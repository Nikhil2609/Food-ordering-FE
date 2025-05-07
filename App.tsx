import React, { Suspense } from 'react'
import Login from './pages/Login'
// import Register from './pages/Register'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CircularProgress } from '@mui/material';

// import AdminLayout from './pages/Layout/AdminLayout'
// import UserLayout from './pages/Layout/UserLayout'
// import ProtectedRoutes from './pages/ProtectedRoutes'
// import DashboardPage from './pages/AdminPages/Dashboard';
// import BooksPage from './pages/AdminPages/Books';
// import AssignedBooksPage from './pages/AdminPages/AssignedBook';
// import UserDashboardPage from './pages/UserPages/UserAssignedBooks';

const Register = React.lazy(() => import('./pages/Register'));
const AdminLayout = React.lazy(() => import('./pages/Layout/AdminLayout'));
const UserLayout = React.lazy(() => import('./pages/Layout/UserLayout'));
const ProtectedRoutes = React.lazy(() => import('./pages/ProtectedRoutes'));
const DashboardPage = React.lazy(() => import('./pages/AdminPages/Dashboard'));
const BooksPage = React.lazy(() => import('./pages/AdminPages/Books'));
const AssignedBooksPage = React.lazy(() => import('./pages/AdminPages/AssignedBook'));
const UserDashboardPage = React.lazy(() => import('./pages/UserPages/UserAssignedBooks'));

// import AdminLayout from './pages/Layout/AdminLayout'
// import UserLayout from './pages/Layout/UserLayout'
// import ProtectedRoutes from './pages/ProtectedRoutes'
// import DashboardPage from './pages/AdminPages/Dashboard';
// import BooksPage from './pages/AdminPages/Books';
// import AssignedBooksPage from './pages/AdminPages/AssignedBook';
// import UserDashboardPage from './pages/UserPages/UserAssignedBooks';

function App() {
  return (
    <>
          
      <BrowserRouter>
        <Routes>
          <Route path='' element={<Login />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />

          {/* Admin path */}
          <Route
            path="/admin/*"
            element={
              <Suspense fallback={<div className='loader'><CircularProgress color='success'/></div>}>
              <ProtectedRoutes role="admin">
                <AdminLayout />
              </ProtectedRoutes>
              </Suspense>
            }
          >
            {/* add admin nested component here */}
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="books" element={<BooksPage />} />
            <Route path="assigned-books" element={<AssignedBooksPage />} />
          </Route>

          {/* User path */}
          <Route path="/user/*"
            element={
              <Suspense fallback={<h1>USER Loading.....</h1>}>
              <ProtectedRoutes role="user">
                <UserLayout />
              </ProtectedRoutes>
              </Suspense>
            }
          >
            {/* add user nested component here */}
            <Route path="dashboard" element={<UserDashboardPage />} />
          </Route>
          {/* No route found redirect to login page */}
          <Route path='*' element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
