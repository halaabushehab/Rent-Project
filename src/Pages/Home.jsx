import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, FormInputIcon, Import } from "lucide-react";
import { FaBed, FaCheckCircle, FaTag, FaHeadset } from "react-icons/fa";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import calendarIcon from "../assets/calendar.png";
import calendarIconAlt from "../assets/diskette (1).png";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../Firebase/Configration";
import { FaBroom, FaUtensils, FaWifi, FaChalkboardTeacher } from "react-icons/fa";
import help from "../assets/24-hours-support.png";
import done from "../assets/24-hours-support.png";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const universities = [
  {
    name: "الجامعة الأردنية",
    logo: "https://9afi.com/thumb/360x210/storage/blogs/9vqBnykrGUtKZhVY5BAg4PoEJS6jsx3XzKo8MeRV.png",
    src: "https://www.booking.com/hotel/jo/amman-west-apartments.ar.html",
  },
  {
    name: "جامعة الأميرة سمية للتكنولوجيا",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTouO-45bF95FjOEx4RFaZek5ubrRAKenzh5vYwIh4oGBu2fy4K46DAyeXUdEjfFVY7700&usqp=CAU",
  },
  {
    name: "جامعة الهاشمية  ",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLXJCb_t4c-riOfF2GfOvOrEL0sbSePC6owqWt112d6UbQojSlPy_Y3zLCdLiYbh36sl8&usqp=CAU",
  },
  {
    name: "جامعة البلقاء التطبيقية",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRORbI7WbEf6dw82jLFf_aIGm9ZW-g4EkAoEg&s",
  },
  {
    name: "جامعة اليرموك",
    logo: "https://www.mohe.gov.jo/ebv4.0/root_storage/ar/eb_list_page/%D8%AC%D8%A7%D9%85%D8%B9%D8%A9_%D8%A7%D9%84%D9%8A%D8%B1%D9%85%D9%88%D9%83-1.jpg",
  },
  {
    name: "جامعة العلوم والتكنولوجيا الأردنية",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV_HWAly-yqWL-14fQFbbj2LnP_HSdxg2nrw&sg",
  },
  {
    name: "جامعة الزيتونة الأردنية",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlR-1o5Di8nEfo1nGIjQ223wO25ozHhqDjtA&s",
  },
  {
    name: "جامعة مؤتة",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAnJ5XLNW1AD9-tBhfazUWphw7-pFNzSURew&s",
  },
  {
    name: "جامعة الحسين بن طلال",
    logo: "https://9afi.com/thumb/1130x636/storage/blogs/8bwQ4savP1Du4iRNIj8yxAD11URrIwGNwMwOPQIi.png",
  },
  {
    name: "الجامعة الأردنية",
    logo: "https://9afi.com/thumb/360x210/storage/blogs/9vqBnykrGUtKZhVY5BAg4PoEJS6jsx3XzKo8MeRV.png",
  },
  {
    name: "جامعة الأميرة سمية للتكنولوجيا",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTouO-45bF95FjOEx4RFaZek5ubrRAKenzh5vYwIh4oGBu2fy4K46DAyeXUdEjfFVY7700&usqp=CAU",
  },
  {
    name: "جامعة الهاشمية  ",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLXJCb_t4c-riOfF2GfOvOrEL0sbSePC6owqWt112d6UbQojSlPy_Y3zLCdLiYbh36sl8&usqp=CAU",
  },
  {
    name: "جامعة البلقاء التطبيقية",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRORbI7WbEf6dw82jLFf_aIGm9ZW-g4EkAoEg&s",
  },
  {
    name: "جامعة اليرموك",
    logo: "https://www.mohe.gov.jo/ebv4.0/root_storage/ar/eb_list_page/%D8%AC%D8%A7%D9%85%D8%B9%D8%A9_%D8%A7%D9%84%D9%8A%D8%B1%D9%85%D9%88%D9%83-1.jpg",
  },
];

