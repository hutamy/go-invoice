import * as yup from "yup";

const SignUpStep2 = yup.object().shape({
  bank_name: yup
    .string()
    .min(2, "Bank name must be at least 2 characters")
    .required("Bank name is required"),
  bank_account_number: yup
    .string()
    .matches(/^\d{8,20}$/, "Bank account number must be 8-20 digits")
    .required("Bank account number is required"),
  bank_account_name: yup
    .string()
    .min(2, "Account name must be at least 2 characters")
    .required("Account name is required"),
});

export default SignUpStep2;
