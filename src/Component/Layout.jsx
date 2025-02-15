// src/Component/Layout.jsx
import Navbar from "./Navbar";
import Footer from "./Footer";
import Chatbot  from "../Component/chatbot";
import { useLocation } from "react-router-dom";



function Layout({ children }) {
  const location = useLocation(); 
  const hideNavbar = location.pathname === "/Login" || location.pathname === "/Register";
  const hideFooter = location.pathname === "/Login" || location.pathname === "/Register"; // إخفاء الفوتر
  const hideChat = location.pathname === "/Login" || location.pathname === "/Register"; // إخفاء الفوتر

  return (
    <div>
      {!hideNavbar && <Navbar />}
      <div>{children}</div> {/* This will render the page content */}
      {!hideFooter &&   <Chatbot/>} 
   {!hideFooter && <Footer />} 
    </div>
  );
}

export default Layout;
