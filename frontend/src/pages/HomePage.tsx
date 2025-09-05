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
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50/50 to-sky-50/40">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-16 sm:pb-20 md:pb-24 lg:max-w-2xl lg:w-full lg:pb-32 xl:pb-40">
            <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-20 sm:px-6 md:mt-24 lg:mt-32 lg:px-8 xl:mt-40">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-primary-900 leading-[0.9] tracking-tight mb-8">
                  Create
                  <span className="block bg-gradient-to-r from-sky-400 via-blue-500 to-accent-600 bg-clip-text text-transparent">
                    Beautiful Invoices
                  </span>
                </h1>
                <p className="text-xl sm:text-2xl text-primary-600 mb-12 max-w-2xl leading-relaxed font-light">
                  Professional invoice generation made simple. Create, customize, 
                  and send invoices that get you paid faster.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
                  <button
                    onClick={handleScrollToDemo}
                    className="group relative px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-full font-semibold transition-all hover:from-sky-600 hover:to-blue-700 hover:shadow-2xl hover:shadow-sky-500/25 active:scale-[0.98] text-lg"
                  >
                    <span className="relative z-10">Try Demo</span>
                  </button>
                  <button className="px-8 py-4 border-2 border-primary-200 text-primary-700 rounded-full font-semibold hover:bg-primary-50 hover:border-primary-300 transition-all text-lg">
                    Watch Demo
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="h-80 w-full sm:h-96 md:h-128 lg:w-full lg:h-full relative">
            <div className="absolute inset-0 flex items-start justify-center p-6">
              {/* Mock Invoice Preview */}
              <div className="p-8 transform rotate-2 hover:rotate-0 transition-transform duration-700 ease-out">
                <div className="bg-white rounded-3xl border border-primary-200/60 p-8 shadow-2xl shadow-sky-900/10">
                  <div className="transform scale-75 sm:scale-90 origin-top-left">
                    <InvoicePreview
                      data={{
                        client_name: "Acme Corp",
                        client_email: "hello@acme.com",
                        client_address: "123 Business St",
                        client_phone: "+1 555-0123",
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
                        notes: "Thank you for your business!",
                        sender_name: "Your Company",
                        sender_email: "hello@yourcompany.com",
                        sender_phone: "+1 555-0456",
                        sender_address: "456 Your Street",
                        sender_bank_name: "",
                        sender_bank_account_name: "",
                        sender_bank_account_number: "",
                        items: [
                          {
                            description: "Web Development Service",
                            quantity: 1,
                            unit_price: 2500000,
                            total: 2500000,
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
      <div className="py-32" id="invoice">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-900 mb-8 leading-tight">
              Create Your Invoice
            </h2>
            <p className="text-xl text-primary-600 max-w-3xl mx-auto leading-relaxed font-light">
              Fill out the form and watch your invoice come to life in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-5 gap-16">
            {/* Form Section */}
            <div className="xl:col-span-2 space-y-12">
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-primary-200/50 overflow-hidden">
                <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-blue-900 px-10 py-8">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <FileText className="h-7 w-7 mr-4" />
                    Invoice Details
                  </h2>
                </div>
                <div className="p-10">
                  <InvoiceForm
                    data={formData}
                    onChange={handleFormChange}
                    showClientSelection={false}
                  />

                  {/* Generate PDF Button */}
                  <div className="mt-10 pt-10 border-t border-primary-200">
                    <button
                      onClick={handleGenerateInvoice}
                      disabled={isGenerating}
                      className={`w-full inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-full transition-all ${
                        isGenerating
                          ? "bg-primary-100 text-primary-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-sky-500 via-blue-600 to-accent-600 hover:from-sky-600 hover:via-blue-700 hover:to-accent-700 text-white shadow-xl hover:shadow-2xl hover:shadow-sky-500/25 active:scale-[0.98]"
                      }`}
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-400 mr-3"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Download className="h-5 w-5 mr-3" />
                          Generate PDF Invoice
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div className="xl:col-span-3 space-y-12">
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-primary-200/50 overflow-hidden">
                <div className="bg-gradient-to-r from-accent-600 via-sky-500 to-blue-600 px-10 py-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white flex items-center">
                      <FileText className="h-7 w-7 mr-4" />
                      Live Preview
                    </h2>
                    <span className="bg-white/20 text-white text-sm px-4 py-2 rounded-full font-semibold">
                      Real-time
                    </span>
                  </div>
                </div>
                <div className="p-10">
                  <div className="bg-gradient-to-br from-primary-50/80 to-sky-50/60 rounded-2xl p-8 border border-primary-200/40">
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
