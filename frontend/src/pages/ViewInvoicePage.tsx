import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FileText,
  ArrowLeft,
  Download,
  Mail,
  Edit,
} from "lucide-react";
import { toast } from "react-toastify";
import { apiService } from "../utils/api.ts";
import InvoicePreview from "../components/InvoicePreview.tsx";
import type { Invoice, InvoiceFormData } from "../types/index.ts";

const ViewInvoicePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [sending, setSending] = useState(false);

  const handleBackClick = () => {
    // Go back to the previous page in history
    navigate(-1);
  };

  const loadInvoice = useCallback(async (invoiceId: number) => {
    try {
      setLoading(true);
      const data = await apiService.getInvoice(invoiceId);
      setInvoice(data);
    } catch {
      toast.error("Failed to load invoice");
      navigate("/invoices");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (id) {
      loadInvoice(parseInt(id));
    }
  }, [id, loadInvoice]);

  const handleDownload = async () => {
    if (!invoice) return;
    
    try {
      setDownloading(true);
      const blob = await apiService.downloadInvoice(invoice.id);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice-${invoice.invoice_number}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success("Invoice downloaded successfully");
    } catch {
      toast.error("Failed to download invoice");
    } finally {
      setDownloading(false);
    }
  };

  const handleSendEmail = async () => {
    if (!invoice) return;
    
    try {
      setSending(true);
      await apiService.sendInvoiceEmail(invoice.id);
      toast.success("Invoice sent successfully");
    } catch {
      toast.error("Failed to send invoice");
    } finally {
      setSending(false);
    }
  };

  // Convert Invoice to InvoiceFormData for the preview component
  const convertToFormData = (invoice: Invoice): InvoiceFormData => {
    return {
      client_id: invoice.client_id,
      client_name: invoice.client_name,
      client_email: invoice.client_email || "",
      client_address: invoice.client_address || "",
      client_phone: invoice.client_phone || "",
      invoice_number: invoice.invoice_number,
      issue_date: invoice.issue_date || "",
      due_date: invoice.due_date,
      tax_rate: invoice.tax_rate,
      notes: invoice.notes || "",
      status: invoice.status,
      items: invoice.items.map(item => ({
        id: item.id,
        description: item.description,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total: item.total
      }))
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Invoice not found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              The invoice you're looking for doesn't exist.
            </p>
            <div className="mt-6">
              <button
                onClick={handleBackClick}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Invoices
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">GoInvoice</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link
                to="/dashboard"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/invoices"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Invoices
              </Link>
              <Link
                to="/clients"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Clients
              </Link>
              <Link
                to="/settings"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Settings
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackClick}
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Invoices
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <Link
                to={`/invoices/edit/${invoice.id}`}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Link>
              <button
                onClick={handleSendEmail}
                disabled={sending}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                <Mail className="h-4 w-4 mr-2" />
                {sending ? "Sending..." : "Send Email"}
              </button>
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <Download className="h-4 w-4 mr-2" />
                {downloading ? "Downloading..." : "Download PDF"}
              </button>
            </div>
          </div>
        </div>

        {/* Invoice Preview */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <InvoicePreview data={convertToFormData(invoice)} />
        </div>
      </div>
    </div>
  );
};

export default ViewInvoicePage;
