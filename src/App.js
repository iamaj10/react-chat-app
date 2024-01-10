import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import { store } from "./store/store";

import { toast, ToastContainer } from "react-toastify";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Provider } from "react-redux";
import Home from "./components/Home";

import Chat from "./components/Chat";

function App() {
  const router = createBrowserRouter([
    {
      path: `/`,
      element: <Home />,
    },
    {
      path: "/:contactID",
      element: <Chat />,
    },
  ]);

  return (
    <div className="App">
      <ToastContainer />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
