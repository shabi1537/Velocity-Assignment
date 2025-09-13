import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/authContext.jsx'
import { Home } from './pages/Home.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'
import { Mydetails } from './pages/Mydetails.jsx'
import { Errorpage } from './pages/Errorpage.jsx'
import { PrivateRoutes } from './components/PrivateRoutes.jsx'
import { PublicRoutes } from './components/PublicRoutes.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element: <App/>,
    children: [
      {
        path: '',
        element: <Home/>
      },
      {
        path: 'login',
        element: <PublicRoutes><Login/></PublicRoutes>
      },
      {
        path: 'signup',
        element: <PublicRoutes><Signup/></PublicRoutes>
      },
      {
        path: 'mydetails',
        element: <PrivateRoutes><Mydetails/></PrivateRoutes>
      },
      
    ]
  },
  {
    path: '*',
    element: <Errorpage/>
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>,
)
