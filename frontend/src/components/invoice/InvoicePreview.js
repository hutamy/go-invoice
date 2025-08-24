import React from "react";
import { Button } from "../buttons";

const Preview = ({
  invoice,
  user,
  client,
  loading,
  setLoading,
  downloadPDF,
}) => {  
  return (
    <div className="w-full md:w-1/2 overflow-hidden">
      <div
        className="bg-gray-50 p-1 rounded-lg shadow-sm"
        style={{ height: "100%", overflow: "auto" }}
      >
        <div className="font-sans text-gray-700 bg-gray-50 py-4 md:py-10 px-2 md:px-5">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-4 md:p-10">
            {/* Header Section - Mobile Responsive */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 md:mb-10">
              <div className="mb-4 md:mb-0">
                <div className="text-2xl md:text-3xl font-semibold text-gray-800 mb-1">
                  INVOICE
                </div>
                <div className="text-sm md:text-base text-gray-600">
                  {invoice.invoice_number}
                </div>
              </div>
              <div className="text-gray-600 text-left md:text-right">
                <div className="text-sm">
                  Issue Date:{" "}
                  {invoice.issue_date &&
                    new Date(invoice.issue_date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                </div>
                <div className="text-sm">
                  Due Date:{" "}
                  {invoice.due_date &&
                    new Date(invoice.due_date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                </div>
              </div>
            </div>

            {/* From/To Section - Mobile Responsive */}
            <div className="flex flex-col md:flex-row md:justify-between mb-6 md:mb-10 space-y-4 md:space-y-0">
              <div className="flex-1 md:mr-8">
                <h3 className="text-xs md:text-sm uppercase tracking-wider text-gray-500 mb-2">
                  From
                </h3>
                <div className="text-sm leading-relaxed">
                  {user.name && <div>{user.name}</div>}
                  {user.address && <div>{user.address}</div>}
                  {user.email && <div>{user.email}</div>}
                  {user.phone && <div>{user.phone}</div>}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xs md:text-sm uppercase tracking-wider text-gray-500 mb-2">
                  To
                </h3>
                <div className="text-sm leading-relaxed">
                  {client.name && <div>{client.name}</div>}
                  {client.address && <div>{client.address}</div>}
                  {client.email && <div>{client.email}</div>}
                  {client.phone && <div>{client.phone}</div>}
                </div>
              </div>
            </div>

            {/* Items Table - Mobile Responsive */}
            <div className="mb-6 md:mb-8">
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="py-3 px-2 text-left bg-gray-50 font-semibold text-sm border-b-2 border-gray-200">
                        Description
                      </th>
                      <th className="py-3 px-2 text-left bg-gray-50 font-semibold text-sm border-b-2 border-gray-200">
                        Quantity
                      </th>
                      <th className="py-3 px-2 text-left bg-gray-50 font-semibold text-sm border-b-2 border-gray-200">
                        Unit Price
                      </th>
                      <th className="py-3 px-2 text-right bg-gray-50 font-semibold text-sm border-b-2 border-gray-200">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item, index) => (
                      <tr key={index}>
                        <td
                          className={`py-3.5 px-2 ${
                            index === invoice.items.length - 1
                              ? ""
                              : "border-b border-gray-200"
                          }`}
                        >
                          {item.description}
                        </td>
                        <td
                          className={`py-3.5 px-2 ${
                            index === invoice.items.length - 1
                              ? ""
                              : "border-b border-gray-200"
                          }`}
                        >
                          {item.quantity > 0 && item.quantity}
                        </td>
                        <td
                          className={`py-3.5 px-2 ${
                            index === invoice.items.length - 1
                              ? ""
                              : "border-b border-gray-200"
                          }`}
                        >
                          {item.unit_price > 0 && (
                            <span>IDR {item.unit_price.toLocaleString()}</span>
                          )}
                        </td>
                        <td
                          className={`py-3.5 px-2 text-right ${
                            index === invoice.items.length - 1
                              ? ""
                              : "border-b border-gray-200"
                          }`}
                        >
                          {item.quantity > 0 && item.unit_price > 0 && (
                            <span>
                              IDR{" "}
                              {(
                                item.quantity * item.unit_price
                              ).toLocaleString()}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                <h3 className="text-sm font-semibold text-gray-700 border-b border-gray-200 pb-2">
                  Items
                </h3>
                {invoice.items.map((item, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Description
                        </span>
                        <div className="text-sm font-medium text-gray-900">
                          {item.description}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Quantity
                          </span>
                          <div className="text-sm text-gray-900">
                            {item.quantity > 0 ? item.quantity : "-"}
                          </div>
                        </div>
                        <div>
                          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Unit Price
                          </span>
                          <div className="text-sm text-gray-900">
                            {item.unit_price > 0
                              ? `IDR ${item.unit_price.toLocaleString()}`
                              : "-"}
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-gray-200 pt-2">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Total
                        </span>
                        <div className="text-sm font-semibold text-gray-900">
                          {item.quantity > 0 && item.unit_price > 0
                            ? `IDR ${(
                                item.quantity * item.unit_price
                              ).toLocaleString()}`
                            : "-"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals Section - Mobile Responsive */}
            <div className="flex flex-col items-end mt-5 pt-4 border-t-2 border-gray-100">
              <div className="w-full max-w-xs space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal:</span>
                  <span>IDR {(invoice.subtotal || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>
                    Tax ({(invoice.tax_rate || 0).toLocaleString()}%):
                  </span>
                  <span>IDR {(invoice.tax || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-medium text-base md:text-lg border-t border-gray-300 pt-2 mt-2">
                  <span className="text-gray-700">Total:</span>
                  <span className="text-lg md:text-xl font-bold text-gray-800">
                    IDR {(invoice.total || 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Notes Section - Mobile Responsive */}
            <div className="mt-6 md:mt-10 pt-5 border-t border-gray-200 text-sm text-gray-600">
              <div className="space-y-2">
                {invoice.notes && (
                  <div>
                    <strong>Terms:</strong> {invoice.notes}
                  </div>
                )}
                <div>
                  <strong>Thank you</strong> for your business!
                </div>
              </div>
            </div>

            {/* Bank Details Section - Mobile Responsive */}
            <div className="mt-5 p-4 md:p-5 bg-gray-50 rounded-md text-sm">
              <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-3">
                Bank Account Details
              </h4>
              <div className="space-y-2 md:grid md:grid-cols-[max-content_1fr] md:gap-y-2 md:gap-x-4 md:space-y-0">
                {user.bank_name && (
                  <>
                    <div className="font-semibold">Bank Name:</div>
                    <div className="mb-2 md:mb-0">{user.bank_name}</div>
                  </>
                )}

                {user.bank_account_name && (
                  <>
                    <div className="font-semibold">Account Name:</div>
                    <div className="mb-2 md:mb-0">{user.bank_account_name}</div>
                  </>
                )}

                {user.bank_account_number && (
                  <>
                    <div className="font-semibold">Account Number:</div>
                    <div>{user.bank_account_number}</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Download Button - Mobile Responsive */}
        <div className="flex items-center justify-center md:justify-end px-3 md:px-5 pb-4 md:pb-0">
          <Button
            type="submit"
            disabled={loading}
            onClick={() => {
              setLoading(true);
              downloadPDF({
                invoice,
                user,
                client,
              }).finally(() => setLoading(false));
            }}
            className="w-full md:w-auto"
          >
            {loading ? (
              <span className="flex items-center justify-center space-x-2">
                <span>Generating PDF</span>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </span>
            ) : (
              <span>Download PDF</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
Preview.defaultProps = {
  invoice: {
    invoice_number: "",
    issue_date: new Date().toISOString(),
    due_date: new Date().toISOString(),
    items: [],
    currency: "$",
    subtotal: 0,
    tax_rate: 0,
    tax: 0,
    total: 0,
    notes: "",
  },
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
  handleInputChange: () => {},
  handleItemChange: () => {},
  handleTaxRateChange: () => {},
  addInvoiceItem: () => {},
  removeInvoiceItem: () => {},
  loading: false,
  setLoading: () => {},
  downloadPDF: () => Promise.resolve(),
};
