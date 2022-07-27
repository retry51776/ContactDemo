import React from "react";
import { Formik, Form } from "formik";
import FormikControl from "../components/controller";
import { contactSchema } from "../models/contact";

function ContactForm({ contact, onSubmit }) {
  const initialValues = contact || {
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    address: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={contactSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <FormikControl
              control="input"
              label="First Name"
              name="first_name"
            />
            <FormikControl control="input" label="Last Name" name="last_name" />
            <FormikControl control="input" label="Email" name="email" />
            <FormikControl control="input" label="Phone" name="phone" />
            <FormikControl control="input" label="Address" name="address" />
            <button type="submit" disabled={!formik.isValid || !formik.dirty}>
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default ContactForm;
