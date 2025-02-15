import { useState } from "react";

const Cheackout = () => {
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolder: "",
    billingAddress: "",
    email: "",
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [fromDate, setFromDate] = useState(""); // From date
  const [toDate, setToDate] = useState(""); // To date
  const [pricePerMonth] = useState(200); // Example price per month

  const rentalPeriod =
    fromDate && toDate ? calculateRentalPeriod(fromDate, toDate) : 0;
  const totalAmount = rentalPeriod * pricePerMonth; // Total amount based on rental period

  const handleChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert("You must agree to the Terms & Conditions before proceeding.");
      return;
    }
    console.log("Payment Details Submitted:", {
      paymentMethod,
      ...paymentInfo,
    });
    alert(`Payment via ${paymentMethod} processed successfully!`);
  };

  // Calculate rental period in months
  const calculateRentalPeriod = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffInTime = endDate - startDate; // difference in milliseconds
    return Math.ceil(diffInTime / (1000 * 3600 * 24 * 30)); // convert to months
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Rental Summary Section - Moved Outside */}
      <div className="max-w-lg mx-auto bg-gray-100 p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Rental Summary
        </h3>

        {/* From & To Date */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              From Date
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium">
              To Date
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Price Per Month and Total Amount */}
        <div className="flex justify-between mb-4">
          <span className="text-sm text-gray-600">Price per Month</span>
          <span className="text-sm font-medium text-gray-700">
            ${pricePerMonth}
          </span>
        </div>

        <div className="flex justify-between mb-4">
          <span className="text-sm text-gray-600">Rental Period (Months)</span>
          <span className="text-sm font-medium text-gray-700">
            {rentalPeriod || 0} months
          </span>
        </div>

        <div className="flex justify-between font-semibold text-gray-700">
          <span>Total Amount</span>
          <span>${totalAmount || 0}</span>
        </div>
      </div>

      {/* Payment Details Section */}
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Payment Details
        </h2>

        {/* Payment Method Selection */}
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium">
            Choose Payment Method
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="googlePay">Google Pay</option>
          </select>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {paymentMethod === "creditCard" && (
            <>
              <div>
                <label className="block text-gray-600 text-sm font-medium">
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  maxLength="16"
                  value={paymentInfo.cardNumber}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-gray-600 text-sm font-medium">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    maxLength="5"
                    value={paymentInfo.expiryDate}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div className="w-1/2">
                  <label className="block text-gray-600 text-sm font-medium">
                    CVV
                  </label>
                  <input
                    type="password"
                    name="cvv"
                    placeholder="123"
                    maxLength="3"
                    value={paymentInfo.cvv}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
              </div>
            </>
          )}

          {(paymentMethod === "paypal" || paymentMethod === "googlePay") && (
            <div>
              <label className="block text-gray-600 text-sm font-medium">
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
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          )}

          {/* Terms & Conditions Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={() => setAgreeTerms(!agreeTerms)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-400"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the{" "}
              <button
                type="button"
                onClick={() => setShowTerms(true)}
                className="text-blue-600 hover:underline"
              >
                Terms & Conditions
              </button>
            </label>
          </div>

          <button
            type="submit"
            className={`w-full text-white py-2 rounded-lg transition duration-200 ${
              agreeTerms
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!agreeTerms}
          >
            Pay Now
          </button>
        </form>

        {/* Terms & Conditions Modal */}
        {showTerms && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            onClick={() => setShowTerms(false)}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-2xl max-h-[80vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Terms & Conditions
              </h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p>
                  By renting from <b>[Your Company Name]</b>, you agree to the
                  following terms:
                </p>
                <ul className="list-disc ml-5 space-y-1">
                  <li>
                    The rental period starts from the date of pickup/delivery.
                  </li>
                  <li>Late returns may result in additional charges.</li>
                  <li>A refundable security deposit may be required.</li>
                  <li>
                    The renter is responsible for any damages beyond normal wear
                    and tear.
                  </li>
                  <li>
                    Cancellations must be made within [X] days for a refund.
                  </li>
                  <li>
                    The rental provider is not liable for injuries or losses.
                  </li>
                  <li>This agreement follows the laws of [Your Location].</li>
                </ul>
                <p>
                  By proceeding with the rental, you confirm that you have read,
                  understood, and agreed to these terms.
                </p>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setShowTerms(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cheackout;