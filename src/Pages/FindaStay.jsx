import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchselectedCourt } from "../Redux/propertySlice";
import { Link } from "react-router-dom";
export default function FindStay() {
  const url =
    "https://rent-app-a210b-default-rtdb.firebaseio.com/student_housing.json";
  const [housingData, setHousingData] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const dispatch = useDispatch();
  const selectedStadium = useSelector((state) => state.courtInfo.selectedCourt);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const data = response.data;
        const formattedData = data
          ? Object.values(data).filter((item) => item.approve === true)
          : [];
        const filteredData = formattedData.filter((item) => {
          if (filterType === "apartment") {
            return item.name.toLowerCase().includes("apartment");
          } else if (filterType === "studio") {
            return item.name.toLowerCase().includes("studio");
          }
          return true;
        });
        setHousingData(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [filterType]);

  // Track the updates to selectedStadium
  useEffect(() => {
    console.log(selectedStadium); // Log when selectedStadium changes
  }, [selectedStadium]);

  function itemInfo(item) {
    dispatch(fetchselectedCourt(item)); // Dispatching the selected item
    // No need to log selectedStadium here, as it's updated asynchronously
  }

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold text-[#091057] mb-6 text-center tracking-wide">
        ✨ Available Apartments and Studios✨
      </h2>

      <div className="mb-6">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="all">All</option>
          <option value="apartment">Apartment</option>
          <option value="studio">Studio</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto max-w-[90%]">
        {housingData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-xl overflow-hidden transition-transform transform hover:scale-105 h-[550px]"
          >
            <div className="relative">
              <div
                className={`absolute top-3 left-3 px-3 py-1 text-xs font-bold text-white uppercase rounded-lg ${
                  item.isBooked ? "bg-red-500" : "bg-green-500"
                } bg-opacity-90 shadow-md`}
              >
                {item.isBooked ? "Booked" : "Available"}
              </div>

              <Link to={"/PropertyDetails"}>
                <button onClick={() => itemInfo(item)}>
                  <img
                    src={item.images || "https://via.placeholder.com/150"}
                    alt={item.name || "No Name"}
                    className="w-full h-[300px] object-cover transition-opacity duration-500"
                  />
                </button>
              </Link>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold">
                {item.location || "No Location"}
              </h3>
              <p className="text-gray-600">{item.name || "No Name"}</p>
              <p className="mt-2 text-gray-800 text-sm">
                {item.description || "No Description"}
              </p>
              <p className="mt-4 text-xl font-bold">
                {item.price || "N/A"} JD / Night
              </p>
              <div className="flex items-center mt-2">
                <span className="text-yellow-500">⭐ 4.96</span>
                <span className="ml-2 text-green-500">Guest favorite</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
