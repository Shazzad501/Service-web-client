import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layoutes/MainLayout";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Services from "../pages/Services";
import AddService from "../pages/AddService";
import MyService from "../pages/MyService";
import MyReview from "../pages/MyReview";
import ServiceDetails from "../pages/ServiceDetails";

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
        element: <AddService/>
      },
      {
        path: 'my-service',
        element: <MyService/>
      },
      {
        path: 'my-review',
        element: <MyReview/>
      },
      {
        path: 'service/:id',
        element: <ServiceDetails/>
      }
    ]
  },
]);

export default router;