// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import robot from "../assets/robot (1).png";

// const Chatbot = () => {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     { text: "👋 Welcome! How can I assist you in finding your ideal accommodation?", sender: "bot" },
//   ]);

//   useEffect(() => {
//     if (open) {
//       document.body.style.transition = "background 1s ease-in-out";
//       document.body.style.background = "#f4f1de"; // تغيير لون الخلفية عند فتح الـ Chatbot
//     } else {
//       document.body.style.background = "";
//     }
//   }, [open]);

//   const handleOptionClick = (option) => {
//     let response;
//     switch (option) {
//       case "findRoom":
//         response = "🔎 Here are some available accommodation options...";
//         break;
//       case "paymentQuestions":
//         response = "💳 You can pay using credit cards, PayPal, or bank transfer.";
//         break;
//       case "bookRoom":
//         response = "📅 You can easily book your accommodation through our website!";
//         break;
//       default:
//         response = "How else can I assist you?";
//     }
//     setMessages([...messages, { text: response, sender: "bot" }]);
//   };

//   return (
//     <div className="fixed bottom-20 right-5 flex flex-col items-end z-50">
//       {/* Chatbot Floating Icon */}
//       <motion.div
//         className="bg-[#EC8305] p-4 rounded-full cursor-pointer shadow-lg flex items-center justify-center"
//         whileHover={{ scale: 1.1, rotate: 10 }}
//         whileTap={{ scale: 0.9 }}
//         onClick={() => setOpen(!open)}
//       >
//         <img
//           src={robot}
//           alt="Chatbot"
//           className="w-8 h-8 animate-bounce"
//         />
//       </motion.div>

//       {/* Chat Window */}
//       {open && (
//         <motion.div
//           className="w-80 bg-white rounded-lg shadow-xl overflow-hidden mt-2"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: 20 }}
//         >
//           <div className="bg-[#EC8305] text-white p-3 text-center rounded-t-lg">
//             <h2>Smart Assistant 🤖</h2>
//           </div>
//           <div className="p-4 max-h-60 overflow-y-auto">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`p-2 my-1 rounded-lg ${
//                   msg.sender === "bot" ? "bg-gray-100 text-black" : "bg-green-100 text-black"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             ))}
//           </div>
//           <div className="p-2 space-y-2">
//             <motion.button
//               onClick={() => handleOptionClick("findRoom")}
//               className="w-full bg-[#EC8305] text-white py-2 rounded-lg hover:bg-[#d97305] transition duration-300"
//               whileHover={{ scale: 1.05 }}
//             >
//               🏠 Find Accommodation
//             </motion.button>
//             <motion.button
//               onClick={() => handleOptionClick("paymentQuestions")}
//               className="w-full bg-[#EC8305] text-white py-2 rounded-lg hover:bg-[#d97305] transition duration-300"
//               whileHover={{ scale: 1.05 }}
//             >
//               💰 Payment Methods
//             </motion.button>
//             <motion.button
//               onClick={() => handleOptionClick("bookRoom")}
//               className="w-full bg-[#EC8305] text-white py-2 rounded-lg hover:bg-[#d97305] transition duration-300"
//               whileHover={{ scale: 1.05 }}
//             >
//               📅 Book a Room
//             </motion.button>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default Chatbot;



