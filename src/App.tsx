import { 
  RegisterContainer, 
  LoginContainer, 
  ProfileContainer, 
  DaftarContainer,
  ProductContainer, 
  CategoryContainer} from './containers'
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PublicLayout from './layout/PublicLayout'
import ProtectLayout from './layout/ProtectLayout'
import ContextProvider from './providers/ContextProvider';


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
          path: '/product',
          element: <ProductContainer/>
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
          path: '/protect-category',
          element: <CategoryContainer/>
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