const properties = [
  {
    id: 1,
    location: "Amman, Jordan",
    host: "Stay with Ahmad - Cozy Apartment",
    date: "Feb 20 - 25",
    price: 30,
    rating: 4.9,
    isBooked: false,
    images: [
      "https://a0.muscache.com/im/pictures/9a34b46b-dcb3-42b4-9a3b-3dc54c8ffb4c.jpg?im_w=480&im_format=avif",
      "https://a0.muscache.com/im/pictures/229422e1-bbe3-46c0-9d72-7fcfcf2af51d.jpg?im_w=480&im_format=avif",
      "https://a0.muscache.com/im/pictures/fdb7aa0a-d6bf-4dc2-b161-5f13c5ab00e1.jpg?im_w=480&im_format=avif",
      "https://a0.muscache.com/im/pictures/b256a9b3-99db-4489-ab93-3660ec178b8b.jpg?im_w=960&im_format=avif",

    ],
  },
  {
    id: 2,
    location: "Dead Sea, Jordan",
    host: "Luxury Resort Suite",
    date: "Mar 5 - 10",
    price: 40,
    rating: 4.95,
    isBooked: true,
    images: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTMxMjg2NDMyMTgxNzI4MTY0MA%3D%3D/original/0903754f-a8ab-458d-995b-d364685839fb.jpeg?im_w=960&im_format=avif",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTMxMjg2NDMyMTgxNzI4MTY0MA%3D%3D/original/ec6733d8-9cea-42ef-9e51-dbd77bb2afe6.jpeg?im_w=480&im_format=avif",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTMxMjg2NDMyMTgxNzI4MTY0MA%3D%3D/original/ac018721-46e4-4152-a4fd-410e9a20e8ba.jpeg?im_w=480&im_format=avif",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTMxMjg2NDMyMTgxNzI4MTY0MA%3D%3D/original/6ef30b1f-3590-4fa4-b7a8-b9817658246c.jpeg?im_w=480&im_format=avif",

    ],
  },
  {
    id: 3,
    location: "Wadi Rum, Jordan",
    host: "Stay with Bedouins - Desert Camp",
    date: "Apr 1 - 5",
    price: 35,
    rating: 4.85,
    isBooked: false,
    images: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTM1MDg1OTUzNDg3MjIyMDY0Mw%3D%3D/original/3b8c62c0-0dda-4e9b-a518-642c09e32573.jpeg?im_w=960&im_format=avif",
      "https://a0.muscache.com/im/pictures/miso/Hosting-1350087520850588086/original/eb3b6c76-8ca0-41f3-8b53-40d7b77173f5.jpeg?im_w=480&im_format=avif",
      "https://a0.muscache.com/im/pictures/miso/Hosting-1350087520850588086/original/8651737c-8f99-4343-85a3-585d62456f98.jpeg?im_w=480&im_format=avif",
      "https://a0.muscache.com/im/pictures/miso/Hosting-1350087520850588086/original/0e6a3ff3-9f14-4d9c-8c5c-0c30052bebee.jpeg?im_w=480&im_format=avif",

    ],
  },
  {
    id: 5,
    location: "Aqaba, Jordan",
    host: "Seaside Apartment with Balcony",
    date: "Feb 28 - Mar 5",
    price: 50,
    rating: 4.92,
    isBooked: false,
    images: [
      "https://a0.muscache.com/im/pictures/miso/Hosting-944354094310412051/original/c91fb9e9-ec1f-4c46-b69b-20b37de1ca6b.jpeg?im_w=480&im_format=avif",
      "https://a0.muscache.com/im/pictures/miso/Hosting-944354094310412051/original/78ed40a7-a180-4386-9b33-6aaa8c1e364d.jpeg?im_w=960&im_format=avif",
      "https://a0.muscache.com/im/pictures/miso/Hosting-944354094310412051/original/afa06c42-e20a-4fc2-be1e-89b95a4bcb80.jpeg?im_w=480&im_format=avif",
      "https://a0.muscache.com/im/pictures/miso/Hosting-944354094310412051/original/77e66063-cbb7-47af-bc9d-97de8de7e29e.jpeg?im_w=480&im_format=avif",

    ],
  },
];


