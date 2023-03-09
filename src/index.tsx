import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { store } from './store'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import Login from './pages/Login'
import Mine from './pages/Mine'
import Detail from './pages/Detail'
import 'tailwindcss/tailwind.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/:user',
        element: <Mine />
      }
    ]
  },
  {
    // tweet should be an single router
    // to prevent hitting username
    path: '/tweet/:id',
    element: <Detail />
  },
  {
    path: '/login',
    element: <Login />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
