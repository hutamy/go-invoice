import Pill from "@/components/ui/Pill";
import clients from "@/pages/clients";
import {
  TrashIcon,
  PencilSquareIcon,
  ArrowDownTrayIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/20/solid";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const statusMapper = {
  paid: "bg-green-50 ring-green-700/10 text-green-700",
  open: "bg-indigo-50 ring-indigo-700/10 text-indigo-700",
  draft: "bg-blue-50 ring-blue-700/10 text-blue-700",
  "past due": "bg-red-50 ring-red-600/10 text-red-700",
};

const statuses = [
  { label: "Open", value: "open" },
  { label: "Paid", value: "paid" },
  { label: "Draft", value: "draft" },
  { label: "Past Due", value: "past due" },
];

export default function InvoiceList({
  invoices,
  handleDeleteInvoice,
  handleDownloadInvoice,
  handleUpdateInvoiceStatus,
  setInvoiceData,
  setShowForm,
  setIsEdit,
  user,
  disabled = false,
}) {
  const [openActionsId, setOpenActionsId] = useState(null);

  return (
    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
      <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Number
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Client
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Issue Date
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Due Date
              </th>
              {!disabled && (
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {invoices.data.map((invoice) => (
              <tr key={invoice.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6 text-sm text-gray-500">
                  {invoice.invoice_number}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {invoice.client_name}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {invoice.client_email}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {invoice.currency} {invoice.total.toLocaleString()}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <Pill
                    label={invoice.status}
                    className={statusMapper[invoice.status]}
                  />
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {new Date(invoice.issue_date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {new Date(invoice.due_date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                {!disabled && (
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6 text-right">
                    <span className="flex justify-end items-center gap-3 relative">
                      <EllipsisVerticalIcon
                        className="h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700"
                        onClick={() =>
                          setOpenActionsId(
                            openActionsId === invoice.id ? null : invoice.id
                          )
                        }
                      />

                      {openActionsId === invoice.id && (
                        <div className="absolute right-0 top-8 z-40 w-48 origin-top-right py-1">
                          <div className="fixed right-15 z-40 w-48 origin-top-right rounded-xl bg-white py-1 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                            <div className="py-1">
                              {statuses
                                .filter(
                                  (status) => status.value !== invoice.status
                                )
                                .map((status) => (
                                  <button
                                    key={status.value}
                                    onClick={() => {
                                      handleUpdateInvoiceStatus(
                                        invoice.id,
                                        status.value
                                      );
                                      setOpenActionsId(null);
                                    }}
                                    className="flex w-full items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer hover:text-semibold hover:text-gray-900"
                                  >
                                    <PencilIcon className="h-4 w-4 mr-2" />
                                    Mark as {status.label}
                                  </button>
                                ))}
                              <button
                                onClick={() => {
                                  handleDownloadInvoice(invoice.id);
                                  setOpenActionsId(null);
                                }}
                                className="flex w-full items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer hover:text-semibold hover:text-gray-900"
                              >
                                <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                                Download
                              </button>

                              <button
                                onClick={() => {
                                  setShowForm(true);
                                  setIsEdit(true);
                                  setInvoiceData({
                                    invoice: {
                                      id: invoice.id,
                                      invoice_number: invoice.invoice_number,
                                      client_id: invoice.client_id,
                                      issue_date: new Date(invoice.issue_date)
                                        .toISOString()
                                        .split("T")[0],
                                      due_date: new Date(invoice.due_date)
                                        .toISOString()
                                        .split("T")[0],
                                      currency: invoice.currency,
                                      items: invoice.items || [],
                                      subtotal: invoice.subtotal,
                                      tax_rate: invoice.tax_rate,
                                      tax: invoice.tax,
                                      total: invoice.total,
                                      notes: invoice.notes,
                                    },
                                    user: {
                                      name: user.name || "",
                                      address: user.address || "",
                                      email: user.email || "",
                                      phone: user.phone || "",
                                      bank_name: user.bank_name || "",
                                      bank_account_name:
                                        user.bank_account_name || "",
                                      bank_account_number:
                                        user.bank_account_number || "",
                                    },
                                    client: {
                                      search: invoice.client_name || "",
                                      id: invoice.client_id,
                                      name: invoice.client_name || "",
                                      address: invoice.client_address || "",
                                      email: invoice.client_email || "",
                                      phone: invoice.client_phone || "",
                                      dropdownOpen: false,
                                    },
                                  });
                                }}
                                className="flex w-full items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer hover:text-semibold hover:text-gray-900"
                              >
                                <PencilSquareIcon className="h-5 w-5 mr-2" />
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  handleDeleteInvoice(invoice.id);
                                  setOpenActionsId(null);
                                }}
                                className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer hover:text-semibold hover:text-red-800"
                              >
                                <TrashIcon className="h-5 w-5 mr-2" />
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </span>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
