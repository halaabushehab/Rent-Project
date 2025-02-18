import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref, get, child } from "firebase/database";
import logo from "../assets/Screenshot 2025-02-11 214307.png";
import owner from "../assets/sign-form.png";
import Form from "./Form";

function Navbar() {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isFormOpen, setFormOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false); // حالة القائمة الجانبية
  const auth = getAuth();
  const db = getDatabase();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async (email) => {
      try {
        const dbRef = ref(db, "users");
        const snapshot = await get(child(dbRef, "/"));
        if (snapshot.exists()) {
          const usersData = snapshot.val();
          const userEntry = Object.values(usersData).find(
            (user) => user.email === email
          );
          if (userEntry) {
            setUserName(userEntry.name || "User");
          }
        }
      } catch (error) {
        console.error("❌ خطأ في جلب البيانات:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUserData(user.email);
      } else {
        setUser(null);
        setUserName("");
      }
    });

    return () => unsubscribe();
  }, [auth, db]);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setTimeout(() => setDropdownOpen(false), 150);
  const toggleForm = () => setFormOpen(!isFormOpen);
  const toggleMenu = () => setMenuOpen(!isMenuOpen); // تبديل القائمة

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserName("");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("❌ خطأ في تسجيل الخروج:", error);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-12 mr-2" />
          <span className="text-[#EC8305] text-2xl font-bold">HabiRent</span>
        </div>

        {/* Burger Menu Icon (Responsive) */}
        <button
          className="md:hidden text-gray-700 text-2xl"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Links */}
        <div
          className={`md:flex space-x-6 text-gray-700 text-lg font-medium ${
            isMenuOpen
              ? "flex flex-col absolute top-16 left-0 w-full bg-white shadow-md py-4 space-y-4"
              : "hidden md:flex"
          }`}
        >
          <Link to="/" className="hover:text-[#EC8305] transition">
            Home
          </Link>
          <Link to="/FindaStay" className="hover:text-[#EC8305] transition">
            Find a Stay
          </Link>
          <Link to="/about" className="hover:text-[#EC8305] transition">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-[#EC8305] transition">
            Contact Us
          </Link>
        </div>

        {/* User Options */}
        <div className="flex items-center space-x-4 relative">
          {/* زر لعرض الفورم */}
          <div className="hidden md:block">Add Property</div>

          <button className="relative group" onClick={toggleForm}>
            <div className="absolute inset-0 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"></div>

            <img
              src={owner}
              alt="Owner Icon"
              className="h-10 cursor-pointer relative"
            />

            {/* تحسين الظهور فوق العناصر الأخرى */}
            <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
              Add Property
            </span>
          </button>

          {isFormOpen && (
            <div className="absolute   bottom-20  right-0 w-[500px] bg-white shadow-lg p-4 rounded-lg z-50 ">
              <Form />
            </div>
          )}

          {/* Dropdown Menu */}
          <div className="relative">
            <button
              className="flex items-center px-3 py-2 hover:shadow-md transition focus:outline-none"
              onClick={toggleDropdown}
              onBlur={closeDropdown}
              ref={dropdownRef}
              tabIndex={0}
            >
              <div className="flex flex-col items-center">
                <FaUser className="w-6 h-6 text-gray-700" />
                {userName && (
                  <span className="text-sm text-gray-700 mt-1">{userName}</span>
                )}
              </div>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white shadow-lg rounded-lg py-2 z-50">
                {!user ? (
                  <Link
                    to="/Register"
                    className="block px-4 py-2 hover:bg-[#EC8305] hover:text-white transition"
                  >
                    Sign up
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/Userprofile"
                      className="block px-4 py-2 hover:bg-[#EC8305] hover:text-white transition"
                    >
                      User Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-[#EC8305] hover:text-white transition"
                    >
                      Logout
                    </button>
                  </>
                )}
                <hr className="my-1" />
                <Link
                  to="/HelpCenter"
                  className="block px-4 py-2 hover:bg-[#EC8305] hover:text-white transition"
                >
                  Help Center
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
