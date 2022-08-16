import { Form, Formik, Field, ErrorMessage } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext } from "react";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import * as Yup from "yup";

export default function ShippingScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  // const { shippingAddress } = cart;

  // const submitHandler = ({ fullName, address, city, postalCode, country }) => {
  //   dispatch({
  //     type: "SAVE_SHIPPING_ADRESS",
  //     payload: { fullName, address, city, postalCode, country },
  //   });
  //   Cookies.set(
  //     "cart",
  //     JSON.stringify({
  //       ...cart,
  //       shippingAddress: {
  //         fullName,
  //         address,
  //         city,
  //         postalCode,
  //         country,
  //       },
  //     })
  //   );
  //   router.push("/payment");
  // };

  const shippingSchema = Yup.object().shape({
    fullName: Yup.string().required(),
    address: Yup.string().required(),
    city: Yup.string().required(),
    postalCode: Yup.string().required(),
    country: Yup.string().required(),
  });

  return (
    <Layout title="Shipping Address">
      <CheckoutWizard activeStep={1} />
      <Formik
        initialValues={{
          fullName: "",
          address: "",
          city: "",
          postalCode: "",
          country: "",
        }}
        validationSchema={shippingSchema}
        onSubmit={(values) => {
          dispatch({
            type: "SAVE_SHIPPING_ADRESS",
            payload: {
              fullName: values.fullName,
              address: values.address,
              city: values.city,
              postalCode: values.postalCode,
              country: values.postalCode,
            },
          });
          Cookies.set(
            "cart",
            JSON.stringify({
              ...cart,
              shippingAddress: {
                fullName: values.fullName,
                address: values.address,
                city: values.city,
                postalCode: values.postalCode,
                country: values.postalCode,
              },
            })
          );
          router.push("/payment");
        }}
        // onSubmit={dispatch(
        //   {
        //     type: "SAVE_SHIPPING_ADRESS",
        //     payload: {
        //       fullName: "",
        //       address: "",
        //       city: "",
        //       postalCode: "",
        //       country: "",
        //     },
        //   },
        //   Cookies.set(
        //     "cart",
        //     JSON.stringify({
        //       ...cart,
        //       shippingAddress: {
        //         fullName: "",
        //         address: "",
        //         city: "",
        //         postalCode: "",
        //         country: "",
        //       },
        //     })
        //   ),
        //   router.push("/payment")
        // )}
      >
        <Form className="mx-auto max-w-screen-md">
          <h1 className="mb-4 text-xl">Shipping Address</h1>
          <div className="mb-4">
            <label htmlFor="fullName">Full Name</label>
            <Field name="fullName" id="fullName" className="w-full" />
            <ErrorMessage
              name="fullName"
              render={(msg) => <div className="text-red-500">{msg}</div>}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address">Adress</label>
            <Field name="address" id="address" className="w-full" />
            <ErrorMessage
              name="address"
              render={(msg) => <div className="text-red-500">{msg}</div>}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city">City</label>
            <Field name="city" id="city" className="w-full" />
            <ErrorMessage
              name="city"
              render={(msg) => <div className="text-red-500">{msg}</div>}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="postalCode">Postal Code</label>
            <Field name="postalCode" id="postalCode" className="w-full" />
            <ErrorMessage
              name="postalCode"
              render={(msg) => <div className="text-red-500">{msg}</div>}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="country">Country</label>
            <Field name="country" id="country" className="w-full" />
            <ErrorMessage
              name="country"
              render={(msg) => <div className="text-red-500">{msg}</div>}
            />
          </div>
          <div className="mb-4 flex justify-between">
            <button className="button" type="submit">
              Next
            </button>
          </div>
        </Form>
      </Formik>
    </Layout>
  );
}

ShippingScreen.auth = true;
