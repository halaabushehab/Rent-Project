import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Component/Layout"; // Import Layout component
import {
  Home,
  Login,
  Register,
  Createapartment,
  Dashboard,
  Contact,
  About,
  Wishlist,
  Virtualtour,
  Cheackout,
  Portal,
  FindaStay,
  Userprofile,
  PropertyDetails,
} from "./Component/exports";
import HelpCenter from "./Pages/HelpCenter"



function App() {
  const router = createBrowserRouter([
    {
      path: "/", // 1
      element: (
        <Layout>
          <Home />
        </Layout>
      ), // Wrap Home in Layout
    },
    {
      path: "/Login", // 2
      element: (
        <Layout>
          <Login />
        </Layout>
      ), // Wrap Login in Layout
    },
    {
      path: "/Register", // 3
      element: (
        <Layout>
          <Register />
        </Layout>
      ), // Wrap Register in Layout
    },

    {
      path: "/About", // 5
      element: (
        <Layout>
          <About />
        </Layout>
      ), // Wrap About in Layout
    },
    {
      path: "/Wishlist", // 6
      element: (
        <Layout>
          <Wishlist />
        </Layout>
      ), // Wrap Wishlist in Layout
    },

    {
      path: "/PropertyDetails",
      element: (
        <Layout>
          <PropertyDetails />
        </Layout>
      ),
    },

    {
      path: "/Dashboard", // 8
      element: (
        <Layout>
          <Dashboard />
        </Layout>
      ), // Wrap Dashboard in Layout
    },
    {
      path: "/Createapartment", // 9
      element: (
        <Layout>
          <Createapartment />
        </Layout>
      ), // Wrap Createapartment in Layout
    },
    {
      path: "/contact", // 10
      element: (
        <Layout>
          <Contact />
        </Layout>
      ), // Wrap Contact in Layout
    },
    {
      path: "/Virtualtour", // 11
      element: (
        <Layout>
          <Virtualtour />
        </Layout>
      ), // Wrap Virtualtour in Layout
    },
    {
      path: "/Cheackout", // 12
      element: (
        <Layout>
          <Cheackout />
        </Layout>
      ), // Wrap Cheackout in Layout
    },
    {
      path: "/Userprofile", // 12
      element: (
        <Layout>
          <Userprofile />
        </Layout>
      ), // Wrap Cheackout in Layout
    },
    {
      path: "/Portal", // 12
      element: (
        <Layout>
          <Portal />
        </Layout>
      ), // Wrap Cheackout in Layout
    },
    {
      path: "/FindaStay", // 12
      element: (
        <Layout>
          <FindaStay />
        </Layout>
      ), // Wrap Cheackout in Layout
    },

    {
      path: "/HelpCenter", // ✅ إزالة المسافة الزائدة
      element: (
        <Layout>
          <HelpCenter />
        </Layout>
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
