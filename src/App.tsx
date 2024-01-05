import { 
  RegisterContainer, 
  LoginContainer, 
  ProfileContainer, 
  DaftarContainer,
  ProtectContainer } from './containers'
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PublicLayout from './layout/PublicLayout';
import ProtectLayout from './layout/ProtectLayout'


const App = () => {

  const router = createBrowserRouter([
    {
      element: <PublicLayout/>,
      children: [
        {
          path: '/',
          element: <RegisterContainer/>
        },
        {
          path: '/login',
          element: <LoginContainer/>
        },
        {
          path: '/profile/:id',
          element: <ProfileContainer/>
        },
        {
          path: '/daftar',
          element: <DaftarContainer/>
        },
      ]
    },
    {
      path: '*',
      element: <h1>404</h1>
    },
    {
      element: <ProtectLayout/>,
      children: [
        {
          path: '/protect',
          element: <ProtectContainer/>
        }
      ]
    }
  ])
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
