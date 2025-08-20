import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Date from "../ui/Date";
import Email from "../ui/Email";
import Input from "../ui/Input";
import Text from "../ui/Text";
import TextArea from "../ui/TextArea";
import InvoiceFormContainer from "./InvoiceFormContainer";
import Number from "../ui/Number";
import { useEffect, useRef, useMemo } from "react";
import { PublicInvoiceSchema } from "@/schema/Home";

const Form = ({ initialData, onFormChange, onSubmit, setFormTrigger }) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PublicInvoiceSchema),
    defaultValues: initialData || {
      user: {
        name: "",
        address: "",
        email: "",
        phone: "",
        bank_name: "",
        bank_account_name: "",
        bank_account_number: "",
      },
      client: {
        name: "",
        address: "",
        email: "",
        phone: "",
      },
      invoice: {
        invoice_number: "",
        issue_date: "",
        due_date: "",
        items: [{ description: "", quantity: 0, unit_price: 0 }],
        tax_rate: 0,
        notes: "",
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "invoice.items",
  });

  const watchedValues = watch();
  const onFormChangeRef = useRef(onFormChange);
  
  useEffect(() => {
    onFormChangeRef.current = onFormChange;
  }, [onFormChange]);

  // Pass trigger function to parent component
  useEffect(() => {
    if (setFormTrigger) {
      setFormTrigger(trigger);
    }
  }, [trigger, setFormTrigger]);

  // Memoize calculated values to prevent unnecessary recalculations
  const calculatedValues = useMemo(() => {
    const items = watchedValues.invoice?.items || [];
    const subtotal = items.reduce((acc, item) => {
      const quantity = parseFloat(item.quantity) || 0;
      const unitPrice = parseFloat(item.unit_price) || 0;
      return acc + quantity * unitPrice;
    }, 0);

    const taxRate = parseFloat(watchedValues.invoice?.tax_rate) || 0;
    const tax = subtotal * (taxRate / 100);
    const total = subtotal + tax;

    return { subtotal, tax, total };
  }, [
    watchedValues.invoice?.items,
    watchedValues.invoice?.tax_rate
  ]);

  // Update calculated values only when they actually change
  useEffect(() => {
    const { subtotal, tax, total } = calculatedValues;
    
    // Only update if values actually changed
    const currentSubtotal = watchedValues.invoice?.subtotal || 0;
    const currentTax = watchedValues.invoice?.tax || 0;
    const currentTotal = watchedValues.invoice?.total || 0;

    if (
      Math.abs(currentSubtotal - subtotal) > 0.01 ||
      Math.abs(currentTax - tax) > 0.01 ||
      Math.abs(currentTotal - total) > 0.01
    ) {
      setValue("invoice.subtotal", subtotal);
      setValue("invoice.tax", tax);
      setValue("invoice.total", total);
    }
  }, [calculatedValues, setValue, watchedValues.invoice?.subtotal, watchedValues.invoice?.tax, watchedValues.invoice?.total]);

  // Separate effect for form change notifications with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (onFormChangeRef.current && watchedValues) {
        const { subtotal, tax, total } = calculatedValues;
        const formDataWithTotals = {
          user: watchedValues.user || {},
          client: watchedValues.client || {},
          invoice: {
            ...(watchedValues.invoice || {}),
            items: watchedValues.invoice?.items || [],
            subtotal,
            tax,
            total,
          },
        };
        onFormChangeRef.current(formDataWithTotals);
      }
    }, 100); // 100ms debounce

    return () => clearTimeout(timeoutId);
  }, [
    watchedValues.user,
    watchedValues.client,
    watchedValues.invoice?.invoice_number,
    watchedValues.invoice?.issue_date,
    watchedValues.invoice?.due_date,
    watchedValues.invoice?.notes,
    calculatedValues
  ]);

  // ...rest of the component remains the same...
  const addInvoiceItem = () => {
    append({ description: "", quantity: 0, unit_price: 0 });
  };

  const removeInvoiceItem = (index) => {
    remove(index);
  };

  const onFormSubmit = (data) => {
    if (onSubmit) {
      onSubmit(data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="w-full md:w-1/2 bg-gray-50 p-6 rounded-lg shadow-sm"
    >
      {/* Rest of the JSX remains exactly the same */}
      <div className="mb-4">
        <p className="text-gray-700 font-medium mb-2">
          Fill in invoice details
        </p>
      </div>

      {/* My Details Section */}
      <InvoiceFormContainer label="Sender Details">
        <div className="p-4 bg-white">
          <Text
            componentclassname={"mb-3"}
            label={"Name"}
            {...register("user.name")}
            error={!!errors.user?.name}
            errormessage={errors.user?.name?.message}
            placeholder="Your Name"
          />
          <TextArea
            className={"mb-3"}
            label={"Address"}
            rows={2}
            {...register("user.address")}
            error={!!errors.user?.address}
            errormessage={errors.user?.address?.message}
            placeholder="456 Your Street, Client City, Country"
          />
          <div className="grid grid-cols-2 gap-3">
            <Email
              label="Email"
              {...register("user.email")}
              error={!!errors.user?.email}
              errormessage={errors.user?.email?.message}
              placeholder="contact@yourcompany.com"
            />
            <Text
              label="Phone"
              {...register("user.phone")}
              error={!!errors.user?.phone}
              errormessage={errors.user?.phone?.message}
              placeholder="+1 234 567 890"
            />
          </div>
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bank Details
            </label>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type={"text"}
                placeholder={"National Bank"}
                {...register("user.bank_name")}
                error={!!errors.user?.bank_name}
              />
              <Input
                type={"text"}
                placeholder={"Your Company Ltd"}
                {...register("user.bank_account_name")}
                error={!!errors.user?.bank_account_name}
              />
            </div>
            <Input
              type="text"
              placeholder="1234567890"
              inputclassname="mt-3"
              {...register("user.bank_account_number")}
              error={!!errors.user?.bank_account_number}
            />
          </div>
        </div>
      </InvoiceFormContainer>

      {/* Recipient Details Section */}
      <InvoiceFormContainer label="Recipient Details">
        <div className="p-4 bg-white">
          <Text
            componentclassname={"mb-3"}
            label={"Name"}
            {...register("client.name")}
            error={!!errors.client?.name}
            errormessage={errors.client?.name?.message}
            placeholder="Client Company Name"
          />
          <TextArea
            className={"mb-3"}
            label={"Address"}
            rows={2}
            {...register("client.address")}
            error={!!errors.client?.address}
            errormessage={errors.client?.address?.message}
            placeholder="456 Client Street, Client City, Country"
          />
          <div className="grid grid-cols-2 gap-3">
            <Email
              label="Email"
              {...register("client.email")}
              error={!!errors.client?.email}
              errormessage={errors.client?.email?.message}
              placeholder="contact@clientcompany.com"
            />
            <Text
              label="Phone"
              {...register("client.phone")}
              error={!!errors.client?.phone}
              errormessage={errors.client?.phone?.message}
              placeholder="+1 987 654 321"
            />
          </div>
        </div>
      </InvoiceFormContainer>

      {/* Invoice Details Section */}
      <InvoiceFormContainer label="Invoice Details">
        <div className="p-4 bg-white">
          <div className="grid grid-cols-3 gap-3 mb-3">
            <Text
              label={"Invoice Number"}
              {...register("invoice.invoice_number")}
              error={!!errors.invoice?.invoice_number}
              errormessage={errors.invoice?.invoice_number?.message}
              placeholder="INV-2025-001"
            />
            <Date
              label="Issue Date"
              {...register("invoice.issue_date")}
              error={!!errors.invoice?.issue_date}
              errormessage={errors.invoice?.issue_date?.message}
            />
            <Date
              label="Due Date"
              {...register("invoice.due_date")}
              error={!!errors.invoice?.due_date}
              errormessage={errors.invoice?.due_date?.message}
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Items
            </label>
            {fields.map((field, index) => (
              <div key={field.id} className="mb-3 p-3 bg-gray-50 rounded-md">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-500">
                    Item #{index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeInvoiceItem(index)}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
                <Text
                  componentclassname="mb-2"
                  label={"Description"}
                  {...register(`invoice.items.${index}.description`)}
                  error={!!errors.invoice?.items?.[index]?.description}
                  errormessage={
                    errors.invoice?.items?.[index]?.description?.message
                  }
                  placeholder="Item Description"
                />
                <div className="grid grid-cols-3 gap-2">
                  <Number
                    componentclassname="mb-2"
                    label={"Quantity"}
                    {...register(`invoice.items.${index}.quantity`, {
                      valueAsNumber: true,
                    })}
                    error={!!errors.invoice?.items?.[index]?.quantity}
                    errormessage={
                      errors.invoice?.items?.[index]?.quantity?.message
                    }
                    placeholder="1"
                  />
                  <Number
                    componentclassname="mb-2"
                    label={"Unit Price"}
                    {...register(`invoice.items.${index}.unit_price`, {
                      valueAsNumber: true,
                    })}
                    error={!!errors.invoice?.items?.[index]?.unit_price}
                    errormessage={
                      errors.invoice?.items?.[index]?.unit_price?.message
                    }
                    placeholder="0.00"
                  />
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Total
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700"
                      value={
                        watchedValues.invoice?.items?.[index]?.quantity > 0 &&
                        watchedValues.invoice?.items?.[index]?.unit_price > 0
                          ? `IDR ${(
                              watchedValues.invoice.items[index].quantity *
                              watchedValues.invoice.items[index].unit_price
                            ).toLocaleString()}`
                          : ""
                      }
                      disabled
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addInvoiceItem}
              className="w-full mt-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200 cursor-pointer"
            >
              + Add Item
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <Number
              label={"Tax Rate (%)"}
              {...register("invoice.tax_rate", { valueAsNumber: true })}
              error={!!errors.invoice?.tax_rate}
              errormessage={errors.invoice?.tax_rate?.message}
              placeholder="10"
            />
            <TextArea
              className=""
              label={"Notes"}
              rows={2}
              {...register("invoice.notes")}
              error={!!errors.invoice?.notes}
              errormessage={errors.invoice?.notes?.message}
              placeholder="Any additional notes or terms"
            />
          </div>

          <div className="bg-gray-50 p-3 rounded-md">
            <div className="flex justify-between mb-1">
              <span className="text-gray-700">Subtotal:</span>
              <span className="text-gray-700">
                IDR {(calculatedValues.subtotal || 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-700">
                Tax ({watchedValues.invoice?.tax_rate || 0}%):
              </span>
              <span className="text-gray-700">
                IDR {(calculatedValues.tax || 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between font-medium text-lg border-t border-gray-300 pt-2 mt-2">
              <span className="text-gray-700">Total:</span>
              <span className="text-gray-700">
                IDR {(calculatedValues.total || 0).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </InvoiceFormContainer>
    </form>
  );
};

export default Form;

Form.defaultProps = {
  initialData: {
    user: {
      name: "",
      address: "",
      email: "",
      phone: "",
      bank_name: "",
      bank_account_name: "",
      bank_account_number: "",
    },
    client: {
      name: "",
      address: "",
      email: "",
      phone: "",
    },
    invoice: {
      invoice_number: "",
      issue_date: "",
      due_date: "",
      items: [{ description: "", quantity: 1, unit_price: 0 }],
      tax_rate: 0,
      notes: "",
      subtotal: 0,
      tax: 0,
      total: 0,
    },
  },
  onFormChange: () => {},
  onSubmit: () => {},
  setFormTrigger: () => {},
};