import { PaymentElement, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import '../index.css';

//Updating the state values here for the login info
const Stripe = () => {
// Set up appearance changes
const appearance = {
    theme: 'flat',
    variables: {
      fontFamily: 'sans-serif',
      fontLineHeight: '1.5',
      borderRadius: '10px',
      colorBackground: '#F6F8FA',
      accessibleColorOnColorPrimary: '#262626'
    },
  };
  
  // Initialize Stripe Elements with appearance
  const elements = stripe.elements({ appearance });
    const stripe = useStripe();
    // const elements= useElements();

    const handleSubmit = async (e) => {
        //Prevent page refresh
        e.preventDefault();

        if(!stripe || !elements) {
            //Stripe.js hasn't loaded as yet.
            //Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const result = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
                return_url: "https://example.com/order/123/complete",
            },
        });

        if(result.error) {
            //Show error to your customer (Eg. payment details incomplete)
            console.log(result.error.message);
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
        }
    }
    return (
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          <button disabled={!stripe}>Submit</button>
        </form>
      );
}

export default Stripe;