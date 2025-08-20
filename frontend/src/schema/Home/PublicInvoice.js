import * as yup from "yup";

const PublicInvoiceSchema = yup.object().shape({
  user: yup.object().shape({
    name: yup.string().required("Name is required"),
    address: yup.string().required("Address is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.string().required("Phone is required"),
    bank_name: yup.string().required("Bank name is required"),
    bank_account_name: yup.string().required("Account name is required"),
    bank_account_number: yup.string().required("Account number is required"),
  }),
  client: yup.object().shape({
    name: yup.string().required("Client name is required"),
    address: yup.string().required("Client address is required"),
    email: yup
      .string()
      .email("Invalid email")
      .required("Client email is required"),
    phone: yup.string().required("Client phone is required"),
  }),
  invoice: yup.object().shape({
    invoice_number: yup.string().required("Invoice number is required"),
    issue_date: yup.string().required("Issue date is required"),
    due_date: yup.string().required("Due date is required"),
    items: yup
      .array()
      .of(
        yup.object().shape({
          description: yup.string().required("Item description is required"),
          quantity: yup
            .number()
            .positive("Quantity must be positive")
            .required("Quantity is required"),
          unit_price: yup
            .number()
            .positive("Unit price must be positive")
            .required("Unit price is required"),
        })
      )
      .min(1, "At least one item is required"),
    tax_rate: yup.number().min(0, "Tax rate cannot be negative"),
    notes: yup.string(),
  }),
});

export default PublicInvoiceSchema;
