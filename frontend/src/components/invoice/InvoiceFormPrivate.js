import Date from "../ui/Date";
import Email from "../ui/Email";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Text from "../ui/Text";
import TextArea from "../ui/TextArea";
import InvoiceFormContainer from "./InvoiceFormContainer";
import Number from "../ui/Number";

const Form = ({
  invoiceData,
  handleInputChange,
  removeInvoiceItem,
  handleItemChange,
  addInvoiceItem,
  handleTaxRateChange,
  clients,
}) => {
  return (
    <div className="w-full md:w-1/2 bg-gray-50 p-6 rounded-lg shadow-sm">
      <div className="mb-4">
        <p className="text-gray-700 font-medium mb-2">
          Fill in invoice details
        </p>
      </div>

      {/* My Details Section */}
      <InvoiceFormContainer label="My Details">
        <div className="p-4 bg-white">
          <Text
            componentclassname={"mb-3"}
            label={"Name"}
            name="user_name"
            value={invoiceData.user.name}
            onChange={(e) => handleInputChange("user", "name", e.target.value)}
            placeholder="Your Name"
            disabled
          />
          <TextArea
            className={"mb-3"}
            label={"Address"}
            rows={2}
            value={invoiceData.user.address}
            onChange={(e) =>
              handleInputChange("user", "address", e.target.value)
            }
            placeholder="456 Your Street, Client City, Country"
            disabled
          />
          <div className="grid grid-cols-2 gap-3">
            <Email
              name="user_email"
              label="Email"
              value={invoiceData.user.email}
              onChange={(e) =>
                handleInputChange("user", "email", e.target.value)
              }
              placeholder="contact@yourcompany.com"
              disabled
            />
            <Text
              label="Phone"
              name="user_phone"
              value={invoiceData.user.phone}
              onChange={(e) =>
                handleInputChange("user", "phone", e.target.value)
              }
              placeholder="+1 234 567 890"
              disabled
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
                value={invoiceData.user.bank_name}
                onChange={(e) =>
                  handleInputChange("user", "bank_name", e.target.value)
                }
                disabled
              />
              <Input
                type={"text"}
                placeholder={"Your Company Ltd"}
                value={invoiceData.user.bank_account_name}
                onChange={(e) =>
                  handleInputChange("user", "bank_account_name", e.target.value)
                }
                disabled
              />
            </div>
            <Input
              type="text"
              placeholder="1234567890"
              inputclassname="mt-3"
              value={invoiceData.user.bank_account_number}
              onChange={(e) =>
                handleInputChange("user", "bank_account_number", e.target.value)
              }
              disabled
            />
          </div>
        </div>
      </InvoiceFormContainer>

      {/* Client Details Section */}
      <InvoiceFormContainer label="Client Details">
        <div className="p-4 bg-white">
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select From Client Contact
            </label>
            <div className="relative">
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label="Clear selected client"
                onClick={() => {
                  handleInputChange("client", "name", "");
                  handleInputChange("client", "email", "");
                  handleInputChange("client", "address", "");
                  handleInputChange("client", "phone", "");
                  handleInputChange("client", "search", "");
                  handleInputChange("client", "dropdownOpen", false);
                  handleInputChange("invoice", "client_id", 0);
                }}
                tabIndex={0}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 20 20"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 6l8 8M6 14L14 6"
                  />
                </svg>
              </button>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
                placeholder="Search client by name or email"
                value={invoiceData.client.search || ""}
                onChange={(e) =>
                  handleInputChange("client", "search", e.target.value)
                }
                onFocus={() =>
                  handleInputChange("client", "dropdownOpen", true)
                }
                autoComplete="off"
              />
              {invoiceData.client.dropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-56 overflow-auto">
                  {clients
                    .filter(
                      (c) =>
                        !invoiceData.client.search ||
                        c.name
                          .toLowerCase()
                          .includes(invoiceData.client.search.toLowerCase()) ||
                        c.email
                          .toLowerCase()
                          .includes(invoiceData.client.search.toLowerCase())
                    )
                    .map((contact, idx) => (
                      <button
                        type="button"
                        key={contact.email + idx}
                        className="flex items-center w-full px-3 py-2 hover:bg-blue-50 focus:bg-blue-100"
                        onClick={() => {
                          handleInputChange("client", "name", contact.name);
                          handleInputChange("client", "email", contact.email);
                          handleInputChange("client", "dropdownOpen", false);
                          handleInputChange("client", "search", contact.name);
                          handleInputChange("invoice", "client_id", contact.id);
                          handleInputChange(
                            "client",
                            "address",
                            contact.address || ""
                          );
                          handleInputChange(
                            "client",
                            "phone",
                            contact.phone || ""
                          );
                        }}
                      >
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 text-blue-700 font-bold text-lg">
                          {contact.name
                            ? contact.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)
                                .toUpperCase()
                            : "?"}
                        </span>
                        <span className="flex flex-col text-left">
                          <span className="font-medium text-gray-900">
                            {contact.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {contact.email}
                          </span>
                        </span>
                      </button>
                    ))}
                  {clients.filter(
                    (c) =>
                      !invoiceData.client.search ||
                      c.name
                        .toLowerCase()
                        .includes(invoiceData.client.search.toLowerCase()) ||
                      c.email
                        .toLowerCase()
                        .includes(invoiceData.client.search.toLowerCase())
                  ).length === 0 && (
                    <div className="px-3 py-2 text-gray-400 text-sm">
                      No contacts found.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <Text
            componentclassname={"mb-3"}
            label={"Name"}
            name="client_name"
            value={invoiceData.client.name}
            onChange={(e) =>
              handleInputChange("client", "name", e.target.value)
            }
            placeholder="Client Company Name"
          />
          <TextArea
            className={"mb-3"}
            label={"Address"}
            rows={2}
            value={invoiceData.client.address}
            onChange={(e) =>
              handleInputChange("client", "address", e.target.value)
            }
            placeholder="456 Client Street, Client City, Country"
          />
          <div className="grid grid-cols-2 gap-3">
            <Email
              name="client_email"
              label="Email"
              value={invoiceData.client.email}
              onChange={(e) =>
                handleInputChange("client", "email", e.target.value)
              }
              placeholder="contact@clientcompany.com"
            />
            <Text
              label="Phone"
              name="client_phone"
              value={invoiceData.client.phone}
              onChange={(e) =>
                handleInputChange("client", "phone", e.target.value)
              }
              placeholder="+1 987 654 321"
            />
          </div>
        </div>
      </InvoiceFormContainer>

      {/* Invoice Details Section */}
      <InvoiceFormContainer label="Invoice Details">
        <div className="p-4 bg-white">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <Text
              label={"Invoice Number"}
              name="invoice_number"
              value={invoiceData.invoice.invoice_number}
              onChange={(e) =>
                handleInputChange("invoice", "invoice_number", e.target.value)
              }
              placeholder="INV-2025-001"
            />
            <Select
              className=""
              label="Currency"
              value={invoiceData.invoice.currency}
              onChange={(e) =>
                handleInputChange("invoice", "currency", e.target.value)
              }
              options={[
                { value: "AUD", label: "AUD" },
                { value: "CAD", label: "CAD" },
                { value: "CHF", label: "CHF" },
                { value: "CNY", label: "CNY" },
                { value: "EUR", label: "EUR" },
                { value: "GBP", label: "GBP" },
                { value: "HKD", label: "HKD" },
                { value: "IDR", label: "IDR" },
                { value: "INR", label: "INR" },
                { value: "JPY", label: "JPY" },
                { value: "KRW", label: "KRW" },
                { value: "NZD", label: "NZD" },
                { value: "SGD", label: "SGD" },
                { value: "USD", label: "USD" },
              ]}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <Date
              name="issue_date"
              label="Issue Date"
              value={invoiceData.invoice.issue_date}
              onChange={(e) => {
                handleInputChange("invoice", "issue_date", e.target.value);
              }}
            />
            <Date
              label="Due Date"
              name="due_date"
              value={invoiceData.invoice.due_date}
              onChange={(e) =>
                handleInputChange("invoice", "due_date", e.target.value)
              }
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Items
            </label>
            {invoiceData.invoice.items.map((item, index) => (
              <div key={index} className="mb-3 p-3 bg-gray-50 rounded-md">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-500">
                    Item #{index + 1}
                  </span>
                  <button
                    onClick={() => removeInvoiceItem(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                <Text
                  componentclassname="mb-2"
                  label={"Description"}
                  name={`item_description_${index}`}
                  value={item.description}
                  onChange={(e) =>
                    handleItemChange(index, "description", e.target.value)
                  }
                  placeholder="Item Description"
                />
                <div className="grid grid-cols-3 gap-2">
                  <Number
                    componentclassname="mb-2"
                    name={`item_quantity_${index}`}
                    label={"Quantity"}
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", e.target.value)
                    }
                    placeholder="1"
                  />
                  <Number
                    componentclassname="mb-2"
                    name={`item_unit_price_${index}`}
                    label={"Unit Price"}
                    value={item.unit_price}
                    onChange={(e) =>
                      handleItemChange(index, "unit_price", e.target.value)
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
                        item.quantity > 0 && item.unit_price > 0
                          ? `${invoiceData.invoice.currency} ${
                              item.quantity * item.unit_price
                            }`
                          : ""
                      }
                      disabled
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={addInvoiceItem}
              className="w-full mt-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200"
            >
              + Add Item
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <Number
              name="tax_rate"
              label={"Tax Rate (%)"}
              value={invoiceData.invoice.tax_rate}
              onChange={(e) => handleTaxRateChange(e.target.value)}
              placeholder="10"
            />
            <TextArea
              className=""
              label={"Notes"}
              rows={2}
              value={invoiceData.invoice.notes}
              onChange={(e) =>
                handleInputChange("invoice", "notes", e.target.value)
              }
              placeholder="Any additional notes or terms"
            />
          </div>

          <div className="bg-gray-50 p-3 rounded-md">
            <div className="flex justify-between mb-1">
              <span className="text-gray-700">Subtotal:</span>
              <span className="text-gray-700">
                {invoiceData.invoice.currency}{" "}
                {invoiceData.invoice.subtotal.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-700">
                Tax ({invoiceData.invoice.tax_rate}%):
              </span>
              <span className="text-gray-700">
                {invoiceData.invoice.currency}{" "}
                {invoiceData.invoice.tax.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between font-medium text-lg border-t border-gray-300 pt-2 mt-2">
              <span className="text-gray-700">Total:</span>
              <span className="text-gray-700">
                {invoiceData.invoice.currency}{" "}
                {invoiceData.invoice.total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </InvoiceFormContainer>
    </div>
  );
};

export default Form;

Form.defaultProps = {
  invoiceData: {
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
      currency: "$",
      issue_date: "",
      due_date: "",
      Items: [],
      tax_rate: 0,
      notes: "",
      subtotal: 0,
      tax: 0,
      total: 0,
    },
  },
};
