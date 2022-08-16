import { Formik, Form, Field, ErrorMessage } from "formik";
import React from "react";
import Layout from "../../components/Layout";
import * as Yup from "yup";
import axios from "axios";

export default function PostScreen() {
  const productSchema = Yup.object().shape({
    name: Yup.string()
      .max(15, "To long!")
      .min(2, "To short!")
      .required("Name is required"),
    slug: Yup.string()
      .trim("The name cannot include leading and trailing spaces")
      .max(15, "To long!")
      .min(2, "To short!")
      .required("Slug is required")
      .strict(false),
    category: Yup.string().required(),
    image: Yup.string().required(),
    description: Yup.string().required(),
    price: Yup.number().required(),
    countInStock: Yup.number().required(),
  });

  return (
    <Layout title="Post Product">
      <Formik
        initialValues={{
          name: "",
          slug: "",
          category: "",
          image: "",
          description: "",
          price: "",
          countInStock: "",
        }}
        validationSchema={productSchema}
        onSubmit={async (values) => {
          axios.post("/api/admin/products", {
            name: values.name,
            slug: values.slug,
            category: values.category,
            image: values.image,
            description: values.description,
            price: values.price,
            countInStock: values.countInStock,
          });
        }}
      >
        <Form className="mx-auto max-w-screen-md mt-[4rem]">
          <h1>Post new product</h1>
          <div className="mt-4">
            <label>Name</label>
            <Field name="name" type="text" className="w-full" id="name" />
            <ErrorMessage
              name="name"
              render={(msg) => <div className="text-red-500">{msg}</div>}
            />
          </div>
          <div className="mt-4">
            <label>Slug</label>
            <Field name="slug" type="text" className="w-full" id="slug" />
            <ErrorMessage
              name="slug"
              render={(msg) => <div className="text-red-500">{msg}</div>}
            />
          </div>

          <div className="mt-4">
            <label>Category</label>
            <Field
              name="category"
              type="text"
              className="w-full"
              id="category"
            />
            <ErrorMessage
              name="category"
              render={(msg) => <div className="text-red-500">{msg}</div>}
            />
          </div>
          <div className="mt-4">
            <label>Image</label>
            <Field name="image" type="text" className="w-full" id="image" />
            <ErrorMessage
              name="image"
              render={(msg) => <div className="text-red-500">{msg}</div>}
            />
          </div>
          <div className="mt-4">
            <label>Description</label>
            <Field
              name="description"
              type="text"
              className="w-full"
              id="description"
            />
            <ErrorMessage
              name="description"
              render={(msg) => <div className="text-red-500">{msg}</div>}
            />
          </div>
          <div className="mt-4">
            <label>Price</label>
            <Field name="price" type="text" className="w-full" id="price" />
            <ErrorMessage
              name="price"
              render={(msg) => <div className="text-red-500">{msg}</div>}
            />
          </div>
          <div className="mt-4">
            <label>Stock</label>
            <Field
              name="countInStock"
              type="text"
              className="w-full"
              id="countInStock"
            />
            <ErrorMessage
              name="countInStock"
              render={(msg) => <div className="text-red-500">{msg}</div>}
            />
          </div>
          <div className="mt-4 ">
            <button className="button" type="submit">
              Post
            </button>
          </div>
        </Form>
      </Formik>
    </Layout>
  );
}
