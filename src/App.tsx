import { 
  RegisterContainer, 
  LoginContainer, 
  ProfileContainer, 
  DaftarContainer,
  CategoryContainer} from './containers'
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PublicLayout from './layout/PublicLayout'
import ProtectLayout from './layout/ProtectLayout'
import ContextProvider from './providers/ContextProvider';
import { EditCategory, ListCategory } from './containers/CategoryContainer';


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
          path: '/profile',
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
          path: '/protect-list-category',
          element: <ListCategory/>
        },
        {
          path: '/protect-edit-category',
          element: <EditCategory/>
        }
      ]
    }
  ])
  return (
    <div>
      <ContextProvider>
        <RouterProvider router={router}/>
      </ContextProvider>
    </div>
  );
}

export default App;
