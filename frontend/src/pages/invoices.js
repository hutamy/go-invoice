import Header from "@/components/layout/Header";
import { PlusIcon } from "@heroicons/react/20/solid";
import InvoiceList from "@/components/invoice/InvoiceList";
import { useState, useEffect } from "react";
import InvoiceGeneratorPrivate from "@/components/invoice/InvoiceGeneratorPrivate";
import { withAuth } from "@/components/withAuth";
import { useAuth } from "@/contexts/AuthContext";
import Toast from "@/components/ui/Toast";
import {
  getInvoices,
  createInvoice,
  deleteInvoice,
  downloadInvoice,
  updateInvoiceStatus,
  updateInvoice,
} from "@/api/invoiceApi";
import { getClients } from "@/api/clientApi";

function Invoices() {
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();
  const [invoicesList, setInvoicesList] = useState([]);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [clientsList, setClientsList] = useState([]);
  const [invoiceData, setInvoiceData] = useState({
    invoice: {
      id: 0,
      invoice_number: "",
      client_id: 0,
      issue_date: "",
      due_date: "",
      currency: "",
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
      name: user.name || "",
      address: user.address || "",
      email: user.email || "",
      phone: user.phone || "",
      bank_name: user.bank_name || "",
      bank_account_name: user.bank_account_name || "",
      bank_account_number: user.bank_account_number || "",
    },
    client: {
      search: "",
      dropdownOpen: false,
      name: "",
      address: "",
      email: "",
      phone: "",
    },
  });
  const [isEdit, setIsEdit] = useState(false);

  async function fetchInvoices() {
    try {
      const response = await getInvoices();
      setInvoicesList(response.data);
    } catch (error) {
      setMessage("Failed to fetch invoices");
      setIsError(true);
    }
  }

  async function fetchClients() {
    try {
      const response = await getClients();
      setClientsList(response.data);
    } catch (error) {
      setMessage("Failed to fetch clients");
      setIsError(true);
    }
  }

  async function fetchClients() {
    try {
      const response = await getClients();
      setClientsList(response.data);
    } catch (error) {
      setMessage("Failed to fetch clients");
      setIsError(true);
    }
  }

  // Handle input change
  const handleInputChange = (section, field, value) => {
    setInvoiceData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  // Handle item change in the invoice
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...invoiceData.invoice.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]:
        field === "quantity" || field === "unit_price" ? Number(value) : value,
    };

    // Recalculate invoice totals
    const subtotal = updatedItems.reduce(
      (sum, item) => sum + item.quantity * item.unit_price,
      0
    );
    const tax = subtotal * (invoiceData.invoice.tax_rate / 100);
    const total = subtotal + tax;

    setInvoiceData((prevData) => ({
      ...prevData,
      invoice: {
        ...prevData.invoice,
        items: updatedItems,
        subtotal: subtotal,
        tax: tax,
        total: total,
      },
    }));
  };

  // Handle tax rate change
  const handleTaxRateChange = (value) => {
    const taxRate = Number(value);
    const subtotal = invoiceData.invoice.subtotal;
    const tax = subtotal * (taxRate / 100);
    const total = subtotal + tax;

    setInvoiceData((prevData) => ({
      ...prevData,
      invoice: {
        ...prevData.invoice,
        tax_rate: taxRate,
        tax: tax,
        total: total,
      },
    }));
  };

  // Add new invoice item
  const addInvoiceItem = () => {
    const newItem = {
      description: "",
      quantity: 0,
      unit_price: 0,
    };

    setInvoiceData((prevData) => ({
      ...prevData,
      invoice: {
        ...prevData.invoice,
        items: [...prevData.invoice.items, newItem],
      },
    }));
  };

  // Remove invoice item
  const removeInvoiceItem = (index) => {
    const updatedItems = invoiceData.invoice.items.filter(
      (_, i) => i !== index
    );

    // Recalculate totals
    const subtotal = updatedItems.reduce(
      (sum, item) => sum + item.quantity * item.unit_price,
      0
    );
    const tax = subtotal * (invoiceData.invoice.tax_rate / 100);
    const total = subtotal + tax;

    setInvoiceData((prevData) => ({
      ...prevData,
      invoice: {
        ...prevData.invoice,
        items: updatedItems,
        subtotal: subtotal,
        tax: tax,
        total: total,
      },
    }));
  };

  function clearForm() {
    setShowForm(false);
    setInvoiceData({
      invoice: {
        invoice_number: "",
        client_id: 0,
        issue_date: "",
        due_date: "",
        currency: "",
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
        name: user.name || "",
        address: user.address || "",
        email: user.email || "",
        phone: user.phone || "",
        bank_name: user.bank_name || "",
        bank_account_name: user.bank_account_name || "",
        bank_account_number: user.bank_account_number || "",
      },
      client: {
        search: "",
        dropdownOpen: false,
        name: "",
        address: "",
        email: "",
        phone: "",
      },
    });
  }

  async function handleSubmit() {
    try {
      const invoice = {
        ...invoiceData.invoice,
        client_name: invoiceData.client.name,
        client_address: invoiceData.client.address,
        client_email: invoiceData.client.email,
        client_phone: invoiceData.client.phone,
        user_id: user.id,
      };
      await createInvoice(invoice);
      setMessage("Invoice created successfully");
      setIsError(false);
      clearForm();
      fetchInvoices(); // Refresh the invoice list after creation
    } catch (error) {
      setMessage("Failed to create invoice");
      setIsError(true);
      console.error("Error creating invoice:", error);
    }
  }

  async function handleDeleteInvoice(invoiceId) {
    try {
      await deleteInvoice(invoiceId);
      setMessage("Invoice deleted successfully");
      setIsError(false);
      fetchInvoices(); // Refresh the invoice list after deletion
    } catch (error) {
      setMessage("Failed to delete invoice");
      setIsError(true);
      console.error("Error deleting invoice:", error);
    }
  }

  useEffect(() => {
    fetchInvoices();
    fetchClients();
  }, []);

  async function handleDownloadInvoice(invoiceId) {
    try {
      const response = await downloadInvoice(invoiceId);
      const url = window.URL.createObjectURL(response);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice_${invoiceId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setMessage("Failed to download invoice");
      setIsError(true);
      console.error("Error downloading invoice:", error);
    }
  }

  async function handleUpdateInvoiceStatus(invoiceId, status) {
    try {
      await updateInvoiceStatus(invoiceId, status);
      setMessage(`Successfully updated invoice status`);
      setIsError(false);
      fetchInvoices(); // Refresh the invoice list after status update
    } catch (error) {
      setMessage("Failed to update invoice status");
      setIsError(true);
      console.error("Error updating invoice status:", error);
    }
  }

  async function handleUpdateInvoice() {
    try {
      const invoice = {
        ...invoiceData.invoice,
        client_name: invoiceData.client.name,
        client_address: invoiceData.client.address,
        client_email: invoiceData.client.email,
        client_phone: invoiceData.client.phone,
        user_id: user.id,
      };
      await updateInvoice(invoiceData.invoice.id, invoice);
      setMessage("Invoice updated successfully");
      setIsError(false);
      setIsEdit(false);
      clearForm();
      fetchInvoices(); // Refresh the invoice list after update
    } catch (error) {
      setMessage("Failed to update invoice");
      setIsError(true);
      console.error("Error updating invoice:", error);
    }
  }

  return (
    <>
      <div className="bg-white h-20 border-b border-gray-900/10 px-6 lg:px-8 flex-shrink-0">
        <Header />
      </div>
      {message && (
        <Toast
          title={isError ? "Error" : "Success"}
          message={message}
          isError={isError}
          setMessage={setMessage}
        />
      )}
      <main className="min-h-screen">
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 transform-gpu overflow-hidden blur-3xl"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                opacity: 0.5,
              }}
              className="relative left-1/2 aspect-[1155/678] w-[72.1875rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#6e42fc] to-[#fcee08]"
            />
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16 py-16 xl:space-y-20">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold text-gray-900">
                  Invoices
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  A list of all the invoices in your account including their
                  number, client, email, amount, status, issue date, and due
                  date.
                </p>
              </div>

              {!showForm && (
                <div className="sm:ml-16 sm:mt-0 sm:flex-none">
                  <button
                    type="button"
                    className={
                      "rounded-md px-3 py-2 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:cursor-pointer focus-visible:outline-blue-600 bg-blue-600 hover:bg-blue-500"
                    }
                    onClick={() => setShowForm(true)}
                  >
                    <span className="flex items-center gap-x-1">
                      <PlusIcon
                        aria-hidden="true"
                        className="-ml-1.5 h-4 w-4"
                      />
                      Create invoice
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              {showForm ? (
                <InvoiceGeneratorPrivate
                  clients={clientsList}
                  setShowForm={setShowForm}
                  clearForm={clearForm}
                  invoiceData={invoiceData}
                  handleInputChange={handleInputChange}
                  handleItemChange={handleItemChange}
                  handleTaxRateChange={handleTaxRateChange}
                  addInvoiceItem={addInvoiceItem}
                  removeInvoiceItem={removeInvoiceItem}
                  handleSubmit={handleSubmit}
                  isEdit={isEdit}
                  handleUpdateInvoice={handleUpdateInvoice}
                />
              ) : (
                <InvoiceList
                  invoices={invoicesList}
                  handleDeleteInvoice={handleDeleteInvoice}
                  handleDownloadInvoice={handleDownloadInvoice}
                  handleUpdateInvoiceStatus={handleUpdateInvoiceStatus}
                  handleUpdateInvoice={handleUpdateInvoice}
                  setInvoiceData={setInvoiceData}
                  setShowForm={setShowForm}
                  setIsEdit={setIsEdit}
                  user={user}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default withAuth(Invoices);
