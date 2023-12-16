import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import PageSchedule from './pages/PageSchedule';
import PageDirectory, { directoryLoader } from './pages/PageDirectory';
import PageLogin from './pages/PageLogin';
import AuthProvider from './context/AuthProviderContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <PageSchedule />
      </AuthProvider>
    ),
  },
  {
    path: '/schedules',
    element: (
      <AuthProvider>
        <PageSchedule />
      </AuthProvider>
    ),
  },
  {
    path: '/directory',
    element: (
      <AuthProvider>
        <PageDirectory />
      </AuthProvider>
    ),
    loader: directoryLoader,
  },
  {
    path: '/login',
    element: (
      <AuthProvider>
        <PageLogin />
      </AuthProvider>
    ),
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RouterProvider router={router} />
    </LocalizationProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
