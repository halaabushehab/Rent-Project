// import React, { useState } from "react";
// import { db } from "../Firebase/Configration";
// import { ref, push } from "firebase/database";

// function Contact() {
//   // حقظ بيانات النموذج
//   const [formData, setFormData] = useState({
//     email: "",
//     subject: "",
//     message: "",
//   });

//   const [success, setSuccess] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // عشان احدث البيانات عند الكتابه
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   // 🔹 إرسال البيانات إلى Realtime Database عند النقر على "Send Message"
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const messagesRef = ref(db, "contacts"); // مرجع قاعدة البيانات
//       await push(messagesRef, formData); // دفع البيانات إلى Realtime Database
//       setSuccess(true);
//       setFormData({ email: "", subject: "", message: "" }); // مسح الحقول بعد الإرسال
//     } catch (error) {
//       console.error("❌ خطأ أثناء إرسال الرسالة:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <section className="bg-white dark:bg-gray-900">
//         <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
//           <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
//             Contact Us
//           </h2>
//           <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
//             Got a technical issue? Want to send feedback about a beta feature?
//             Need details about our Business plan? Let us know.
//           </p>

//           {/* ✅ عرض رسالة نجاح بعد الإرسال */}
//           {success && (
//             <p className="text-green-500 text-center">
//               ✅ تم إرسال رسالتك بنجاح!
//             </p>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-8">
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//               >
//                 Your email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
//                 placeholder="name@example.com"
//                 required
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="subject"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
//               >
//                 Subject
//               </label>
//               <input
//                 type="text"
//                 id="subject"
//                 value={formData.subject}
//                 onChange={handleChange}
//                 className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
//                 placeholder="Let us know how we can help you"
//                 required
//               />
//             </div>
//             <div className="sm:col-span-2">
//               <label
//                 htmlFor="message"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
//               >
//                 Your message
//               </label>
//               <textarea
//                 id="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 rows={6}
//                 className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                 placeholder="Leave a comment..."
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-700 sm:w-fit hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//               disabled={loading} // تعطيل الزر أثناء الإرسال
//             >
//               {loading ? "جارٍ الإرسال..." : "Send Message"}
//             </button>
//           </form>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Contact;




import React, { useState } from "react";
import { db } from "../Firebase/Configration";
import { ref, push } from "firebase/database";

function Contact() {
  const [formData, setFormData] = useState({ email: "", subject: "", message: "" });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await push(ref(db, "contacts"), formData);
      setSuccess(true);
      setFormData({ email: "", subject: "", message: "" });
    } catch (error) {
      console.error("❌ خطأ أثناء إرسال الرسالة:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full border-t-4 border-orange-500">
        <h2 className="text-3xl font-extrabold text-[#091057] text-center mb-4">Contact Us</h2>
        <p className="text-center text-gray-600 mb-6">We'd love to hear from you! Send us a message below.</p>

        {success && <p className="text-green-600 text-center mb-4">✅ Your message has been sent successfully!</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
            <input type="email" id="email" value={formData.email} onChange={handleChange} 
              className="w-full p-3 border rounded-lg focus:ring-orange-500 focus:border-orange-500 bg-gray-100" required />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
            <input type="text" id="subject" value={formData.subject} onChange={handleChange} 
              className="w-full p-3 border rounded-lg focus:ring-orange-500 focus:border-orange-500 bg-gray-100" required />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message</label>
            <textarea id="message" value={formData.message} onChange={handleChange} rows={4}
              className="w-full p-3 border rounded-lg focus:ring-orange-500 focus:border-orange-500 bg-gray-100" required />
          </div>

          <button type="submit" 
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-orange-600 transition duration-300" 
            disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;

