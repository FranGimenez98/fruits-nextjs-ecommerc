import { Field, Form, Formik, ErrorMessage } from "formik";
import Link from "next/link";
import Layout from "../components/Layout";
import * as Yup from "yup";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const loginSchema = Yup.object().shape({
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
    <Layout title="Login">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          // same shape as initial values
          signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
          });
        }}
      >
        <Form className="mx-auto max-w-screen-md mt-[4rem]">
          <h1 className="mb-4 text-xl">Login</h1>
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
              Login
            </button>
          </div>
          <div className="mb-4 ">
            Don&apos;t have an account? &nbsp;
            <Link href="/register">
              <a className="text-[#6bbd99] font-semibold">Register</a>
            </Link>
          </div>
        </Form>
      </Formik>
    </Layout>
  );
}
