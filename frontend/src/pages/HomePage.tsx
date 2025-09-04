import React, { useState } from "react";
import { FileText, Download } from "lucide-react";
import { toast } from "react-toastify";
import InvoiceForm from "../components/InvoiceForm.tsx";
import InvoicePreview from "../components/InvoicePreview.tsx";
import Navbar from "../components/Navbar.tsx";
import { apiService } from "../utils/api.ts";
import type { InvoiceFormData } from "../types/index.ts";

const HomePage: React.FC = () => {
  const [formData, setFormData] = useState<InvoiceFormData>({
    client_name: "",
    client_email: "",
    client_address: "",
    client_phone: "",
    invoice_number: `INV-${new Date().getFullYear()}-${String(Date.now()).slice(
      -6
    )}`,
    issue_date: new Date().toISOString().split("T")[0],
    due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    tax_rate: 0,
    notes: "",
    // Sender details for non-authenticated users
    sender_name: "",
    sender_email: "",
    sender_phone: "",
    sender_address: "",
    sender_bank_name: "",
    sender_bank_account_name: "",
    sender_bank_account_number: "",
    items: [
      {
        description: "",
        quantity: 1,
        unit_price: 0,
        total: 0,
      },
    ],
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleFormChange = (data: InvoiceFormData) => {
    setFormData(data);
  };

  const handleScrollToDemo = () => {
    const invoiceSection = document.getElementById("invoice");
    if (invoiceSection) {
      invoiceSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleGenerateInvoice = async () => {
    try {
      setIsGenerating(true);

      // Validate required fields
      if (!formData.client_name.trim()) {
        toast.error("Client name is required");
        return;
      }

      // Validate sender details for non-authenticated users
      if (!formData.sender_name?.trim()) {
        toast.error("Sender name is required");
        return;
      }

      if (!formData.sender_email?.trim()) {
        toast.error("Sender email is required");
        return;
      }

      if (
        formData.items.length === 0 ||
        !formData.items.some((item) => item.description.trim())
      ) {
        toast.error("At least one item is required");
        return;
      }

      const blob = await apiService.generatePublicInvoice(formData);

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${formData.client_name
        .replace(/\s+/g, "-")
        .toLowerCase()}-${formData.issue_date}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Invoice generated successfully!");
    } catch {
      toast.error("Failed to generate invoice. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-6 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Build your
                  <span className="block text-blue-600">
                    Invoice with GoInvoice
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl">
                  GoInvoice simplifies and optimizes company financial
                  management, offering real-time insights, smart budgeting
                  tools, and seamless cash flow tracking.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button
                      onClick={handleScrollToDemo}
                      className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors"
                    >
                      <span className="text-sm sm:text-base">
                        Let's See a Demo!
                      </span>
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="h-64 w-full sm:h-72 md:h-96 lg:w-full lg:h-full relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-start justify-center p-4">
              {/* Mock Invoice Preview */}
              <div className="p-3 sm:p-6 bg-gray-50">
                <div className="bg-white rounded-lg border p-2 sm:p-4">
                  <div className="transform scale-75 sm:scale-100 origin-top-left">
                    <InvoicePreview
                      data={{
                        client_name: "",
                        client_email: "",
                        client_address: "",
                        client_phone: "",
                        invoice_number: `INV-${new Date().getFullYear()}-${String(
                          Date.now()
                        ).slice(-6)}`,
                        issue_date: new Date().toISOString().split("T")[0],
                        due_date: new Date(
                          Date.now() + 30 * 24 * 60 * 60 * 1000
                        )
                          .toISOString()
                          .split("T")[0],
                        tax_rate: 10,
                        notes: "",
                        sender_name: "",
                        sender_email: "",
                        sender_phone: "",
                        sender_address: "",
                        sender_bank_name: "",
                        sender_bank_account_name: "",
                        sender_bank_account_number: "",
                        items: [
                          {
                            description: "Service",
                            quantity: 1,
                            unit_price: 10000000,
                            total: 10000000,
                          },
                        ],
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form and Preview Section */}
      <div className="bg-white py-12 sm:py-16" id="invoice">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Create Your Invoice
            </h2>
            <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
              Fill out the form below and see your professional invoice come to
              life in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 sm:gap-12">
            {/* Form Section */}
            <div className="xl:col-span-2 space-y-6 sm:space-y-8">
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100/50 overflow-hidden backdrop-blur-sm">
                <div className="bg-blue-600/5 border-b border-blue-200/20 px-4 py-4 sm:px-8 sm:py-6">
                  <h2 className="text-lg sm:text-xl font-medium text-gray-900 flex items-center">
                    <FileText className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-blue-600" />
                    Invoice Details
                  </h2>
                </div>
                <div className="p-4 sm:p-8">
                  <InvoiceForm
                    data={formData}
                    onChange={handleFormChange}
                    showClientSelection={false}
                  />

                  {/* Generate PDF Button */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <button
                      onClick={handleGenerateInvoice}
                      disabled={isGenerating}
                      className={`w-full inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-xl transition-colors ${
                        isGenerating
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
                      }`}
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Download className="h-5 w-5 mr-2" />
                          Generate PDF Invoice
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div className="xl:col-span-3 space-y-6 sm:space-y-8">
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100/50 overflow-hidden backdrop-blur-sm">
                <div className="bg-blue-600/5 border-b border-blue-200/20 px-4 py-4 sm:px-8 sm:py-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg sm:text-xl font-medium text-gray-900 flex items-center">
                      <FileText className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-blue-600" />
                      Live Preview
                    </h2>
                    <span className="bg-blue-600/10 text-blue-600 text-xs px-2 py-1 sm:px-3 rounded-full font-medium">
                      Real-time
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-8">
                  <div className="bg-gray-50/30 rounded-xl sm:rounded-2xl p-3 sm:p-6 border border-gray-200/50">
                    <div className="transform scale-90 sm:scale-100 origin-top-left">
                      <InvoicePreview data={formData} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
