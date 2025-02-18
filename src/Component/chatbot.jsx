// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import robot from "../assets/robot (1).png";

// const Chatbot = () => {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     { text: "👋 Welcome! How can I assist you in finding your ideal accommodation?", sender: "bot" },
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (open) {
//       document.body.style.transition = "background 1s ease-in-out";

//     } else {
//       document.body.style.background = "";
//     }
//   }, [open]);

//   const handleSendMessage = async () => {
//     if (input.trim() === "") return;

//     setMessages([...messages, { text: input, sender: "user" }]);
//     setInput("");
//     setLoading(true);

//     let response;
//     const predefinedResponse = generateBotResponse(input);

//     if (predefinedResponse) {
//       response = predefinedResponse;
//     } else {
//       response = await fetchAIResponse(input);
//     }

//     setTimeout(() => {
//       setMessages((prev) => [...prev, { text: response, sender: "bot" }]);
//       setLoading(false);
//     }, 1000);
//   };

//   const generateBotResponse = (userInput) => {
//     const lowerInput = userInput.toLowerCase();

//     const responses = {
//       "hi": "👋 Hello! How can I help you today?",
//       "hello": "👋 Hi there! Looking for a place to stay?",
//       "how are you": "😊 I'm just a bot, but I'm here to assist you!",

//       // أسئلة حول الموقع وخدماته
//       "what is this website": "🏠 Welcome to the Apartment & Studio Rent website! We help users find and rent apartments or studios easily. Explore now: [Home](http://localhost:5174/)",
//       "how does this website work": "🔍 Our website allows you to search, compare, and rent apartments or studios. Use filters to find your ideal home! [Start Searching](http://localhost:5174/FindaStay)",
//       "admin dashboard access": "⚙️ The Admin Dashboard lets you manage listings and users. Go to: [Admin Dashboard](http://localhost:5174/admin)",

//       // أسئلة حول الإيجار والاستئجار
//       "availability of accommodations in jordan": "🏨 Jordan offers diverse accommodations from hotels to apartments. Explore options here: [Find a Stay](http://localhost:5174/FindaStay)",
//       "summary of accommodations in jordan": "🏘️ Jordan has various housing options including hotels, hostels, and furnished apartments. Check our listings: [Explore](http://localhost:5174/FindaStay)",
//       "how to book": "📅 You can book easily through our website. Visit: [Book a Room](http://localhost:5174/FindaStay)",
//       "choose a suitable place": "🏠 Browse our listings to find the perfect accommodation: [Find a Stay](http://localhost:5174/FindaStay)",
//       "rental prices in jordan": "💰 Rental prices vary by location and property type. Check the latest listings: [Pricing](http://localhost:5174/FindaStay)",
//       "short-term vs long-term rental": "📆 Short-term rentals are flexible but costly, while long-term rentals are stable and budget-friendly. Explore your options: [Compare Rentals](http://localhost:5174/FindaStay)",

//       // أسئلة عامة حول الاستئجار
//       "how to rent an apartment": "📝 To rent an apartment, browse listings, contact the owner, and sign a lease agreement. Start here: [Find Rentals](http://localhost:5174/FindaStay)",
//       "documents needed for renting": "📄 Typically, you need an ID, proof of income, and a rental agreement. Check more details: [Rental Guide](http://localhost:5174/guide)",
//       "tips for first-time renters": "🔑 Budget wisely, check the contract, and inspect the place before moving in. Learn more: [Renting Tips](http://localhost:5174/tips)",

//       // استفسارات عن الصفحات والتنقل
//            "hi": "👋 Hello! How can I help you today?",
//         "how are you": "😊 I'm just a bot, but I'm here to assist you!",
//         "availability of accommodations in jordan": "🏨 The accommodations in Jordan are diverse, from hotels to apartments. You can explore options on our website.",
//         "summary of accommodations in jordan": "🏘️ In Jordan, you can find various housing options including hotels, hostels, and furnished apartments. Check our listings for more details.",
//         "how to book": "📅 You can easily book your accommodation through our website! Just visit the booking section.",
//         "choose a suitable place": () => navigate("/FindaStay"),
//         "how to contact site owners": () => navigate("/contact"),
//         "number of visitors": "👥 The current number of visitors is: [insert visitor count here].",
//         "go to home": () => navigate("/"),
//         "go to find a stay": () => navigate("/FindaStay"),
//         "go to about us": () => navigate("/about"),
//         "go to contact us": () => navigate("/contact"),
//         "go to add property": () => navigate("/add-property"),
//         "go to register": () => navigate("/Register"),
//         "go to user profile": () => navigate("/Userprofile"),
//         "go to help center": () => navigate("/HelpCenter"),
//         "go to admin dashboard": () => navigate("/admin"),
//         "go to rental guide": () => navigate("/guide"),

//       // أسئلة إضافية عن الخدمات
//       "how to contact site owners": "📞 Contact the site owners through: [Contact Us](http://localhost:5174/contact)",
//       "number of visitors": "👥 The current number of visitors is: [insert visitor count here].",
//       "landlord services": "🏡 List your property and manage rentals easily with our Landlord Portal: [List Property](http://localhost:5174/landlord)",
//       "tenant rights in jordan": "⚖️ Tenants in Jordan have rights regarding rent, contracts, and evictions. Read more: [Tenant Rights](http://localhost:5174/rights)"
//   };

//     for (let key in responses) {
//       if (lowerInput.includes(key)) return responses[key];
//     }
//     return null;
//   };

//   const fetchAIResponse = async (userInput) => {
//     try {
//       const res = await axios.post("https://api.openai.com/v1/chat/completions", {
//         model: "gpt-3.5-turbo",
//         messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: userInput }],
//       }, {
//         headers: {
//           "Authorization": `Bearer YOUR_OPENAI_API_KEY`,
//           "Content-Type": "application/json",
//         },
//       });
//       return res.data.choices[0].message.content;
//     } catch (error) {
//       return "😕 Sorry, I couldn't fetch an answer right now. Try again later.";
//     }
//   };

//   return (
//     <div className="fixed bottom-20 right-5 flex flex-col items-end z-50">
//       <motion.div
//         className="bg-[#EC8305] p-4 rounded-full cursor-pointer shadow-lg flex items-center justify-center"
//         whileHover={{ scale: 1.1, rotate: 10 }}
//         whileTap={{ scale: 0.9 }}
//         onClick={() => setOpen(!open)}
//       >
//         <img src={robot} alt="Chatbot" className="w-8 h-8 animate-bounce" />
//       </motion.div>

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
//                 className={`p-2 my-1 rounded-lg ${msg.sender === "bot" ? "bg-gray-100 text-black" : "bg-green-100 text-black"}`}
//               >
//                 {msg.text}
//               </div>
//             ))}
//             {loading && <div className="text-gray-500">Typing...</div>}
//           </div>

//           <div className="p-2 border-t flex">
//             <input
//               type="text"
//               className="flex-1 p-2 border rounded-l-lg"
//               placeholder="Type your question..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//             />
//             <button
//               onClick={handleSendMessage}
//               className="bg-[#EC8305] text-white px-4 py-2 rounded-r-lg"
//             >
//               ➤
//             </button>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default Chatbot;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import robot from "../assets/robot.png";

const Chatbot = () => {
  const navigate = useNavigate(); // For programmatic navigation
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "👋 Welcome! How can I assist you in finding your ideal accommodation?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.transition = "background 1s ease-in-out";
    } else {
      document.body.style.background = "";
    }
  }, [open]);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
    setLoading(true);

    let response;
    const predefinedResponse = generateBotResponse(input);

    if (predefinedResponse) {
      response = predefinedResponse;
    } else {
      response = await fetchAIResponse(input);
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { text: response, sender: "bot" }]);
      setLoading(false);
    }, 1000);
  };

  const generateBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();

    // Function to create link text
    const createLink = (text, path) => {
      return `${text} [Click here](${path})`;
    };

    // Define responses with proper relative URLs
    const responses = {
      hi: "👋 Hello! How can I help you today?",
      hello: "👋 Hi there! Looking for a place to stay?",
      "how are you": "😊 I'm just a bot, but I'm here to assist you!",

      // Website and services questions
      "what is this website": createLink(
        "🏠 Welcome to the Apartment & Studio Rent website! We help users find and rent apartments or studios easily. Explore now:",
        "/"
      ),
      "how does this website work": createLink(
        "🔍 Our website allows you to search, compare, and rent apartments or studios. Use filters to find your ideal home!",
        "/FindaStay"
      ),
      "admin dashboard access": createLink(
        "⚙️ The Admin Dashboard lets you manage listings and users. Go to:",
        "/admin"
      ),

      // Accommodation questions
      "availability of accommodations in jordan": createLink(
        "🏨 Jordan offers diverse accommodations from hotels to apartments. Explore options here:",
        "/FindaStay"
      ),
      "summary of accommodations in jordan": createLink(
        "🏘️ Jordan has various housing options including hotels, hostels, and furnished apartments. Check our listings:",
        "/FindaStay"
      ),
      "how to book": createLink(
        "📅 You can book easily through our website. Visit:",
        "/FindaStay"
      ),
      "choose a suitable place": createLink(
        "🏠 Browse our listings to find the perfect accommodation:",
        "/FindaStay"
      ),
      "rental prices in jordan": createLink(
        "💰 Rental prices vary by location and property type. Check the latest listings:",
        "/FindaStay"
      ),
      "short-term vs long-term rental": createLink(
        "📆 Short-term rentals are flexible but costly, while long-term rentals are stable and budget-friendly. Explore your options:",
        "/FindaStay"
      ),

      // General rental questions
      "how to rent an apartment": createLink(
        "📝 To rent an apartment, browse listings, contact the owner, and sign a lease agreement. Start here:",
        "/FindaStay"
      ),
      "documents needed for renting": createLink(
        "📄 Typically, you need an ID, proof of income, and a rental agreement. Check more details:",
        "/guide"
      ),
      "tips for first-time renters": createLink(
        "🔑 Budget wisely, check the contract, and inspect the place before moving in. Learn more:",
        "/tips"
      ),

      // Navigation commands
      "go to home": () => {
        navigate("/");
        return "🏠 Taking you to the Home page...";
      },
      "go to find a stay": () => {
        navigate("/FindaStay");
        return "🔍 Redirecting to Find a Stay...";
      },
      "go to about us": () => {
        navigate("/about");
        return "ℹ️ Taking you to About Us...";
      },
      "go to contact us": () => {
        navigate("/contact");
        return "📞 Redirecting to Contact page...";
      },
      "go to add property": () => {
        navigate("/add-property");
        return "🏢 Taking you to Add Property...";
      },
      "go to register": () => {
        navigate("/Register");
        return "📝 Redirecting to Registration...";
      },
      "go to user profile": () => {
        navigate("/Userprofile");
        return "👤 Taking you to your User Profile...";
      },
      "go to help center": () => {
        navigate("/HelpCenter");
        return "❓ Redirecting to Help Center...";
      },
      "go to admin dashboard": () => {
        navigate("/admin");
        return "⚙️ Taking you to Admin Dashboard...";
      },
      "go to rental guide": () => {
        navigate("/guide");
        return "📚 Redirecting to Rental Guide...";
      },

      // Additional service questions
      "how to contact site owners": createLink(
        "📞 Contact the site owners through:",
        "/contact"
      ),
      "number of visitors":
        "👥 The current number of active users on our platform is over 5,000!",
      "landlord services": createLink(
        "🏡 List your property and manage rentals easily with our Landlord Portal:",
        "/landlord"
      ),
      "tenant rights in jordan": createLink(
        "⚖️ Tenants in Jordan have rights regarding rent, contracts, and evictions. Read more:",
        "/rights"
      ),
    };

    // Check if any key in responses matches the user input
    for (let key in responses) {
      if (lowerInput.includes(key)) {
        const response = responses[key];
        // If response is a function, execute it
        if (typeof response === "function") {
          return response();
        }
        return response;
      }
    }
    return null;
  };

  const fetchAIResponse = async (userInput) => {
    try {
      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant for an apartment rental website. Provide brief, friendly responses about accommodations in Jordan.",
            },
            {
              role: "user",
              content: userInput,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      return res.data.choices[0].message.content;
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return "😕 Sorry, I couldn't fetch an answer right now. Try again later.";
    }
  };

  const handleLinkClick = (e) => {
    // Parse markdown-style links and handle navigation
    if (
      e.target.tagName === "SPAN" &&
      e.target.textContent.includes("[") &&
      e.target.textContent.includes("]")
    ) {
      const linkText = e.target.textContent;
      const linkMatch = linkText.match(/\[([^\]]+)\]\(([^)]+)\)/);

      if (linkMatch && linkMatch[2]) {
        e.preventDefault();
        navigate(linkMatch[2]);
      }
    }
  };

  // Function to render message text with clickable links
  const renderMessageText = (text) => {
    // Replace markdown-style links with spans that can be clicked
    return text.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<span class="text-blue-500 underline cursor-pointer">[$1]</span>'
    );
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
          <div
            className="p-4 max-h-60 overflow-y-auto"
            onClick={handleLinkClick}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 my-1 rounded-lg ${
                  msg.sender === "bot"
                    ? "bg-gray-100 text-black"
                    : "bg-green-100 text-black"
                }`}
                dangerouslySetInnerHTML={{
                  __html: renderMessageText(msg.text),
                }}
              />
            ))}
            {loading && <div className="text-gray-500">Typing...</div>}
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
