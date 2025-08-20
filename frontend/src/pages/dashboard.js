import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import ClientList from "@/components/clients/ClientList";
import { getClients } from "@/api/clientApi";
import { getInvoices, invoiceSummary } from "@/api/invoiceApi";
import InvoiceList from "@/components/invoice/InvoiceList";
import { classNames } from "@/lib/helper";
import { withAuth } from "@/components/withAuth";
import { Cards } from "@/constants/dashboard";
import { data } from "autoprefixer";

function Dashboard() {
  const [clients, setClients] = useState({
    data: [],
    pagination: {
      page: 1,
      page_size: 10,
      total_items: 0,
      total_pages: 0,
    },
  });
  const [invoices, setInvoices] = useState({
    data: [],
    pagination: {
      page: 1,
      page_size: 10,
      total_items: 0,
      total_pages: 0,
    },
  });
  const [summary, setSummary] = useState([]);

  async function fetchClients() {
    try {
      const response = await getClients();
      setClients(response.data);
    } catch (error) {
      console.error("Failed to fetch clients:", error);
    }
  }

  async function fetchInvoices() {
    try {
      const response = await getInvoices();
      setInvoices(response.data);
    } catch (error) {
      console.error("Failed to fetch invoices:", error);
    }
  }

  async function fetchSummary() {
    try {
      const response = await invoiceSummary();
      setSummary(response);
    } catch (error) {
      console.error("Failed to fetch invoice summary:", error);
    }
  }

  useEffect(() => {
    fetchClients();
    fetchInvoices();
    fetchSummary();
  }, []);

  return (
    <div>
      <div className="bg-white h-20 border-b border-gray-900/10 px-6 lg:px-8 flex-shrink-0">
        <Header />
      </div>
      <main>
        <div className="relative isolate overflow-hidden">
          {/* Stats */}
          <div className="border-b border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5">
            <dl className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-3 lg:px-2 xl:px-0">
              {Cards.map((stat, statIdx) => (
                <div
                  key={statIdx}
                  className={classNames(
                    statIdx % 2 === 1
                      ? "sm:border-l"
                      : statIdx === 2
                      ? "lg:border-l"
                      : "",
                    "flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8"
                  )}
                >
                  <dt className="text-sm/6 font-medium text-gray-500 capitalize">
                    {stat.label}
                  </dt>
                  <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">
                    {summary.currency} {summary[stat.key]?.toLocaleString()}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div
            aria-hidden="true"
            className="absolute left-0 top-full -z-10 mt-96 origin-top-left translate-y-40 -rotate-90 transform-gpu opacity-20 blur-3xl sm:left-1/2 sm:-ml-96 sm:-mt-10 sm:translate-y-0 sm:rotate-0 sm:transform-gpu sm:opacity-50"
          >
            <div
              style={{
                clipPath:
                  "polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)",
              }}
              className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-[#6e42fc] to-[#fcee08]"
            />
          </div>
        </div>

        <div className="space-y-16 py-16 xl:space-y-20">
          <div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
              <h2 className="mx-auto max-w-2xl text-base font-semibold text-gray-900 lg:mx-0 lg:max-w-none">
                Invoice list
              </h2>
              <a
                href="/invoices"
                className="text-sm/6 font-medium text-indigo-500 hover:text-indigo-600 hover:font-semibold"
              >
                Manage invoices
              </a>
            </div>
            <div className="mt-6 overflow-hidden">
              <div className="mx-auto max-w-7xl ">
                <InvoiceList invoices={invoices} disabled={true} />
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              <div className="flex items-center justify-between">
                <h2 className="text-base/7 font-semibold text-gray-900">
                  Client list
                </h2>
                <a
                  href="/clients"
                  className="text-sm/6 font-medium text-indigo-500 hover:text-indigo-600 hover:font-semibold"
                >
                  Manage clients
                </a>
              </div>
              <ClientList clients={clients} disabled={true} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default withAuth(Dashboard);
