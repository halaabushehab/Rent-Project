import { useState } from "react";
import { FaSearch, FaChevronDown, FaChevronUp, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const faqs = [
  { question: "How do I search for student housing?", answer: "You can use our search bar to find housing by city, university, or specific properties." },
  { question: "What amenities are included?", answer: "Each listing includes details on available amenities like Wi-Fi, furnished rooms, and study spaces." },
  { question: "How do I contact a landlord?", answer: "Each listing has a contact section where you can message the landlord directly." },
  { question: "Is there a lease agreement?", answer: "Yes, most properties require a lease agreement, which will be specified in the listing details." },
  { question: "Can I book a virtual tour?", answer: "Yes! Many listings offer virtual tours so you can explore the property online before visiting in person." },
  { question: "How do I report an issue with a listing?", answer: "You can report an issue by clicking on the 'Report' button on the listing page and providing details about the problem." },
  { question: "Are utilities included in the rent?", answer: "Some properties include utilities like electricity and water, while others require separate payments. Check the listing details for more information." },
];

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Help Center</h1>
      <p className="text-gray-600">Find answers to common questions about student housing.</p>
      
      {/* Search Bar */}
      <div className="flex items-center bg-white shadow-lg rounded-lg p-3">
        <input
          type="text"
          placeholder="Search for help..."
          className="w-full p-3 border-none focus:outline-none focus:ring-2 focus:ring-[#EC8305] rounded-md transition duration-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className="text-[#EC8305] text-2xl ml-2" />
      </div>
      
      {/* FAQs Section */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <div key={index} className="border-b last:border-none py-3">
              <button
                className="w-full flex justify-between items-center text-lg font-semibold text-gray-700"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {faq.question}
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {openIndex === index && <p className="mt-2 text-gray-600">{faq.answer}</p>}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No results found.</p>
        )}
      </div>

      {/* Getting Started Section */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-2xl font-semibold mb-3">Getting Started</h2>
        <p className="text-gray-600">New here? Start by creating an account and exploring available listings.</p>
      </div>

      {/* Popular Topics */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-2xl font-semibold mb-3">Popular Topics</h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>How to find student housing</li>
          <li>Understanding lease agreements</li>
          <li>Virtual property tours</li>
          <li>Tips for contacting landlords</li>
        </ul>
      </div>

      {/* Contact Us Section */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
        <p className="text-gray-600">Need more help? Reach out to our support team.</p>
        <div className="mt-3 space-y-2">
          <p className="flex items-center text-gray-700"><FaEnvelope className="mr-2 text-[#EC8305]" /> support@hapirent.com</p>
          <p className="flex items-center text-gray-700"><FaPhone className="mr-2 text-[#EC8305]" /> +1 (555) 987-6543</p>
          <p className="flex items-center text-gray-700"><FaMapMarkerAlt className="mr-2 text-[#EC8305]" /> 456 HapiRent Street, City, Country</p>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
