// import React, { useState } from "react";
// import { DateRange } from "react-date-range";
// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";
// import { addMonths } from "date-fns";

// const DateRangePicker = () => {
//   const [dateRange, setDateRange] = useState([
//     {
//       startDate: new Date(),
//       endDate: addMonths(new Date(), 1), // الافتراضي شهر واحد
//       key: "selection",
//     },
//   ]);

//   const handleSelect = (ranges) => {
//     const { startDate, endDate } = ranges.selection;
//     const maxEndDate = addMonths(startDate, 4); // تحديد الحد الأقصى للحجز بـ 4 أشهر

//     if (endDate > maxEndDate) {
//       setDateRange([{ startDate, endDate: maxEndDate, key: "selection" }]);
//     } else {
//       setDateRange([{ startDate, endDate, key: "selection" }]);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center p-4">
//       <h2 className="text-lg font-semibold mb-4">اختر فترة الحجز</h2>
//       <DateRange
//         ranges={dateRange}
//         onChange={handleSelect}
//         minDate={new Date()}
//         maxDate={addMonths(new Date(), 4)}
//         rangeColors={["#4CAF50"]} // لون التحديد
//       />
//     </div>
//   );
// };

// export default DateRangePicker;
import React, { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { addMonths } from "date-fns";

const DateRangePicker = () => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addMonths(new Date(), 1), // الافتراضي شهر واحد
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    const maxEndDate = addMonths(startDate, 4); // تحديد الحد الأقصى للحجز بـ 4 أشهر

    if (endDate > maxEndDate) {
      setDateRange([{ startDate, endDate: maxEndDate, key: "selection" }]);
    } else {
      setDateRange([{ startDate, endDate, key: "selection" }]);
    }
  };

  return (
    <div className="flex flex-col items-start justify-start p-4">
      <h2 className="text-lg font-semibold mb-4">اختر فترة الحجز</h2>
      <DateRange
        ranges={dateRange}
        onChange={handleSelect}
        minDate={new Date()}
        maxDate={addMonths(new Date(), 4)}
        rangeColors={["#4CAF50"]} // لون التحديد
      />
    </div>
  );
};

export default DateRangePicker;
