import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FileText, ArrowLeft, Save } from 'lucide-react';
import { toast } from 'react-toastify';
import InvoiceForm from '../components/InvoiceForm.tsx';
import InvoicePreview from '../components/InvoicePreview.tsx';
import { apiService } from '../utils/api.ts';
import type { InvoiceFormData, Invoice } from '../types/index.ts';

const CreateInvoicePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const [loading, setLoading] = useState(isEditMode);
  const [invoiceData, setInvoiceData] = useState<InvoiceFormData>({
    invoice_number: `INV-${Date.now()}`,
    issue_date: new Date().toISOString().split('T')[0],
    due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    client_id: undefined,
    client_name: '',
    client_email: '',
    client_address: '',
    client_phone: '',
    items: [
      {
        description: '',
        quantity: 1,
        unit_price: 0,
        total: 0,
      },
    ],
    tax_rate: 0,
    notes: '',
    status: 'draft',
  });
  const [isSaving, setIsSaving] = useState(false);

  // Load invoice data for editing
  const loadInvoiceForEdit = useCallback(async (invoiceId: number) => {
    try {
      setLoading(true);
      const invoice: Invoice = await apiService.getInvoice(invoiceId);
      
      // Convert Invoice to InvoiceFormData
      setInvoiceData({
        client_id: invoice.client_id,
        client_name: invoice.client_name,
        client_email: invoice.client_email || '',
        client_address: invoice.client_address || '',
        client_phone: invoice.client_phone || '',
        invoice_number: invoice.invoice_number,
        issue_date: invoice.issue_date ? new Date(invoice.issue_date).toISOString().split('T')[0] : '',
        due_date: invoice.due_date ? new Date(invoice.due_date).toISOString().split('T')[0] : '',
        tax_rate: invoice.tax_rate,
        notes: invoice.notes || '',
        status: invoice.status,
        items: invoice.items.map(item => ({
          id: item.id,
          description: item.description,
          quantity: item.quantity,
          unit_price: item.unit_price,
          total: item.total
        }))
      });
    } catch {
      toast.error('Failed to load invoice');
      navigate('/invoices');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (isEditMode && id) {
      loadInvoiceForEdit(parseInt(id));
    }
  }, [isEditMode, id, loadInvoiceForEdit]);

  const handleFormChange = (data: InvoiceFormData) => {
    setInvoiceData(data);
  };

  const isFormValid = () => {
    const basicValidation = (
      invoiceData.invoice_number &&
      invoiceData.issue_date &&
      invoiceData.due_date &&
      invoiceData.items.length > 0 &&
      invoiceData.items.every(item => item.description && item.quantity > 0 && item.unit_price >= 0)
    );

    // If client_id is present, user selected from list - only client_id is required
    if (invoiceData.client_id) {
      return basicValidation;
    }

    // If no client_id, user is entering manually - require manual fields
    const manualClientValidation = (
      invoiceData.client_name &&
      invoiceData.client_email &&
      invoiceData.client_address &&
      invoiceData.client_phone
    );

    return basicValidation && manualClientValidation;
  };

  const handleSaveAsDraft = async () => {
    if (!isFormValid()) {
      if (invoiceData.client_id) {
        toast.error('Please fill in all required fields (invoice number, dates, and items)');
      } else {
        toast.error('Please fill in all required fields (invoice number, dates, client details, and items)');
      }
      return;
    }

    try {
      setIsSaving(true);
      
      if (isEditMode && id) {
        // Update existing invoice
        await apiService.updateInvoice(parseInt(id), {
          ...invoiceData,
          status: 'draft'
        });
        toast.success('Invoice updated successfully!');
      } else {
        // Create new invoice
        await apiService.createInvoice({
          ...invoiceData,
          status: 'draft'
        });
        toast.success('Invoice created successfully!');
      }
      
      navigate('/invoices');
    } catch {
      toast.error('Failed to save invoice');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50/50 to-sky-50/40">
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sky-500"></div>
        </div>
      ) : (
        <>
          {/* Navigation */}
          <nav className="bg-white/80 backdrop-blur-sm border-b border-primary-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-sky-600" />
              <span className="text-xl font-bold text-primary-900">GoInvoice</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link to="/dashboard" className="text-primary-600 hover:text-primary-900 transition-colors font-medium">
                Dashboard
              </Link>
              <Link to="/invoices" className="text-primary-600 hover:text-primary-900 transition-colors font-medium">
                Invoices
              </Link>
              <Link to="/clients" className="text-primary-600 hover:text-primary-900 transition-colors font-medium">
                Clients
              </Link>
              <Link to="/settings" className="text-primary-600 hover:text-primary-900 transition-colors font-medium">
                Settings
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/invoices"
                className="inline-flex items-center text-sm text-primary-500 hover:text-primary-700 font-medium transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Invoices
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSaveAsDraft}
                disabled={isSaving || !isFormValid()}
                className="inline-flex items-center px-8 py-3 text-sm font-semibold rounded-full shadow-lg text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
              >
                <Save className="h-5 w-5 mr-2" />
                {isSaving ? 'Saving...' : isEditMode ? 'Update Invoice' : 'Save Invoice'}
              </button>
            </div>
          </div>
          <div className="mt-6">
            <h1 className="text-5xl font-bold text-primary-900 mb-4 tracking-tight">
              {isEditMode ? 'Edit Invoice' : 'Create Invoice'}
            </h1>
            <p className="text-xl text-primary-600 font-light">
              Fill in the details below and see the live preview on the right
            </p>
          </div>
        </div>

        {/* Content - Side by Side Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form Section - Left Side */}
          <div>
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-primary-200/50 overflow-hidden">
              <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-blue-900 px-10 py-8">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <FileText className="h-7 w-7 mr-4" />
                  Invoice Details
                </h2>
              </div>
              <div className="p-10">
                <InvoiceForm 
                  data={invoiceData}
                  onChange={handleFormChange}
                  showClientSelection={true}
                />
              </div>
            </div>
          </div>

          {/* Preview Section - Right Side */}
          <div>
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
                  <div className="transform scale-75 origin-top-left overflow-hidden" style={{ width: '133%' }}>
                    <InvoicePreview data={invoiceData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        {!invoiceData.client_name && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <FileText className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Creating Your First Invoice
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Fill in your client's information and select them from your client list</li>
                    <li>Add invoice items with descriptions, quantities, and rates</li>
                    <li>Review the preview to ensure everything looks correct</li>
                    <li>Save as draft to continue later, or send immediately to your client</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </>
      )}
    </div>
  );
};

export default CreateInvoicePage;
