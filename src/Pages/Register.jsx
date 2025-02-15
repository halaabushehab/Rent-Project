import { useState } from "react";
import { auth, database } from "../Firebase/Configration";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ref, set, get } from "firebase/database";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // التحقق من أن جميع الحقول مملوءة
    if (!name || !email || !password || !phone) {
      alert("Please fill in all fields.");
      return;
    }
    
     // ✅ التحقق من الاسم الرباعي
     const nameRegex = /^[\u0600-\u06FFa-zA-Z]+\s[\u0600-\u06FFa-zA-Z]+\s[\u0600-\u06FFa-zA-Z]+\s[\u0600-\u06FFa-zA-Z]+$/;
     const trimmedName = name.trim();
     if (!nameRegex.test(trimmedName)) {
       alert("Please enter the full name with a space between each part");
       return;
     }
     
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

 
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  if (!passwordRegex.test(password)) {
    alert(
      "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, and one number."
    );
    return;
  }

  // ✅ التحقق من رقم الهاتف (يبدأ بـ 07 ويتكون من 10 أرقام)
  const phoneRegex = /^07\d{8}$/;
  if (!phoneRegex.test(phone)) {
    alert("The phone number must be 10 digits long and start with 07");
    return;
  }

    try {
      // إنشاء حساب جديد باستخدام Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // تخزين بيانات المستخدم في Firebase Realtime Database
      await set(ref(database, "users/" + user.uid), {
        name,
        email,
        phone,
        id: user.uid, // إضافة ID الخاص بالمستخدم
        blocked: false, // جعل المستخدم غير محظور افتراضيًا
      });

      // تحديث حالة Redux وتخزين بيانات المستخدم
      dispatch(setUser({ id: user.uid, name, email, phone  }));
     

      // إعادة توجيه المستخدم إلى الصفحة الرئيسية
      navigate("/");
    } catch (error) {
      console.error("Error signing up:", error.message);
      alert("An error occurred during registration. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      // التحقق مما إذا كان المستخدم موجودًا بالفعل في قاعدة البيانات
      const userRef = ref(database, "users/" + user.uid);
      const snapshot = await get(userRef);
  
     
    let userData;

    if (!snapshot.exists()) {
      // ✅ المستخدم جديد، قم بتخزين بياناته في Firebase
      userData = {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        blocked: false,
      };

      await set(userRef, userData);
    } else {
      // ✅ المستخدم موجود مسبقًا، استرجاع بياناته من Firebase
      userData = snapshot.val();
    }

    // ✅ تحديث Redux بـ `id`, `name`, `email`
    dispatch(setUser({ id: userData.id, name: userData.name, email: userData.email }));
      navigate("/");
    } catch (error) {
      alert("Error signing in with Google:", error.message);
    }
  };
  return (
  <>
<section className="py-10 bg-[#091057] sm:py-16 lg:py-24">
  <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:items-stretch md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-10">
      <div className="flex flex-col justify-between lg:py-5">
        <div>
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:leading-tight lg:text-5xl">
          Find Your Perfect Home &  Rent It Online Today!
          </h2>
          <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-white">
          Our platform is designed to connect tenants with landlords seamlessly, offering a fast, secure, and user-friendly experience.
          </p>
          <img
            className="relative z-10 max-w-xs mx-auto -mb-16 md:hidden"
            src="https://cdn.rareblocks.xyz/collection/celebration/images/contact/4/curve-line-mobile.svg"
            alt=""
          />
          <img
            className="hidden w-full translate-x-24 translate-y-8 md:block"
            src="https://cdn.rareblocks.xyz/collection/celebration/images/contact/4/curve-line.svg"
            alt=""
          />
        </div>
        <div className="hidden md:mt-auto md:block">
          <div className="flex items-center">
            <svg
              className="w-6 h-6 text-[#EC8305]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <svg
              className="w-6 h-6 text-[#EC8305]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <svg
              className="w-6 h-6 text-[#EC8305]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <svg
              className="w-6 h-6 text-[#EC8305]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <svg
              className="w-6 h-6 text-[#EC8305]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <blockquote className="mt-6">
            <p className="text-lg leading-relaxed text-white">
            your ultimate destination for finding the perfect rental home tailored to your needs! Whether you're a student looking for a quiet place to study, a family seeking a cozy home to settle into, or an individual searching for independence and comfort, we’ve got you covered. 
            </p>
          </blockquote>
          <div className="flex items-center mt-8">
  <img
    className="flex-shrink-0 object-cover w-10 h-10 rounded-full"
    src="https://i.pinimg.com/736x/f2/6f/b2/f26fb261a82ad94d6186690d8d38820c.jpg"
    alt=""
  />
  <img
    className="flex-shrink-0 object-cover w-10 h-10 rounded-full "
    src="https://i.pinimg.com/736x/97/40/14/974014c3ad33151bd49e2a6b299c6d52.jpg"
    alt=""
  />
  <img
    className="flex-shrink-0 object-cover w-10 h-10 rounded-full "
    src="https://i.pinimg.com/736x/3c/dc/e9/3cdce91b109f9259cb89778f91b9f7e5.jpg"
    alt=""
  />
   <img
    className="flex-shrink-0 object-cover w-10 h-10 rounded-full "
    src="https://i.pinimg.com/736x/31/c6/9f/31c69fd0219dba82486a4293c4ff8a73.jpg"
    alt=""
  />
  
  
</div>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24 rounded-[50px]">
      <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
        Register now to <span className="text-[#EC8305]  font-bold">HabiRent</span>
        </h2>
        <p className="mt-2 text-base text-gray-600">
  Already have an account?{" "}
  <Link
    to="/Login"
    className="font-medium text-blue-800 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline"
  >
    Login
  </Link>
</p>
        <form action="#" method="POST" className="mt-8" onSubmit={handleRegister}>
          <div className="space-y-5">
            <div>
              <label htmlFor="" className="text-base font-medium text-gray-900">
                {" "}
                Username{" "}
              </label>
              <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name=""
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                />
              </div>
            </div>
            <div>
              <label htmlFor="" className="text-base font-medium text-gray-900">
                {" "}
                Email address{" "}
              </label>
              <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
                <input
                   type="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email to get started"
                  className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                />
              </div>
            </div>
            <div>
              <label htmlFor="" className="text-base font-medium text-gray-900">
                {" "}
                Password{" "}
              </label>
              <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                    />
                  </svg>
                </div>
                
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                />
              </div>
            </div>
            <div>
             
               <div>
              <label htmlFor="" className="text-base font-medium text-gray-900">
                {" "}
                Phone{" "}
              </label>
              <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                <input
                  type="phone"                             
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="07xxxxxxxx"
                  className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                />
              </div>
            </div>
                    <br></br>
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md bg-gradient-to-r from-fuchsia-600 to-blue-600 focus:outline-none hover:opacity-80 focus:opacity-80"
              >
                Register
              </button>
            
            </div>
          </div>
        </form>
        <div className="mt-3 space-y-3">
          <button
            type="button"
            className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
            onClick={handleGoogleLogin}
          >
            <div className="absolute inset-y-0 left-0 p-4">
              <svg
                className="w-6 h-6 text-[#EC8305]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" />
              </svg>
            </div>
            Sign up with Google
          </button>
        </div>
        <p className="mt-5 text-sm text-gray-600">
          This site is protected by reCAPTCHA and the Google{" "}
          <a
            href="https://www.realpage.com/legal/privacy-policy/"
            title=""
            className="text-blue-800 transition-all duration-200 hover:underline hover:text-blue-700"
          >
            Privacy Policy
          </a>{" "}
          &amp;
          <a
            href="https://istd.gov.jo/ebv4.0/root_storage/en/eb_list_page/general_sales_tax_law_and_its_amendments_2023-1.pdf"
            title=""
            className="text-blue-800 transition-all duration-200 hover:underline hover:text-blue-700"
          >
            Terms of Service
          </a>
        </p>
      </div>
    </div>



      <div className="md:hidden">
        <div className="flex items-center">
          <svg
            className="w-6 h-6 text-yellow-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <svg
            className="w-6 h-6 text-yellow-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <svg
            className="w-6 h-6 text-yellow-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <svg
            className="w-6 h-6 text-yellow-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <svg
            className="w-6 h-6 text-yellow-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <blockquote className="mt-6">
          <p className="text-lg leading-relaxed text-white">
            You made it so simple. My new site is so much faster and easier to
            work with than my old site. I just choose the page, make the change
            and click save.
          </p>
        </blockquote>
        <div className="flex items-center mt-8">
          <img
            className="flex-shrink-0 object-cover w-10 h-10 rounded-full"
            src="https://cdn.rareblocks.xyz/collection/celebration/images/contact/4/avatar.jpg"
            alt=""
          />
          <div className="ml-4">
            <p className="text-base font-semibold text-white">Jenny Wilson</p>
            <p className="mt-px text-sm text-gray-400">Product Designer</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

  </>
  );
};

export default Register;


