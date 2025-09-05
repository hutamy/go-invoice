import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Users, Plus, DollarSign, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { apiService } from '../utils/api.ts';
import type { Invoice, Client, InvoiceSummary } from '../types/index.ts';
import { formatDate } from '../utils/helper.ts';
import Navbar from '../components/Navbar.tsx';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [invoiceSummary, setInvoiceSummary] = useState<InvoiceSummary>({ paid: 0, total_revenue: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [invoicesData, clientsData, summaryData] = await Promise.all([
        apiService.getInvoices(),
        apiService.getClients(),
        apiService.getInvoiceSummary(),
      ]);
      setInvoices(invoicesData);
      setClients(clientsData);
      setInvoiceSummary(summaryData);
    } finally {
      setIsLoading(false);
    }
  };

  const stats = {
    totalInvoices: invoices.length,
    totalAmount: invoiceSummary.total_revenue,
    paidInvoices: invoices.filter(invoice => invoice.status === 'paid').length,
    paidAmount: invoiceSummary.paid,
    pendingAmount: invoiceSummary.total_revenue - invoiceSummary.paid,
    totalClients: clients.length,
  };

  const recentInvoices = invoices
    .filter(invoice => invoice.created_at)
    .sort((a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime())
    .slice(0, 5);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-primary-50/50 to-sky-50/40">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50/50 to-sky-50/40">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold text-primary-900 mb-4 tracking-tight">
            Welcome back, {user?.name}
          </h1>
          <p className="text-xl text-primary-600 font-light">
            Here's an overview of your business activity
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white/70 backdrop-blur-sm border border-primary-200/50 rounded-2xl p-8 hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300 hover:border-sky-300/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-primary-600 mb-2">Total Invoices</p>
                <p className="text-3xl font-bold text-primary-900">{stats.totalInvoices}</p>
              </div>
              <div className="bg-gradient-to-br from-sky-100 to-blue-100 p-4 rounded-2xl border border-sky-200/50">
                <FileText className="h-7 w-7 text-sky-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm border border-primary-200/50 rounded-2xl p-8 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 hover:border-emerald-300/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-primary-600 mb-2">Total Revenue</p>
                <p className="text-3xl font-bold text-primary-900">IDR {stats.totalAmount.toLocaleString()}</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-100 to-green-100 p-4 rounded-2xl border border-emerald-200/50">
                <DollarSign className="h-7 w-7 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm border border-primary-200/50 rounded-2xl p-8 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:border-purple-300/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-primary-600 mb-2">Paid Amount</p>
                <p className="text-3xl font-bold text-primary-900">IDR {stats.paidAmount.toLocaleString()}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-violet-100 p-4 rounded-2xl border border-purple-200/50">
                <TrendingUp className="h-7 w-7 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm border border-primary-200/50 rounded-2xl p-8 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 hover:border-orange-300/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-primary-600 mb-2">Total Clients</p>
                <p className="text-3xl font-bold text-primary-900">{stats.totalClients}</p>
              </div>
              <div className="bg-gradient-to-br from-orange-100 to-amber-100 p-4 rounded-2xl border border-orange-200/50">
                <Users className="h-7 w-7 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary-900 mb-8 tracking-tight">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link
              to="/invoices/create"
              className="group bg-white/70 backdrop-blur-sm border border-primary-200/50 rounded-2xl p-8 hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300 hover:border-sky-300/50"
            >
              <div className="bg-gradient-to-br from-sky-100 to-blue-100 rounded-2xl p-4 w-16 h-16 mb-6 group-hover:from-sky-200 group-hover:to-blue-200 transition-colors border border-sky-200/50">
                <Plus className="h-8 w-8 text-sky-600" />
              </div>
              <h3 className="font-bold text-primary-900 mb-3 text-lg">Create Invoice</h3>
              <p className="text-primary-600 font-light leading-relaxed">Generate a new invoice for your clients</p>
            </Link>
            
            <Link
              to="/clients"
              className="group bg-white/70 backdrop-blur-sm border border-primary-200/50 rounded-2xl p-8 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:border-purple-300/50"
            >
              <div className="bg-gradient-to-br from-purple-100 to-violet-100 rounded-2xl p-4 w-16 h-16 mb-6 group-hover:from-purple-200 group-hover:to-violet-200 transition-colors border border-purple-200/50">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-primary-900 mb-3 text-lg">Manage Clients</h3>
              <p className="text-primary-600 font-light leading-relaxed">Add or edit client information</p>
            </Link>
            
            <Link
              to="/invoices"
              className="group bg-white/70 backdrop-blur-sm border border-primary-200/50 rounded-2xl p-8 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 hover:border-emerald-300/50"
            >
              <div className="bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl p-4 w-16 h-16 mb-6 group-hover:from-emerald-200 group-hover:to-green-200 transition-colors border border-emerald-200/50">
                <FileText className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="font-bold text-primary-900 mb-3 text-lg">View Invoices</h3>
              <p className="text-primary-600 font-light leading-relaxed">Browse and manage all invoices</p>
            </Link>
          </div>
        </div>

        {/* Recent Invoices */}
        {recentInvoices.length > 0 && (
          <div className="mb-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-primary-900 tracking-tight">Recent Invoices</h2>
              <Link 
                to="/invoices" 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold rounded-full transition-all duration-300 shadow-xl shadow-sky-500/25 hover:shadow-2xl hover:shadow-sky-500/30"
              >
                View all
              </Link>
            </div>
            <div className="bg-white/70 backdrop-blur-sm border border-primary-200/50 rounded-3xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-primary-200/50">
                  <thead className="bg-gradient-to-r from-primary-50 to-sky-50/30">
                    <tr>
                      <th className="px-8 py-5 text-left text-xs font-bold text-primary-700 uppercase tracking-wider">
                        Invoice
                      </th>
                      <th className="px-8 py-5 text-left text-xs font-bold text-primary-700 uppercase tracking-wider">
                        Client
                      </th>
                      <th className="px-8 py-5 text-left text-xs font-bold text-primary-700 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-8 py-5 text-left text-xs font-bold text-primary-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-8 py-5 text-left text-xs font-bold text-primary-700 uppercase tracking-wider">
                        Issue Date
                      </th>
                      <th className="px-8 py-5 text-left text-xs font-bold text-primary-700 uppercase tracking-wider">
                        Due Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/50 backdrop-blur-sm divide-y divide-primary-200/30">
                    {recentInvoices.map((invoice) => (
                      <tr key={invoice.id} className="hover:bg-sky-50/50 transition-colors duration-200">
                        <td className="px-8 py-5 whitespace-nowrap text-sm font-semibold text-primary-900">
                          {invoice.invoice_number}
                        </td>
                        <td className="px-8 py-5 whitespace-nowrap text-sm text-primary-800 font-medium">
                          {invoice.client_name}
                        </td>
                        <td className="px-8 py-5 whitespace-nowrap text-sm text-primary-900 font-semibold">
                          IDR {(invoice.total || 0).toLocaleString()}
                        </td>
                        <td className="px-8 py-5 whitespace-nowrap">
                          <span
                            className={`inline-flex px-3 py-2 text-xs font-bold rounded-full ${
                              invoice.status === 'paid'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : invoice.status === 'sent'
                                ? 'bg-sky-100 text-sky-800 border border-sky-200'
                                : 'bg-primary-100 text-primary-800 border border-primary-200'
                            }`}
                          >
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-8 py-5 whitespace-nowrap text-sm text-primary-700 font-medium">
                          {invoice.issue_date ? formatDate(invoice.issue_date) : ''}
                        </td>
                        <td className="px-8 py-5 whitespace-nowrap text-sm text-primary-700 font-medium">
                          {invoice.due_date ? formatDate(invoice.due_date) : ''}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {recentInvoices.length === 0 && (
          <div className="text-center py-20 bg-white/70 backdrop-blur-sm rounded-3xl border border-primary-200/50">
            <div className="bg-gradient-to-br from-sky-100 to-blue-100 rounded-2xl p-6 w-20 h-20 mx-auto mb-8 border border-sky-200/50">
              <FileText className="h-8 w-8 text-sky-600 mx-auto mt-2" />
            </div>
            <h3 className="text-xl font-bold text-primary-900 mb-3">No invoices yet</h3>
            <p className="text-lg text-primary-600 font-light mb-8">Get started by creating your first invoice.</p>
            <div>
              <Link
                to="/invoices/create"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold rounded-full transition-all duration-300 shadow-xl shadow-sky-500/25 hover:shadow-2xl hover:shadow-sky-500/30"
              >
                <Plus className="-ml-1 mr-3 h-5 w-5" />
                Create Invoice
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
