# React Router Learning Guide

## Overview
This project demonstrates core React Router concepts for building single-page applications with dynamic navigation and data loading. Below is a detailed guide for each concept used.

---

## 🔧 Core Setup Concepts

### 1. **createBrowserRouter**
Creates a router configuration that defines all your application routes.

**What it does:** Sets up the routing structure with paths, components, and loaders.

**How to use it:**
```jsx
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, Component: HomeSection },
      { path: "about", element: <About /> }
    ]
  }
]);
```

---

### 2. **RouterProvider**
Wraps your entire app to provide routing functionality.

**What it does:** Makes all router features (Link, useNavigate, etc.) available throughout your app.

**How to use it:**
```jsx
import { RouterProvider, createBrowserRouter } from 'react-router';
import App from './App.jsx';

const router = createBrowserRouter([...]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
```

---

## 🧭 Navigation Concepts

### 3. **Link**
Used for regular navigation between routes without reloading the page.

**What it does:** Changes the URL and renders the corresponding component.

**How to use it:**
```jsx
import { Link } from 'react-router';

<Link to="/">Home</Link>
<Link to="/about">About</Link>
<Link to={`/contactDetails/${item.id}`}>See More</Link>
```

---

### 4. **NavLink**
Like Link, but automatically adds styling when the route is active (currently displayed).

**What it does:** Navigation with built-in active state management for highlighting current page.

**How to use it:**
```jsx
import { NavLink } from 'react-router';

<NavLink to="/">Home</NavLink>
<NavLink to="/about">About</NavLink>
<NavLink to="/contact">Contact</NavLink>

/* NavLink automatically adds 'active' class when the route is active */
/* You can style it with CSS: a.active { color: red; } */
```

---

### 5. **useNavigate (Programmatic Navigation)**
Navigate to a route when an event occurs (like a button click).

**What it does:** Allows you to change routes in response to user actions.

**How to use it:**
```jsx
import { useNavigate } from 'react-router';

const About = () => {
  const navigate = useNavigate();
  
  return (
    <button onClick={() => navigate(`/aboutDetails/${item.id}`)}>
      See More
    </button>
  );
};
```

---

### 6. **Navigate Component (Conditional Navigation)**
Redirects users based on conditions (like if they're not logged in).

**What it does:** Automatically redirects to a different route when the component renders.

**How to use it:**
```jsx
import { Navigate } from 'react-router';

const ContactDetails = () => {
  const [redirect, setRedirect] = useState(false);
  
  if (redirect) {
    return <Navigate to="/" />;
  }
  
  return (
    <button onClick={() => setRedirect(true)}>
      Back to Home
    </button>
  );
};
```

---

## 📤 Route Structure Concepts

### 7. **Outlet**
Renders child route components in a parent layout.

**What it does:** Acts as a placeholder where child routes are displayed.

**How to use it:**
```jsx
import { Outlet } from 'react-router';

function App() {
  return (
    <>
      <NavItems />
      <section>
        <Outlet />  {/* Child routes render here */}
      </section>
      <Footer />
    </>
  );
}
```

---

### 8. **Dynamic Routes (Path Parameters)**
Create flexible routes that accept dynamic IDs or values.

**What it does:** Allows one component to handle multiple routes with different parameters.

**How to use it:**

In router configuration:
```jsx
{
  path: "aboutDetails/:id",
  Component: AboutDetails
}
```

In the component:
```jsx
import { useParams } from 'react-router';

const AboutDetails = () => {
  const { id } = useParams();
  
  return <div>Post ID: {id}</div>;
};
```

---

### 9. **children (Nested Routes)**
Organize related routes under a parent route.

**What it does:** Creates hierarchical routing structure for better organization.

**How to use it:**
```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, Component: HomeSection },
      { path: "about", element: <About /> },
      { path: "about/:id", Component: AboutDetails }
    ]
  }
]);
```

---

### 10. **index Route**
Makes a component the default route for its parent.

**What it does:** Shows this component when visiting the parent path without child routes.

**How to use it:**
```jsx
{
  path: "/",
  element: <App />,
  children: [
    { index: true, Component: HomeSection }  // Shows when visiting "/"
  ]
}
```

---

## 📥 Data Fetching Concepts

### 11. **loader**
Fetches data before rendering a component.

**What it does:** Pre-loads data so it's ready before the component displays.

**How to use it:**
```jsx
{
  path: "contact",
  loader: async () =>
    await fetch("https://jsonplaceholder.typicode.com/users"),
  Component: Contact
}
```

---

### 12. **useLoaderData**
Accesses data fetched by the loader.

**What it does:** Gets the data that was loaded before the component rendered.

**How to use it:**
```jsx
import { useLoaderData } from 'react-router';

const Contact = () => {
  const userData = useLoaderData();
  
  return (
    <div>
      {userData.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};
```

---

### 13. **useParams**
Gets dynamic parameters from the current route.

**What it does:** Extracts values from the URL path (like IDs).

**How to use it:**
```jsx
import { useParams } from 'react-router';

const AboutDetails = () => {
  const { id } = useParams();
  
  // Use 'id' to fetch specific data
  return <div>Details for post {id}</div>;
};
```

---

### 14. **Loader with Parameters**
Fetch specific data based on route parameters.

**What it does:** Uses URL parameters to fetch targeted data.

**How to use it:**
```jsx
{
  path: "contactDetails/:id",
  loader: async ({ params }) =>
    await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`),
  Component: ContactDetails
}
```

---

## 🔄 State & Navigation Tracking

### 15. **useNavigation**
Tracks the current navigation state (loading, success, idle).

**What it does:** Tells you when user is navigating between routes.

**How to use it:**
```jsx
import { useNavigation } from 'react-router';

