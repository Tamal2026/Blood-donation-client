import { loadStripe } from "@stripe/stripe-js";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";

const stripePromise = loadStripe(
  "pk_test_51OHAmEJ0id93KwZ8COVPd2LPmtdKtfbKkSTrOgFvlxg0C1z1X9C5nUDX2xoveL05PSL3pJ6vnhyV7jFJeQU0ZdY7000GSr4ZW8"
);

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet.
      return;
    }

    // Get the CardElement
    const cardElement = elements.getElement(CardNumberElement);

    // Extract relevant properties without circular references
    const cardData = {
      number: cardElement._lastValue,
      exp_month: elements.getElement(CardExpiryElement)._lastValue,
      exp_year: elements.getElement(CardExpiryElement)._lastValue,
      cvc: elements.getElement(CardCvcElement)._lastValue,
    };

    // Create a PaymentMethod object
   const { paymentMethod, error } = await stripe.createPaymentMethod({
  type: 'card',
  card: elements.getElement(CardNumberElement),
  billing_details: {
    // Add billing details if needed
  },
});

    if (error) {
      console.log('payment erroe',error);
    } else {
      console.log(paymentMethod.id);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px", // Adjust the font size
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Card number:
        </label>
        <div className="border rounded p-4">
          <CardNumberElement options={cardElementOptions} />
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Expiration date:
        </label>
        <div className="border rounded p-4">
          <CardExpiryElement options={cardElementOptions} />
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          CVC:
        </label>
        <div className="border rounded p-4">
          <CardCvcElement options={cardElementOptions} />
        </div>
      </div>
      <button type="submit" className="btn btn-primary w-full">
        Donate {amount}
      </button>
    </form>
  );
};

const Funding = () => {
  const [donationAmount, setDonationAmount] = useState("$10");

  const handleDonationChange = (amount) => {
    setDonationAmount(amount);
  };

  return (
    <div>
      <h1 className="text-5xl font-bold text-center mb-10">
        Empower the Gift of Life: Blood Donation Fundraising
      </h1>
      <div className="flex items-center space-x-4 mb-6">
        <div className="card shadow-xl bg-slate-200 flex-1">
          <figure>
            <img
              className="w-2/4 mt-10"
              src="https://i.ibb.co/1MGSQYS/funding.jpg"
              alt="Album"
            />
          </figure>
          <div className="card-body">
            <div className="card-actions justify-center">
              <div className="relative ml-4">
                <select
                  className="appearance-none bg-slate-400 border-none px-4 py-2 rounded-md text-white"
                  onChange={(e) => handleDonationChange(e.target.value)}
                  value={donationAmount}
                >
                  <option value="$10">$10</option>
                  <option value="$20">$20</option>
                  <option value="$50">$50</option>
                  <option value="$100">$100</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <Elements stripe={stripePromise}>
                <CheckoutForm amount={donationAmount} />
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Funding;
