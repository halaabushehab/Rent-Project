import React, { useState, useEffect } from "react";
import axios from "axios";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { addMonths } from "date-fns";

const DateRangePicker = () => {
  const [dateRanges, setDateRanges] = useState([
    {
      startDate: new Date(),
      endDate: addMonths(new Date(), 1),
      key: "selection",
    },
  ]);

  const [selectedDates, setSelectedDates] = useState([]);
  const [bookedDates, setBookedDates] = useState([]);
  const pricePerNight = 7;
  const monthlyDiscountPrice = 60;
  const fiveMonthsDiscountPrice = 250;

  useEffect(() => {
    fetchBookedDates();
  }, []);

  const fetchBookedDates = async () => {
    const url =
      "https://rent-app-a210b-default-rtdb.firebaseio.com/bookingday.json";

    try {
      const response = await axios.get(url);
      const data = response.data;

      if (data) {
        const allBookedDates = Object.values(data).flatMap(
          (entry) => entry.dates
        );
        setBookedDates(allBookedDates);
      }
    } catch (error) {
      console.error("خطأ في جلب الأيام المحجوزة:", error);
    }
  };

  const handleSelect = (ranges) => {
    const newRange = ranges.selection;
    const maxEndDate = addMonths(newRange.startDate, 4);

    let endDate = newRange.endDate > maxEndDate ? maxEndDate : newRange.endDate;
    const newSelectedDates = getDatesBetween(newRange.startDate, endDate);

    const conflictDates = newSelectedDates.filter((date) =>
      bookedDates.includes(date)
    );

    if (conflictDates.length > 0) {
      alert(
        `⚠️ بعض التواريخ المختارة محجوزة مسبقًا:\n${conflictDates.join(", ")}`
      );
      return;
    }

    setDateRanges([
      { startDate: newRange.startDate, endDate, key: "selection" },
    ]);
    setSelectedDates(newSelectedDates);

    saveBookingToFirebase(newSelectedDates);
  };

  const getDatesBetween = (startDate, endDate) => {
    let dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate).toISOString().split("T")[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const saveBookingToFirebase = async (dates) => {
    const url =
      "https://rent-app-a210b-default-rtdb.firebaseio.com/bookingday.json";

    try {
      const response = await axios.post(url, { dates });

      if (response.status === 200) {
        alert("✅  يرجى تعبئبه ال  FORM  لتاكيد الحجز !");
        setBookedDates((prev) => [...prev, ...dates]);
      } else {
        alert("❌ حدث خطأ أثناء الحجز.");
      }
    } catch (error) {
      console.error("فشل الاتصال بقاعدة البيانات:", error);
    }
  };

  const calculateTotalPrice = () => {
    const totalNights = selectedDates.length;
    if (totalNights <= 0) return 0;

    if (totalNights >= 150) return fiveMonthsDiscountPrice;

    if (totalNights >= 30) {
      const fullMonths = Math.floor(totalNights / 30);
      const remainingDays = totalNights % 30;

      let totalPrice = fullMonths * monthlyDiscountPrice;
      totalPrice += remainingDays * pricePerNight;

      return totalPrice;
    }

    return totalNights * pricePerNight;
  };

  return (
    <div className="flex flex-col items-center justify-start p-4 w-[350px] bg-white rounded-lg shadow-md">
      <h2 className="text-md font-semibold mb-3 text-gray-700">
        📅 اختر فترة الحجز
      </h2>

      <DateRange
        ranges={dateRanges}
        onChange={handleSelect}
        minDate={new Date()}
        maxDate={addMonths(new Date(), 5)}
        rangeColors={["#4CAF50"]}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={1}
        direction="vertical"
        disabledDates={bookedDates.map((date) => new Date(date))}
      />

      {selectedDates.length > 0 && (
        <div className="mt-4 w-full">
          <h3 className="text-sm font-semibold mb-2 text-gray-700">
            🗓 الأيام المحجوزة:
          </h3>
          <div className="grid grid-cols-2 gap-2 bg-gray-100 p-2 rounded-md max-h-[150px] overflow-y-auto">
            {selectedDates.map((date, index) => (
              <span
                key={index}
                className="text-xs bg-green-200 px-2 py-1 rounded-md text-gray-700"
              >
                {date}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-3 w-full text-center">
        <h3 className="text-md font-bold text-orange-600">
          💰 التكلفة الإجمالية: {calculateTotalPrice()} دينار
        </h3>
      </div>
    </div>
  );
};

export default DateRangePicker;
