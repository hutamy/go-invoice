import * as yup from "yup";

export const UserSettingsSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  address: yup.string().required("Address is required"),
  bank_name: yup.string().required("Bank name is required"),
  bank_account_name: yup.string().required("Bank account name is required"),
  bank_account_number: yup.string().required("Bank account number is required"),
});
