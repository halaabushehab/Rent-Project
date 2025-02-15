import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Signup from "./components/Signup";
import AddPost from "./components/AddPost";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import PostList from "./components/PostList";
import BlockedUsers from "./components/BlockedUsers";
import Layout from "./components/Layout"; // استيراد الـ Layout
import ContactList from "./components/ContactList"; 

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/AddPost"
            element={
              <Layout>
                <AddPost />
              </Layout>
            }
          />
          <Route
            path="/UserList"
            element={
              <Layout>
                <UserList />
              </Layout>
            }
          />
          <Route
            path="/AddUser"
            element={
              <Layout>
                <AddUser />
              </Layout>
            }
          />

          <Route
            path="/PostList"
            element={
              <Layout>
                <PostList />
              </Layout>
            }
          />

          <Route
            path="/BlockedUsers"
            element={
              <Layout>
                <BlockedUsers />
              </Layout>
            }
          />
          <Route
            path="/ContactList"
            element={
              <Layout>
                <ContactList />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
