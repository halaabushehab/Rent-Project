import { useState } from "react";
import emailjs from "emailjs-com";
import { useLocation } from "react-router-dom";
import { getDatabase, ref, set, update, get } from "firebase/database";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import jsPDF from "jspdf";
import Swal from "sweetalert2";
import axios from "axios";
import { useSelector } from "react-redux";

const Checkout = () => {
  const location = useLocation();
  const { propertyId, ...bookingData } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolder: "",
    email: "",
  });
  const selectedProperty = useSelector(
    (state) => state.courtInfo.selectedCourt
  );

  console.log("Selected Property from Redux:", selectedProperty);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Booking Confirmation", 20, 20);
    doc.setFontSize(12);
    let y = 40;
    Object.entries(bookingData).forEach(([key, value]) => {
      doc.text(`${key.replace(/([A-Z])/g, " $1").trim()}: ${value}`, 20, y);
      y += 10;
    });
    doc.text(`Total Amount: $${bookingData.price}`, 20, y);
    doc.save("Booking_Confirmation.pdf");
  };

  const handleChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    /************************************************************************************************************ */
    // const fetchStudentHousingData = async () => {
    //   try {
    //     const firebaseURL =
    //       "https://rent-app-a210b-default-rtdb.firebaseio.com/student_housing.json";

    //     const response = await axios.get(firebaseURL);

    //     console.log("بيانات student_housing:", response.data);

    //     // سيتم طباعة جميع البيانات مع الـ keys الخاصة بها في الكونسول
    //   } catch (error) {
    //     console.error("حدث خطأ أثناء جلب البيانات:", error);
    //   }
    // };

    // // استدعاء الدالة
    // fetchStudentHousingData();
    /************************************************************************************************************ */

    emailjs
      .send(
        "service_jrtimzn",
        "template_ahjbd9q",
        {
          name: bookingData.name,
          email: bookingData.email,
          to_email: bookingData.email,
          roomType: bookingData.roomType,
          Totalamount: bookingData.price,
          startDate: bookingData.startDate,
          endDate: bookingData.endDate,

          //  message: `Your booking for ${bookingData.roomType} has been confirmed. Total amount: $${bookingData.price}`,
        },
        "Uqobi9sYP10iyftG-"
      )
      .then(
        (result) => {
          Swal.fire({
            icon: "success",
            title: "Payment succsseful",
            text: "Something went wrong!",
            html: `<button id="downloadPDF" style="background-color:#007BFF; color:white; padding:10px 20px; border:none; border-radius:5px; cursor:pointer; margin-top:10px;">
            Download PDF
         </button>`,
            didOpen: () => {
              document
                .getElementById("downloadPDF")
                .addEventListener("click", generatePDF);
            },
          });
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      );
    if (!agreeTerms) {
      alert("You must agree to the Terms & Conditions before proceeding.");
      return;
    }
    const db = getDatabase();
    const bookingRef = ref(db, `bookings/${bookingData.name}`);
    await set(bookingRef, bookingData);
    if (paymentMethod === "paypal") {
      return;
    } else {
      Swal.fire({
        icon: "success",
        title: `Payment via ${paymentMethod} processed successfully!`,
        text: "Something went wrong!",
        html: `<button id="downloadPDF" style="background-color:#007BFF; color:white; padding:10px 20px; border:none; border-radius:5px; cursor:pointer; margin-top:10px;">
            Download PDF
         </button>`,
        didOpen: () => {
          document
            .getElementById("downloadPDF")
            .addEventListener("click", generatePDF);
        },
      });
      // alert(`Payment via ${paymentMethod} processed successfully!`);
    }
  };

  const onPayPalApprove = async (data, actions) => {
    try {
      const order = await actions.order.capture();
      const db = getDatabase();
      const housingRef = ref(db, "student_housing");
      const snapshot = await get(housingRef);

      let firebaseGeneratedId = null;
      snapshot.forEach((childSnapshot) => {
        const housingData = childSnapshot.val();
        if (housingData.id === propertyId) {
          firebaseGeneratedId = childSnapshot.key;
        }
      });

      if (!firebaseGeneratedId) {
        throw new Error("No matching property found in Firebase.");
      }

      const housingUpdateRef = ref(
        db,
        `student_housing/${firebaseGeneratedId}`
      );
      const updates = { availability: false };
      await update(housingUpdateRef, updates);

      emailjs
        .send(
          "service_jrtimzn",
          "template_ahjbd9q",
          {
            name: bookingData.name,
            email: bookingData.email,
            to_email: bookingData.email,
            roomType: bookingData.roomType,
            Totalamount: bookingData.price,
            startDate: bookingData.startDate,
            endDate: bookingData.endDate,
            filename: "Booking_Confirmation.pdf",
          },
          "Uqobi9sYP10iyftG-"
        )
        .then(
          (result) => {
            alert("Booking confirmed! Check your email for details.");
          },
          (error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        );
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AQO_lrXGFsV-gcb9dl11jWIu-BW84qeQbOxa31FnSsbeJj_fpHAMK3sb-c2aJjJSnjuaN4CDAxvT3tL1",
        currency: "USD",
      }}
    >
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-[#091057]">
              Complete Your Booking
            </h1>
            <p className="mt-2 text-gray-600">
              Secure payment process with instant confirmation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Rental Summary Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-fit">
              <div className="bg-[#EC8305] px-6 py-4">
                <h2 className="text-xl font-semibold text-white">
                  Rental Summary
                </h2>
              </div>
              <div className="p-6 space-y-6">
                {Object.entries(bookingData).map(
                  ([key, value]) =>
                    key !== "price" && (
                      <div key={key} className="flex flex-col space-y-1">
                        <label className="text-sm font-medium text-gray-600 capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </label>
                        <input
                          type="text"
                          value={value}
                          disabled
                          className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700"
                        />
                      </div>
                    )
                )}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">
                      Total Amount
                    </span>
                    <span className="text-2xl font-bold text-[#091057]">
                      ${bookingData.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Details Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-[#EC8305] px-6 py-4">
                <h2 className="text-xl font-semibold text-white">
                  Payment Details
                </h2>
              </div>
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Method
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="creditCard">Credit Card</option>
                      <option value="paypal">PayPal</option>
                      <option value="googlePay">Google Pay</option>
                    </select>
                  </div>

                  {paymentMethod === "creditCard" && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          maxLength="16"
                          value={paymentInfo.cardNumber}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            placeholder="MM/YY"
                            maxLength="5"
                            value={paymentInfo.expiryDate}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV
                          </label>
                          <input
                            type="password"
                            name="cvv"
                            placeholder="123"
                            maxLength="3"
                            value={paymentInfo.cvv}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {(paymentMethod === "paypal" ||
                    paymentMethod === "googlePay") && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {paymentMethod === "paypal"
                          ? "PayPal Email"
                          : "Google Pay Email"}
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={paymentInfo.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  )}

                  {paymentMethod === "paypal" && (
                    <div className="mt-4">
                      <PayPalButtons
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  value: bookingData.price,
                                },
                              },
                            ],
                          });
                        }}
                        onApprove={onPayPalApprove}
                      />
                    </div>
                  )}

                  <div className="flex items-center space-x-2 mt-6">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreeTerms}
                      onChange={() => setAgreeTerms(!agreeTerms)}
                      className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to the{" "}
                      <button
                        type="button"
                        onClick={() => setShowTerms(true)}
                        className="text-[#EC8305] hover:text-blue-800 font-medium"
                      >
                        Terms & Conditions
                      </button>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-4 rounded-lg text-lg font-semibold transition duration-200 ${
                      agreeTerms
                        ? "bg-[#EC8305] hover:bg-[#EC8305] text-white"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!agreeTerms}
                  >
                    Complete Payment
                  </button>
                </form>
                <button
                  onClick={generatePDF}
                  className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-200"
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Terms Modal */}
        {showTerms && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-2xl shadow-xl w-11/12 max-w-2xl max-h-[80vh] overflow-y-auto">
              <div className="bg-blue-600 px-6 py-4 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">
                  Terms & Conditions
                </h3>
                <button
                  onClick={() => setShowTerms(false)}
                  className="text-white hover:text-gray-200"
                >
                  ×
                </button>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-gray-700">
                  By renting from <b>HabiRent</b>, you agree to the following
                  terms:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    The rental period starts from the date of pickup/delivery.
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Late returns may result in additional charges.
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>A refundable security deposit
                    may be required.
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    The renter is responsible for any damages beyond normal wear
                    and tear.
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Cancellations must be made within [X] days for a refund.
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    The rental provider is not liable for injuries or losses.
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    This agreement follows the laws of [Your Location].
                  </li>
                </ul>
                <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end">
                  <button
                    onClick={() => setShowTerms(false)}
                    className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition duration-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PayPalScriptProvider>
  );
};

export default Checkout;