const Home = () => {
  const navigate = useNavigate();

  const [housingData, setHousingData] = useState([]);

  useEffect(() => {
    axios
      .get("https://rent-app-a210b-default-rtdb.firebaseio.com/student_housing.json")
      .then((response) => {
        if (response.data) {
          // تحويل البيانات من كائن إلى مصفوفة
          const propertiesArray = Object.keys(response.data).map((key) => ({
            id: key,
            ...response.data[key],
          }));
          setHousingData(propertiesArray);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);





  const [showServices, setShowServices] = useState(false);
  // const [activeService, setActiveService] = useState(null);

  const services = [
    { id: 1, icon: <FaBroom className="text-blue-500 text-4xl" />, title: "Room Cleaning", description: "Get your room cleaned regularly with our professional service.", link: "https://alemtyaz-jo.com/en/hard-services-2/" },
    { id: 2, icon: <FaUtensils className="text-red-500 text-4xl" />, title: "Meal Delivery", description: "Enjoy fresh meals delivered straight to your accommodation.", link: "https://www.talabat.com/ar/jordan" },
    { id: 3, icon: <FaWifi className="text-green-500 text-4xl" />, title: "High-Speed Internet", description: "Stay connected with our reliable high-speed internet service.", link: "https://www.orange.jo" },
    { id: 4, icon: <FaChalkboardTeacher className="text-yellow-500 text-4xl" />, title: "Study Room Subscription", description: "Access shared study rooms for a focused learning environment.", link: "https://www.studytogether.com/" },
  ];




  
  // cards الاحصائيات

  const [stats, setStats] = useState([
    { title: "2+ Months", subtitle: "Operating Since" },
    { title: "0", subtitle: "Website Visitors" },
    { title: "0", subtitle: "Bookings Confirmed" },
    { title: "15+", subtitle: "Partner Universities" },
  ]);

  useEffect(() => {
    const db = getDatabase(app);

    const updateStats = (path, index) => {
      onValue(ref(db, path), (snapshot) => {
        if (snapshot.exists()) {
          setStats((prevStats) => {
            const newStats = [...prevStats];
            newStats[index].title = `${Object.keys(snapshot.val()).length}+`;
            return newStats;
          });
        }
      });
    };

    updateStats("users", 1); // تحديث عدد زوار الموقع
    updateStats("bookings", 2); // تحديث عدد الحجوزات المؤكدة
  }, []);

  // cards الاحصائيات

  const [currentIndex, setCurrentIndex] = useState(0);
  const isBooked = true; // غيّر هذه القيمة إلى false إذا كان العقار متاحًا

  // حالة الصور لكل بطاقة
  const [currentIndices, setCurrentIndices] = useState(
    Array(properties.length).fill(0)
  );

  const nextSlide = (index) => {
    setCurrentIndices((prev) =>
      prev.map((currentIndex, i) =>
        i === index
          ? (currentIndex + 1) % properties[i].images.length
          : currentIndex
      )
    );
  };

  const prevSlide = (index) => {
    setCurrentIndices((prev) =>
      prev.map((currentIndex, i) =>
        i === index
          ? (currentIndex - 1 + properties[i].images.length) %
            properties[i].images.length
          : currentIndex
      )
    );
  };










  const [searchTerm, setSearchTerm] = useState("");
  
  // قائمة البيانات (يمكنك جلبها من API أو قاعدة بيانات)
  const data = [
    { id: 1, name: "Amman University", city: "Amman" },
    { id: 2, name: "Jordan University", city: "Irbid" },
    { id: 3, name: "Yarmouk University", city: "Irbid" },
    { id: 4, name: "Petra University", city: "Amman" },
    { id: 5, name: "Aqaba Technical College", city: "Aqaba" }
  ];

  // فلترة البيانات بناءً على إدخال المستخدم
  const filteredResults = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.city.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (

    <>
      {/*  hero section strat */}
      <section className="relative flex flex-col items-center justify-center bg-[#F7F7F7] py-16">
        <div className="flex flex-col-reverse md:flex-row justify-between items-center w-full max-w-6xl px-6">
          {/* Left Side (Text & Search Bar) */}
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-extrabold text-[#091057] leading-tight">
              Find, Explore &{" "}
              <span className="text-[#EC8305]">Book Your Perfect Room!</span>
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              Discover a variety of student housing options near universities
              and workplaces.
            </p>

            {/* Search Bar */}
            <div className="max-w-lg mx-auto p-6">
      {/* مربع البحث */}
      <div className="mt-6 flex flex-col sm:flex-row items-center bg-white shadow-lg rounded-lg p-3">
        <input
          type="text"
          placeholder="Search by city, university, or property"
          className="w-full p-3 border-none focus:outline-none focus:ring-2 focus:ring-[#EC8305] rounded-md transition duration-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="mt-3 sm:mt-0 w-full sm:w-auto flex items-center bg-[#EC8305] text-white px-5 py-3 rounded-lg hover:bg-[#d97305] transition duration-200">
          <FaSearch className="mr-2" /> Search
        </button>
      </div>

      {/* عرض النتائج */}
      {searchTerm && (
        <div className="mt-4 bg-white shadow-lg rounded-lg p-3">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Results:</h3>
          {filteredResults.length > 0 ? (
            <ul>
              {filteredResults.map(item => (
                <li key={item.id} className="p-2 border-b last:border-none">
                  <span className="font-semibold text-[#EC8305]">{item.name}</span> - {item.city}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No results found.</p>
          )}
        </div>
      )}
    </div>
          </div>

          {/* Right Side (Animated Image) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full max-w-md md:max-w-lg mb-8 md:mb-0"
          >
            <img
              src="https://cdn.pixabay.com/photo/2024/03/29/17/43/ai-generated-8663299_1280.png"
              alt="Student Accommodation"
              className="rounded-lg shadow-2xl"
            />
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white shadow-lg rounded-lg p-6 text-center"
            >
              <h3 className="text-3xl font-bold text-[#091057]">
                {item.title}
              </h3>
              <p className="text-gray-700">{item.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </section>
      {/*  hero section end */}





























      {/*  Cards Section Start */}

      <h2 className="text-4xl font-bold text-[#091057]  mb-6 text-center my-30 tracking-wide  h-">
        ✨ Student Accommodation Students Love in Jordan ✨
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-20 mx-auto  max-w-[90%]">
        {properties.map((property, index) => (
          <div
            key={property.id}
            className="bg-white rounded-lg shadow-xl overflow-hidden transition-transform transform hover:scale-105 h-[550px]"
          >
            <div className="relative">
              <div
                className={`absolute top-3 left-3 px-3 py-1 text-xs font-bold text-white uppercase rounded-lg ${
                  property.isBooked ? "bg-red-500" : "bg-green-500"
                } bg-opacity-90 shadow-md`}
              >
                {property.isBooked ? "Booked" : "Available"}
              </div>

              <img
                src={property.images[currentIndices[index]]}
                alt="Property"
                className="w-full h-[300px] object-cover transition-opacity duration-500"
              />

              <button
                className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white bg-opacity-70 text-gray-800 p-2 rounded-full hover:bg-opacity-100"
                onClick={() => prevSlide(index)}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white bg-opacity-70 text-gray-800 p-2 rounded-full hover:bg-opacity-100"
                onClick={() => nextSlide(index)}
              >
                <ChevronRight size={24} />
              </button>

              <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
                <img
                  src={property.isBooked ? calendarIcon : calendarIconAlt}
                  alt="Calendar Icon"
                  className="w-6 h-6"
                />
              </button>

              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                {property.images.map((_, imgIndex) => (
                  <button
                    key={imgIndex}
                    onClick={() =>
                      setCurrentIndices((prev) =>
                        prev.map((currentIndex, i) =>
                          i === index ? imgIndex : currentIndex
                        )
                      )
                    }
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentIndices[index] === imgIndex
                        ? "bg-white"
                        : "bg-gray-400 opacity-50"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold">{property.location}</h3>
              <p className="text-gray-600">{property.host}</p>
              <p className="mt-2 text-gray-800 text-sm">{property.date}</p>
              <p className="mt-4 text-xl font-bold">{property.price} JD /night</p>
              <div className="flex items-center mt-2">
                <span className="text-yellow-500">⭐ {property.rating}</span>
                <span className="ml-2 text-green-500">Guest favorite</span>
              </div>
              <button
        onClick={() => handleMoreDetails(property.id)}
        className="mt-4 bg-white text-orange-500 border border-orange-500 py-2 px-4 rounded-lg transition-all duration-300 hover:bg-orange-500 hover:text-white hover:scale-105 focus:outline-none shadow-lg"
      >
More Details      </button>
            </div>
            
          </div>
        ))}

      </div>
      {/*  Cards Section End */}










      {/*  ACCOMMODATION way section end */}

      <section className="container mx-auto my-40 px-6 text-center ">
        <h2 className=" container text-3xl font-extrabold text-[#091057] mb-2 ">
          HabiRent – Find Your Ideal Student & Professional Housing in Jordan
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto my-7">
          Looking for a{" "}
          <span className="font-semibold text-[#EC8305]">
            comfortable and convenient
          </span>{" "}
          place to stay near your{" "}
          <span className="font-semibold text-[#091057]">
            university or workplace
          </span>
          ? HabiRent offers{" "}
          <span className="font-semibold text-[#EC8305]">
            verified accommodations
          </span>{" "}
          across Jordan, ensuring{" "}
          <span className="font-semibold text-[#091057]">
            affordable, safe, and hassle-free housing
          </span>{" "}
          for students and professionals.
          <span className="text-[#EC8305] font-bold">
            Book with confidence today!
          </span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Floor Plan & Room Details */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105">
            <div className="flex items-center justify-center w-16 h-16 bg-[#EC8305] text-white rounded-full mx-auto mb-4">
              <FaBed size={30} />
            </div>
            <h3 className="font-semibold text-[#EC8305] text-lg">
              Floor Plan & Room Details
            </h3>
            <p className="text-gray-600 mt-2">
              Get to know room number, orientation for floor plans, and
              roommates.
            </p>
          </div>

          {/* 100% Verified Properties */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105">
            <div className="flex items-center justify-center w-16 h-16 bg-[#EC8305] text-white rounded-full mx-auto mb-4">
              <FaCheckCircle size={30} />
            </div>
            <h3 className="font-semibold text-[#EC8305] text-lg">
              100% Verified Properties
            </h3>
            <p className="text-gray-600 mt-2">Verified for a safe stay.</p>
          </div>

          {/* Price-Match Guarantee */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105">
            <div className="flex items-center justify-center w-16 h-16 bg-[#EC8305] text-white rounded-full mx-auto mb-4">
              <FaTag size={30} />
            </div>
            <h3 className="font-semibold text-[#EC8305] text-lg">
              Price-Match Guarantee
            </h3>
            <p className="text-gray-600 mt-2">
              Find a lower price and we will match it.
            </p>
          </div>

          {/* 1-on-1 Professional Support */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105">
            <div className="flex items-center justify-center w-16 h-16 bg-[#EC8305] text-white rounded-full mx-auto mb-4">
              <FaHeadset size={30} />
            </div>
            <h3 className="font-semibold text-[#EC8305] text-lg">
              1-on-1 Professional Support
            </h3>
            <p className="text-gray-600 mt-2">
              Just one call away, we’ll be there for you around the clock.
            </p>
          </div>
        </div>
      </section>

      {/*  ACCOMMODATION way section end */}















      {/*  Cards Section Start */}
      <h2 className="text-4xl font-bold text-[#091057] mb-6 text-center tracking-wide">
  ✨🏡 Your Next Home Awaits – Explore Now! ✨
</h2>


      <div className="p-6">
      {/* 🔹 عرض العقارات بتمرير أفقي */}
      <div className="overflow-x-auto whitespace-nowrap py-8 px-15">
        <div className="flex space-x-4 px-4 snap-x snap-mandatory">
          {housingData.length > 0 ? (
            housingData.map((item, index) => (
              <div
                key={item.id ? item.id : `item-${index}`}
                className="min-w-[300px] border rounded-lg shadow-lg overflow-hidden bg-white snap-start p-4"
              >
                <img
                  src={
                    Array.isArray(item.images)
                      ? item.images[0]
                      : item.images || "https://via.placeholder.com/150"
                  }
                  alt={item.name || "No Name"}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold">{item.location || "No Location"}</h2>
                  <p className="text-gray-500">{item.name || "No Name"}</p>
                  <p className="text-xl font-bold mt-2">{item.price || "N/A"}JD/Night</p>

                  {/* 🔹 زر "More Details" */}
                  <button
                    onClick={() => handleMoreDetails(item.id)}
                    className="mt-4 bg-white text-orange-500 border border-orange-500 py-2 px-4 rounded-lg transition-all duration-300 hover:bg-orange-500 hover:text-white hover:scale-105 focus:outline-none shadow-lg w-35"
                  >
                    More Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No properties available</p>
          )}
        </div>
      </div>
    </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto max-w-[90%] my-20">
        {properties.map((property, index) => (
          <div
            key={property.id}
            className="bg-white rounded-lg shadow-xl overflow-hidden transition-transform transform hover:scale-105 h-[550px]"
          >
            <div className="relative">
              <div
                className={`absolute top-3 left-3 px-3 py-1 text-xs font-bold text-white uppercase rounded-lg ${
                  property.isBooked ? "bg-red-500" : "bg-green-500"
                } bg-opacity-90 shadow-md`}
              >
                {property.isBooked ? "Booked" : "Available"}
              </div>

              <img
                src={property.images[currentIndices[index]]}
                alt="Property"
                className="w-full h-[300px] object-cover transition-opacity duration-500"
              />

              <button
                className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white bg-opacity-70 text-gray-800 p-2 rounded-full hover:bg-opacity-100"
                onClick={() => prevSlide(index)}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white bg-opacity-70 text-gray-800 p-2 rounded-full hover:bg-opacity-100"
                onClick={() => nextSlide(index)}
              >
                <ChevronRight size={24} />
              </button>

              <button className="absolute top-4 right-4 bg-transparent rounded-full p-2 shadow-md">
                <img
                  src={property.isBooked ? calendarIcon : calendarIconAlt}
                  alt="Calendar Icon"
                  className="w-6 h-6"
                />
              </button>

              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                {property.images.map((_, imgIndex) => (
                  <button
                    key={imgIndex}
                    onClick={() =>
                      setCurrentIndices((prev) =>
                        prev.map((currentIndex, i) =>
                          i === index ? imgIndex : currentIndex
                        )
                      )
                    }
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentIndices[index] === imgIndex
                        ? "bg-white"
                        : "bg-gray-400 opacity-50"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold">{property.location}</h3>
              <p className="text-gray-600">{property.host}</p>
              <p className="mt-2 text-gray-800 text-sm">{property.date}</p>
              <p className="mt-4 text-xl font-bold">${property.price}/night</p>
              <div className="flex items-center mt-2">
                <span className="text-yellow-500">⭐ {property.rating}</span>
                <span className="ml-2 text-green-500">Guest favorite</span>
              </div>
            </div>
          </div>
        ))}
      </div> */}
      {/*  Cards Section End */}










      {/*   way to rent house  */}
      {/* <section className="bg-gradient-to-b from-[#F7F7F7] to-[#8AA2D0] py-20"> */}

      <section className="bg-[#F7F7F7] py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#091057] mb-12">
            How to Rent a Home
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            {/* Step 1 */}
            <div className="relative bg-white p-8 rounded-lg shadow-xl w-80 text-center transition-transform transform hover:scale-105">
              <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-[#5C6BC0] text-white text-xl font-bold w-14 h-14 flex items-center justify-center rounded-full shadow-md">
                1
              </div>
              <div className="text-[#5C6BC0] text-5xl mb-4">🌍</div>
              <h3 className="text-2xl font-semibold text-[#091057]">
                Explore Your City
              </h3>
              <p className="mt-3 text-gray-600">
                Find the best accommodations near your university or workplace.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative bg-white p-8 rounded-lg shadow-xl w-80 text-center transition-transform transform hover:scale-105">
              <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-[#5C6BC0] text-white text-xl font-bold w-14 h-14 flex items-center justify-center rounded-full shadow-md">
                2
              </div>
              <div className="text-[#5C6BC0] text-5xl mb-4">📝</div>
              <h3 className="text-2xl font-semibold text-[#091057]">
                Submit Your Application
              </h3>
              <p className="mt-3 text-gray-600">
                Apply for properties that match your needs, and we’ll guide you
                through the process.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative bg-white p-8 rounded-lg shadow-xl w-80 text-center transition-transform transform hover:scale-105">
              <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-[#5C6BC0] text-white text-xl font-bold w-14 h-14 flex items-center justify-center rounded-full shadow-md">
                3
              </div>
              <div className="text-[#5C6BC0] text-5xl mb-4">🏡</div>
              <h3 className="text-2xl font-semibold text-[#091057]">
                Confirm Your Booking
              </h3>
              <p className="mt-3 text-gray-600">
                Sign the lease and make your payment to secure your new home!
              </p>
            </div>
          </div>

          <div className="mt-12">
      <button
        onClick={() => navigate("/FindaStay")}
        className="bg-[#EC8305] text-white py-3 px-6 text-lg font-semibold rounded-lg hover:bg-[#d97305] transition duration-300 shadow-lg transform hover:scale-105"
      >
        Start Now
      </button>
    </div>
        </div>
      </section>

      {/*   way to rent house  */}








{/*  new seaction  */}
<>
      {/* زر الخدمات العائم */}
      <button
        className="fixed bottom-40 right-6  p-4  text-white rounded-full shadow-lg  transition transform hover:scale-110"
        onClick={() => setShowServices(!showServices)}
      >
        <img
          src={help} 
          className="w-8 h-8"
        />
      </button>

        {/* القائمة الجانبية مع تأثيرات أجمل */}
        <div
        className={`fixed top-0 right-0 h-full bg-white bg-opacity-80 backdrop-blur-lg shadow-2xl w-72 p-6 rounded-l-3xl transition-transform duration-500 ${
          showServices ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* زر إغلاق داخل القائمة */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Student Services</h2>
          <button onClick={() => setShowServices(false)} className="text-gray-500 hover:text-gray-800">
            <IoClose className="text-3xl" />
          </button>
        </div>

        <ul className="space-y-4">
  {services.map((service) => (
    <li
      key={service.id}
      className="flex items-center space-x-3 p-3 bg-white rounded-xl shadow-md hover:bg-gray-200 transition cursor-pointer"
    >
      {service.icon}
      <a
        href={service.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-800 font-medium hover:text-blue-500 transition"
      >
        {service.title}
      </a>
    </li>
  ))}
</ul>
      </div>
    </>
{/*  new seaction  */}
 



      {/* final scroll section  */}

      <div className="relative py-12 overflow-hidden">
        <h2 className="text-center text-3xl font-bold text-[#5C6BC0] mb-6 my-5 tracking-wide">
          University Partners
        </h2>
        <div className="overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap my-10">
            {universities.concat(universities).map((university, index) => (
              <div
                key={index}
                className="mx-8 bg-white/20 backdrop-blur-lg p-4 rounded-xl shadow-lg flex items-center justify-center"
              >
                <img
                  src={university.logo}
                  alt={university.name}
                  className="h-16 transition-transform hover:scale-110 duration-300"
                />
              </div>
            ))}
          </div>
        </div>
        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-marquee {
            display: flex;
            animation: marquee 20s linear infinite;
            width: max-content;
          }
        `}</style>
      </div>

      {/* final scroll section  */}
    </>
  );
};

export default Home;