function App() {
  const navigation = useNavigation();
  const isLoading = Boolean(navigation.location);
  
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      <Outlet />
    </div>
  );
}
```

---

### 16. **useLocation**
Gets information about the current route location.

**What it does:** Provides pathname, state, and other location data.

**How to use it:**
```jsx
import { useLocation } from 'react-router';

const AboutDetails = () => {
  const location = useLocation();
  
  return <div>Current path: {location.pathname}</div>;
};
```

---

## 🎣 React Features for Async Data

### 17. **Suspense**
Shows a fallback UI while data is loading.

**What it does:** Displays "Loading..." until the component is ready.

**How to use it:**
```jsx
import { Suspense } from 'react';

<Suspense fallback={<p>Loading...</p>}>
  <About postData={postData} />
</Suspense>
```

---

### 18. **use() Hook**
Unwraps promises and lets you use async data in components.

**What it does:** Converts a Promise into usable data synchronously.

**How to use it:**
```jsx
import { use } from 'react';

const About = ({ postData }) => {
  const post = use(postData);
  
  return (
    <div>
      {post.map(item => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
};
```

---

## 📚 Complete Example: Route Configuration

Here's how all concepts work together:

```jsx
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        Component: HomeSection
      },
      {
        path: "about",
        loader: async () =>
          await fetch("https://jsonplaceholder.typicode.com/posts"),
        Component: About
      },
      {
        path: "aboutDetails/:id",
        loader: ({ params }) =>
          fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`),
        Component: AboutDetails
      },
      {
        path: "contact",
        loader: async () =>
          await fetch("https://jsonplaceholder.typicode.com/users"),
        Component: Contact
      }
    ]
  }
]);
```

---

## 🎯 Quick Reference

| Concept | Purpose | Use Case |
|---------|---------|----------|
| **Link** | Navigate without reload | Regular navigation |
| **NavLink** | Navigation with active state | Navigation bars |
| **useNavigate** | Programmatic navigation | Button clicks, form submissions |
| **Navigate** | Conditional redirect | Auth guards, access control |
| **Outlet** | Render child routes | Layout components |
| **useParams** | Get URL parameters | Detail pages |
| **useLoaderData** | Get pre-loaded data | Display fetched data |
| **loader** | Fetch data before render | Data preparation |
| **useNavigation** | Track navigation state | Show loading indicators |
| **useLocation** | Get current route info | Track current page |
| **Suspense** | Show loading fallback | Async data display |
| **use()** | Unwrap promises | Use async data directly |

---

Happy learning! 🚀
