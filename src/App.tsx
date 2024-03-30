
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Pages/Root";
import SignUp from "./Pages/SignUp";
import Libary from "./Pages/Libary";
import Prodected from "./Components/Prodected";
import LogIn from "./Pages/LogIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/libary",
        element: (
          <Prodected>
            <Libary />
          </Prodected>
        ),
      },
    ],
  },
  {
    path: "/SignUp",
    element: <SignUp />,
  },
  {
    path: "/SignIn",
    element: <LogIn />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
