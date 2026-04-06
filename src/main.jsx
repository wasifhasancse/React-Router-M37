import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.jsx";
import About from "./components/Main/About/About.jsx";
import AboutDetails from "./components/Main/About/AboutDetails.jsx";
import Contact from "./components/Main/Contact/Contact.jsx";
import ContactDetails from "./components/Main/Contact/ContactDetails.jsx";
import HomeSection from "./components/Main/HomeSection/HomeSection.jsx";
import "./index.css";

const postData = fetch("https://jsonplaceholder.typicode.com/posts").then(
  (response) => response.json(),
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        Component: HomeSection,
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<p>loading.........</p>}>
            <About postData={postData} />
          </Suspense>
        ),
      },
      {
        path: "contact",
        loader: async () =>
          await fetch("https://jsonplaceholder.typicode.com/users"),
        Component: Contact,
      },
      {
        path: "contactDetails/:id",
        loader: async ({ params }) =>
          await fetch(
            `https://jsonplaceholder.typicode.com/users/${params.id}`,
          ),
        Component: ContactDetails,
      },
      {
        path: "aboutDetails/:id",
        loader: ({params}) => fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`),
        Component: AboutDetails,
      },
      {
        path: '*',
        element: <span>404!</span>
      }
    ],
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
);
