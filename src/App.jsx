import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Contact from './components/Contact';
import Profile from './components/Profile';
import { useDispatch } from 'react-redux';
import { useGetUserDetailsQuery } from './features/auth/authApi';
import { useEffect } from 'react';
import { setCredentials } from './features/auth/authSlice';
import PrivateRoute from './components/PrivateRoute';
import AdminPanel from './components/AdminPanel';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

const App = () => {
  const dispatch = useDispatch();
  const { data } = useGetUserDetailsQuery({
    pollingInterval: 900000, // refetch every 15mins
  });

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route
          path='/profile'
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App