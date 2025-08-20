import React, { useState, useCallback } from "react";
import InvoicePreview from "@/components/invoice/InvoicePreview";
import InvoiceForm from "@/components/invoice/InvoiceForm";
import { downloadPublicInvoice } from "@/api/invoiceApi";
import Toast from "@/components/ui/Toast";

export default function HomeInvoice() {
  const [invoiceData, setInvoiceData] = useState({
    invoice: {
      invoice_number: "",
      issue_date: "",
      due_date: "",
      items: [
        {
          description: "",
          quantity: 0,
          unit_price: 0,
        },
      ],
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
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [formTrigger, setFormTrigger] = useState(null);

  const handleFormChange = useCallback((formData) => {
    setInvoiceData(formData);
  }, []);

  const setFormValidationTrigger = (trigger) => {
    setFormTrigger(() => trigger);
  };

  const downloadPDF = async (formData) => {
    if (formTrigger) {
      const isValid = await formTrigger();
      if (!isValid) {
        setMessage("Please fill in all required fields before downloading.");
        setIsError(true);
        return;
      }
    }

    const invoiceData = formData.invoice
      ? formData
      : {
          invoice: formData.invoice,
          user: formData.user,
          client: formData.client,
        };
    let invoice = {
      invoice_number: invoiceData.invoice.invoice_number,
      due_date: invoiceData.invoice.due_date,
      issue_date: invoiceData.invoice.issue_date,
      notes: invoiceData.invoice.notes,
      sender: invoiceData.user,
      recipient: invoiceData.client,
      items: invoiceData.invoice.items,
      tax_rate: invoiceData.invoice.tax_rate,
    };
    try {
      setLoading(true);
      const response = await downloadPublicInvoice(invoice);
      const url = window.URL.createObjectURL(response);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice_${
        invoiceData.invoice.invoice_number || "draft"
      }.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      setMessage("Invoice downloaded successfully!");
      setIsError(false);
    } catch (error) {
      setIsError(true);
      setMessage("Failed to download invoice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto p-0 sm:px-8 pb-14" id="invoice">
      {message && (
        <Toast
          title={isError ? "Error" : "Success"}
          message={message}
          isError={isError}
          setMessage={setMessage}
        />
      )}
      <div className="min-h-screen">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Column - Form */}
            <InvoiceForm
              initialData={invoiceData}
              onFormChange={handleFormChange}
              onSubmit={downloadPDF}
              setFormTrigger={setFormValidationTrigger}
              loading={loading}
            />

            {/* Right Column - Preview */}
            <InvoicePreview
              invoice={invoiceData.invoice}
              user={invoiceData.user}
              client={invoiceData.client}
              loading={loading}
              setLoading={setLoading}
              downloadPDF={downloadPDF}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
