import * as yup from "yup";

export const ClientSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  phone: yup.string()
    .matches(/^\d{10,15}$/, "Phone number must be 10-15 digits")
    .required("Phone number is required"),
  address: yup.string().required("Address is required"),
});
