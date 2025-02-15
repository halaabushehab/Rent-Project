import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Frown, Import, Menu, User } from "lucide-react";
import logo from "../assets/Screenshot 2025-02-11 214307.png";
import owner from "../assets/sign-form.png";
import Form from "./Form";
import { FaInfoCircle } from "react-icons/fa";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref, get, child } from "firebase/database";
import { FaUser } from "react-icons/fa";

function Navbar() {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null); // إضافة حالة للمستخدم
  const auth = getAuth();
  const db = getDatabase();
  const navigate = useNavigate();

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
        setUser(user); // تعيين المستخدم في الحالة
        fetchUserData(user.email);
      } else {
        setUser(null); // إذا لم يكن هناك مستخدم مسجل
        setUserName("");
      }
    });

    return () => unsubscribe();
  }, [auth, db]);

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isFormOpen, setFormOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  };

  const toggleForm = () => {
    setFormOpen(!isFormOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserName("");
      setUser(null);
      navigate("/"); // التوجيه إلى الصفحة الرئيسية بعد تسجيل الخروج
    } catch (error) {
      console.error("❌ خطأ في تسجيل الخروج:", error);
    }
  };

  return (
    <div className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center mb-4 md:mb-0">
          <img src={logo} alt="Logo" className="h-12 mr-2" />
          <span className="text-[#EC8305] text-2xl font-bold">HabiRent</span>
        </div>

        {/* Main Navigation */}
        <div className="flex justify-center items-center space-x-6 text-gray-700 text-lg font-medium">
          <Link to="/" className="hover:text-[#EC8305] transition duration-300">
            Home
          </Link>
          <Link
            to="/FindaStay"
            className="hover:text-[#EC8305] transition duration-300"
          >
            Find a Stay
          </Link>
          <Link
            to="/about"
            className="hover:text-[#EC8305] transition duration-300"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="hover:text-[#EC8305] transition duration-300"
          >
            Contact Us
          </Link>
        </div>

        {/* User Options */}
        <div className="flex items-center space-x-4 relative">
          {/* زر لعرض الفورم */}
          <button className="relative" onClick={toggleForm}>
            <img src={owner} alt="Owner Icon" className="h-10 cursor-pointer" />
          </button>
          {isFormOpen && (
            <div className="absolute top-14 right-0 w-[500px] bg-white shadow-lg p-4 rounded-lg z-50">
              <Form />
            </div>
          )}

          {/* Dropdown Menu */}
          <div className="relative">
            <button
              className="flex items-center border rounded-full px-3 py-2 hover:shadow-md transition focus:outline-none"
              onClick={toggleDropdown}
              onBlur={closeDropdown}
              ref={dropdownRef}
              tabIndex={0}
            >
              <Menu className="w-5 h-5 mr-2 text-gray-700" />
              <FaInfoCircle className="w-6 h-6 text-gray-700" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white shadow-lg rounded-lg py-2 z-50">
                {!user ? (
                  <>
                    <Link
                      to="/Register"
                      className="block px-4 py-2 hover:bg-[#EC8305] hover:text-white transition"
                    >
                      Sign up
                    </Link>
                    <Link
                      to="/Login"
                      className="block px-4 py-2 hover:bg-[#EC8305] hover:text-white transition"
                    >
                      Log in
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/Userprofile"
                      className="block px-4 py-2 hover:bg-[#EC8305] hover:text-white transition"
                    >
                      User Profile
                    </Link>
                    <Link
                      to="#"
                      onClick={handleLogout}
                      className="block px-4 py-2 hover:bg-[#EC8305] hover:text-white transition"
                    >
                      LogOut
                    </Link>
                  </>
                )}
                <hr className="my-1" />
                <Link
                  to="/contact"
                  className="block px-4 py-2 hover:bg-[#EC8305] hover:text-white transition"
                >
                  Contact
                </Link>
                <Link
                  to="/about"
                  className="block px-4 py-2 hover:bg-[#EC8305] hover:text-white transition"
                >
                  About us
                </Link>
                <Link
                  to="/HelpCenter"
                  className="px-4 py-2 hover:bg-[#EC8305] hover:text-white transition"
                >
                  Help Center
                </Link>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center">
            <FaUser className="w-6 h-6 text-gray-700" />
            {userName && (
              <span className="text-sm text-gray-700 mt-1">{userName}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
