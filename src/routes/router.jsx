import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Services from "../pages/Services";
import AddService from "../pages/AddService";
import MyService from "../pages/MyService";
import MyReview from "../pages/MyReview";
import ServiceDetails from "../pages/ServiceDetails";
import PrivateRoute from "./PrivateRoute";
import axios from "axios";

const router = createBrowserRouter([
  {
    path: "/",
    element:<MainLayout/>,
    errorElement: <Error/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: 'login',
        element: <Login/>
      },
      {
        path: 'register',
        element: <Register/>
      },
      {
        path: 'services',
        element: <Services/>
      },
      {
        path: 'add-service',
        element: <PrivateRoute><AddService/></PrivateRoute>
      },
      {
        path: 'my-service',
        element: <PrivateRoute><MyService/></PrivateRoute>
      },
      {
        path: 'my-review',
        element: <PrivateRoute><MyReview/></PrivateRoute>
      },
      {
        path: 'service/:id',
        element: <PrivateRoute><ServiceDetails/></PrivateRoute>,
        loader: ({params})=> axios.get(`https://service-review-server-navy.vercel.app/services/${params.id}`)
      }
    ]
  },
]);

export default router;