import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import robot from "../assets/robot (1).png";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "👋 Welcome! How can I assist you in finding your ideal accommodation?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (open) {
      document.body.style.transition = "background 1s ease-in-out";
      document.body.style.background = "#f4f1de";
    } else {
      document.body.style.background = "";
    }
  }, [open]);

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    setMessages([...messages, { text: input, sender: "user" }]);

    const response = generateBotResponse(input);
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: response, sender: "bot" }]);
    }, 1000);

    setInput("");
  };

  const handleOptionClick = (option) => {
    let response;
    switch (option) {
      case "findRoom":
        response = "🔎 Here are some available accommodation options...";
        break;
      case "paymentQuestions":
        response = "💳 You can pay using credit cards, PayPal, or bank transfer.";
        break;
      case "bookRoom":
        response = "📅 You can easily book your accommodation through our website!";
        break;
      default:
        response = "How else can I assist you?";
    }
    setMessages([...messages, { text: response, sender: "bot" }]);
  };

  const generateBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes("find room")) {
      return "🔎 Here are some available accommodation options...";
    } else if (lowerInput.includes("payment")) {
      return "💳 You can pay using credit cards, PayPal, or bank transfer.";
    } else if (lowerInput.includes("book")) {
      return "📅 You can easily book your accommodation through our website!";
    } else if (lowerInput.includes("bring pets")) {
      return "🐾 Unfortunately, we do not allow pets at the property, except for registered service dogs or assistance dogs.";
    } else if (lowerInput.includes("choose room")) {
      return "🛏️ You can specify your preferred room type at the time of booking.";
    } else if (lowerInput.includes("who lives in shared flat")) {
      return "👥 You can view the gender of those who have already booked a room in your chosen flat during the booking process.";
    } else if (lowerInput.includes("overnight guests")) {
      return "🛌 Yes, you can have overnight guests occasionally, but please inform your roommates and comply with our policy.";
    } else if (lowerInput.includes("make a group booking")) {
      return "👥 You can book with friends through our online portal, where you can select rooms together.";
    } else if (lowerInput.includes("under 18")) {
      return "🔞 Tenants under 18 must have a guarantor and will need to provide consent from a parent or guardian.";
    } else if (lowerInput.includes("bring tv")) {
      return "📺 You can bring your own TV, but ensure you have a valid TV license.";
    } else if (lowerInput.includes("bring car")) {
      return "🚗 Yes, but you will need to register your car with us beforehand.";
    } else {
      return "🤖 I'm still learning! But I'm here to help. Try asking about accommodation, payment, or booking.";
    }
  };

  return (
    <div className="fixed bottom-20 right-5 flex flex-col items-end z-50">
      <motion.div
        className="bg-[#EC8305] p-4 rounded-full cursor-pointer shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
      >
        <img src={robot} alt="Chatbot" className="w-8 h-8 animate-bounce" />
      </motion.div>

      {open && (
        <motion.div
          className="w-80 bg-white rounded-lg shadow-xl overflow-hidden mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <div className="bg-[#EC8305] text-white p-3 text-center rounded-t-lg">
            <h2>Smart Assistant 🤖</h2>
          </div>
          <div className="p-4 max-h-60 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 my-1 rounded-lg ${
                  msg.sender === "bot" ? "bg-gray-100 text-black" : "bg-green-100 text-black"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="p-2 space-y-2">
            <h3 className="text-gray-600 text-sm">Quick Options:</h3>
            <div className="grid grid-cols-2 gap-2">
              <motion.button
                onClick={() => handleOptionClick("findRoom")}
                className="bg-[#EC8305] text-white py-2 rounded-lg hover:bg-[#d97305] transition duration-300"
                whileHover={{ scale: 1.05 }}
              >
                🏠 Find Accommodation
              </motion.button>
              <motion.button
                onClick={() => handleOptionClick("paymentQuestions")}
                className="bg-[#EC8305] text-white py-2 rounded-lg hover:bg-[#d97305] transition duration-300"
                whileHover={{ scale: 1.05 }}
              >
                💰 Payment Methods
              </motion.button>
              <motion.button
                onClick={() => handleOptionClick("bookRoom")}
                className="col-span-2 bg-[#EC8305] text-white py-2 rounded-lg hover:bg-[#d97305] transition duration-300"
                whileHover={{ scale: 1.05 }}
              >
                📅 Book a Room
              </motion.button>
            </div>
          </div>

          <div className="p-2 border-t flex">
            <input
              type="text"
              className="flex-1 p-2 border rounded-l-lg"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="bg-[#EC8305] text-white px-4 py-2 rounded-r-lg"
            >
              ➤
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Chatbot;
