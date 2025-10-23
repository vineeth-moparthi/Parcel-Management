import React, { useEffect,useState } from "react";
import axios from "axios";
import {  useNavigate,useParams } from "react-router-dom";

const API_BASE_URL = "http://localhost:8080";

/**
 * Creates a Stripe checkout session by calling the backend.
 * @param {object} paymentRequest - The payment details payload.
 * @returns {Promise<object>} The response data from the server.
 */
const createCheckoutSession = async (paymentRequest) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/checkout`, paymentRequest);
    return response.data;
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error.response || error);
    throw error;
  }
};

const InvoicePage = () => {
  const [bookingData, setBookingData] = useState(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { bookingId } = useParams();
  // --- Data Fetching with useEffect ---
  // This effect runs once when the component mounts, or if the `id` in the URL changes.
  useEffect(() => {
    // We only fetch if an 'id' is present in the URL
    if (bookingId) {
      const fetchBookingDetails = async () => {
        try {
          // The API call to your backend endpoint
          const response = await axios.get(`http://localhost:8080/booking/${bookingId}`);
          
          // Store the successful response data in our state
          setBookingData(response.data);
          setError(null); // Clear any previous errors

        } catch (err) {
          // If the API call fails, we catch the error
          console.error("Failed to fetch booking details:", err);
          setError("Could not retrieve booking information. Please try again later.");
          setBookingData(null); // Ensure no old data is shown
        }
      };

      fetchBookingDetails();
    }
  }, [bookingId]); // The dependency array ensures this effect runs when `id` changes

  // --- Conditional Rendering ---
  // 1. Show an error message if the API call failed
  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          <h2>Error</h2>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={() => navigate("/dashboard")}>
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }
  if (!bookingData) {
    return (
      <div className="container mt-5">
        <h2>Invoice Not Found</h2>
        <p>There was an issue loading the booking details.</p>
        <button className="btn btn-primary" onClick={() => navigate("/dashboard")}>
          Go to Dashboard
        </button>
      </div>
    );
  }

  // Destructure for easier access
  const {
    serviceCost,
    senderName,
    senderAddress,
    senderMobile,
    recName,
    recAddress,
    recMobile,
    description,
    weight,
    deliveryType,
    packingPreference,
    pickupTime,
    status,
    paymentTime, // Assuming the server might return this
  } = bookingData;

   const handleCheckout = async () => {
    alert(`Initiating checkout for Parcel ID: ${bookingId} (Amount: ₹${serviceCost})...`);
    // checkout

    setIsCheckingOut(true); // Disable button and show loading text
    setError(null); // Clear previous errors

    const paymentRequest = {
      // Stripe requires the amount in the smallest currency unit (e.g., paise for INR)
      amount: Math.round(serviceCost * 100),
      parcelName: description || `Booking ID: ${bookingId}`,
      currency: 'INR',
    };

    try {
      // Call the local API function
      const paymentResponse = await createCheckoutSession(paymentRequest);
      
      if (paymentResponse && paymentResponse.sessionUrl) {
        // Redirect to the Stripe Checkout page
        window.location.href = paymentResponse.sessionUrl;
      } else {
        setError("Could not initiate payment. The session URL was not provided.");
        setIsCheckingOut(false);
      }
    } catch (err) {
      // The error is already logged in the API function, so we just update the UI.
      setError("An error occurred while trying to proceed to checkout.");
      setIsCheckingOut(false); // Re-enable button on error
    }
  };

  const handleBack = () => {
    navigate("/booking"); // Go back to the form if needed, or dashboard
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-start mb-3">
        <button className="btn btn-secondary" onClick={handleBack}>
          Back to Booking Form
        </button>
      </div>
      
      <div className="card shadow p-4">
        <h2 className="card-title text-center mb-4">📦 Parcel Booking Invoice</h2>
        
        <div className="row mb-3 border-bottom pb-2">
          <div className="col-md-6">
            <strong>Booking ID:</strong>
          </div>
          <div className="col-md-6 text-end">
            {bookingId || "N/A"}
          </div>
        </div>
        
        <div className="row mb-3 border-bottom pb-2">
          <div className="col-md-6">
            <strong>Status:</strong>
          </div>
          <div className="col-md-6 text-end">
            <span className={`badge bg-${status === 'Pending Payment' ? 'warning' : 'info'}`}>
              {status || "Pending Payment"}
            </span>
          </div>
        </div>

        {/* Sender and Receiver Details */}
        <div className="row mb-4">
          <div className="col-md-6">
            <h5 className="mt-3">Sender Details</h5>
            <p><strong>Name:</strong> {senderName}</p>
            <p><strong>Mobile:</strong> {senderMobile}</p>
            <p><strong>Address:</strong> {senderAddress}</p>
          </div>
          <div className="col-md-6">
            <h5 className="mt-3">Recipient Details</h5>
            <p><strong>Name:</strong> {recName}</p>
            <p><strong>Mobile:</strong> {recMobile}</p>
            <p><strong>Address:</strong> {recAddress}</p>
          </div>
        </div>
        
        <hr/>

        {/* Parcel and Service Details */}
        <h5 className="mt-4 mb-3">Parcel & Service Details</h5>
        <div className="row mb-2">
          <div className="col-6">Description:</div>
          <div className="col-6 text-end">{description}</div>
        </div>
        <div className="row mb-2">
          <div className="col-6">Weight:</div>
          <div className="col-6 text-end">**{weight} kg**</div>
        </div>
        <div className="row mb-2">
          <div className="col-6">Delivery Type:</div>
          <div className="col-6 text-end">{deliveryType}</div>
        </div>
        <div className="row mb-2">
          <div className="col-6">Packing Preference:</div>
          <div className="col-6 text-end">{packingPreference}</div>
        </div>
        <div className="row mb-2">
          <div className="col-6">Estimated Pickup Date:</div>
          <div className="col-6 text-end">{pickupTime}</div>
        </div>
        
        <hr className="my-4"/>

        {/* Total Cost and Checkout */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4>Total Service Cost:</h4>
          <h4 className="text-success">₹{serviceCost}</h4>
        </div>

        <button 
          className="btn btn-success btn-lg w-100" 
          onClick={handleCheckout}
        >
          Proceed to Checkout 💳
        </button>
      </div>
    </div>
  );
};

export default InvoicePage;