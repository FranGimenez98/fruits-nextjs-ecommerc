import React from "react";

export default function CheckoutWizard({ activeStep = 0 }) {
  return (
    <div className="mb-5 flex flex-wrap">
      {["User Login", "Shipping Addresss", "Payment Method", "Place Order"].map(
        (step, index) => (
          <div
            className={`flex-1 border-b-2 text-center ${
              index <= activeStep
                ? "border-orange-500 text-orange-500"
                : "border-gray-500 text-gray-500"
            }`}
            key={step}
          >
            {step}
          </div>
        )
      )}
    </div>
  );
}
