import { Field, Form, Formik, ErrorMessage } from "formik";
import Link from "next/link";
import Layout from "../components/Layout";
import * as Yup from "yup";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const loginSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, "Too short!")
    .max(15, "Too long!")
    .required("Name is required!"),
  email: Yup.string().email("Invalid email!").required("Email is required!"),
  password: Yup.string()
    .min(5, "Too short!")
    .max(15, "Too long!")
    .required("Password is required!"),
});

export default function LoginScreen() {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  console.log(session?.user);

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  return (
    <Layout title="Register">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={async (values) => {
          // register user
          await axios.post("/api/auth/signup", {
            name: values.name,
            email: values.email,
            password: values.password,
          });

          const result = signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
          });

          if (result.error) {
            toast.error(result.error);
          }
        }}
      >
        <Form className="mx-auto max-w-screen-md mt-[4rem]">
          <h1 className="mb-4 text-xl">Register</h1>
          <div className="mb-4">
            <label htmlFor="email">Name</label>
            <Field name="name" type="name" className="w-full" id="name" />
            <ErrorMessage
              name="name"
              render={(msg) => <div className="text-red-500">{msg}</div>}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" className="w-full" id="email" />
            <ErrorMessage
              name="email"
              render={(msg) => <div className="text-red-500">{msg}</div>}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <Field
              type="password"
              name="password"
              className="w-full"
              id="password"
            />
            <ErrorMessage
              name="password"
              render={(msg) => <div className="text-red-500">{msg}</div>}
            />
          </div>
          <div className="mb-4 ">
            <button className="button" type="submit">
              Register
            </button>
          </div>
          <div className="mb-4 ">
            Already have an account? &nbsp;
            <Link href={`/login?redirect=${redirect || '/'}`}>
              <a className="text-[#6bbd99] font-semibold">
                Login
                </a></Link>
          </div>
        </Form>
      </Formik>
    </Layout>
  );
}
