import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useState, useEffect } from "react";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";

export default function PaymentScreen() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  console.log(selectedPaymentMethod);
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  const router = useRouter();

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push("/shipping");
    }

    setSelectedPaymentMethod(paymentMethod || "");
  }, [paymentMethod, router, shippingAddress.address]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      alert("Please select a payment method");
      return;
    }
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );

    router.push("/placeorder");
  };

  return (
    <Layout>
      <CheckoutWizard activeStep={2} />

      <form className="mx-auto max-w-screen-md" onSubmit={handleSubmit}>
        <h1 className="mb-4 text-xl">Payment Method</h1>
        {["PayPal", "Stripe", "CashOneDelivery"].map((payment) => (
          <div key={payment} className="mb-4">
            <input
              name="paymentMethod"
              type="radio"
              id={payment}
              className="p-2 outline-none focus:ring-0"
              onChange={() => setSelectedPaymentMethod(payment)}
            />
            <label className="p-2" htmlFor={payment}>
              {payment}
            </label>
          </div>
        ))}
        <div className="mb-4 flex justify-between">
          <button
            onClick={() => router.push("/shipping")}
            type="button"
            className="button"
          >
            Back
          </button>
          <button className="button">Next</button>
        </div>
      </form>
    </Layout>
  );
}
PaymentScreen.auth = true;
