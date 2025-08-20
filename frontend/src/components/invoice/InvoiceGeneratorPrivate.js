import React from "react";
import InvoicePreview from "./InvoicePreview";
import InvoiceFormPrivate from "./InvoiceFormPrivate";

export default function InvoiceGeneratorPrivate({
  clients,
  setShowForm,
  clearForm,
  invoiceData,
  handleInputChange,
  handleItemChange,
  handleTaxRateChange,
  addInvoiceItem,
  removeInvoiceItem,
  handleSubmit,
  isEdit,
  handleUpdateInvoice,
}) {
  return (
    <div className="min-h-screen">
      <div className="p-6">
        {/* Main content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column - Form */}
          <InvoiceFormPrivate
            invoiceData={invoiceData}
            handleInputChange={handleInputChange}
            handleItemChange={handleItemChange}
            handleTaxRateChange={handleTaxRateChange}
            addInvoiceItem={addInvoiceItem}
            removeInvoiceItem={removeInvoiceItem}
            clients={clients}
          />

          {/* Right Column - Preview */}
          <InvoicePreview
            invoice={invoiceData.invoice}
            user={invoiceData.user}
            client={invoiceData.client}
          />
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={() => {
              clearForm();
              setShowForm(false);
            }}
            className="text-sm/6 font-semibold text-gray-900 cursor-pointer hover:text-gray-700"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={isEdit ? handleUpdateInvoice : handleSubmit}
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 hover:cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
