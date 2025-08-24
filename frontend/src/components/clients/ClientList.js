import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Pagination from "../ui/Pagination";

export default function List({
  clients,
  setShowForm,
  setClient,
  setIsEdit,
  handleDelete,
  disabled = false,
  onPageChange,
}) {
  const router = useRouter();
  // Check if clients data is empty
  if (clients?.data?.length == 0) {
    return (
      <div className="mt-6">
        <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
          <div
            className="flex flex-col items-center justify-center py-16 bg-white cursor-pointer"
            onClick={() => router.push("/clients")}
          >
            <div className="mb-4">
              <svg
                width="48"
                height="48"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="mx-auto text-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-700 text-lg mb-1">
                No clients found
              </div>
              <div className="text-gray-500 text-sm">
                You can add a new client on the clients page.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ul
        role="list"
        className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
      >
        {clients?.data?.map((client) => (
          <li
            key={client.id}
            className="overflow-hidden rounded-xl border border-gray-200"
          >
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
              <div className="size-12 flex-none rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg uppercase ring-1 ring-gray-900/10">
                {client.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div className="text-sm/6 font-medium text-gray-900">
                <span>{client.name}</span>
                <div className="text-sm/6 font-medium text-gray-500">
                  <span className="gap-x-1">
                    <EnvelopeIcon className="h-4 w-4 inline-block mr-1" />
                    {client.email}
                  </span>
                </div>
              </div>

              {!disabled && (
                <Menu as="div" className="relative ml-auto">
                  <MenuButton className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500 ring-0 focus:ring-0 focus:outline-none outline-none">
                    <span className="sr-only">Open options</span>
                    <EllipsisHorizontalIcon
                      aria-hidden="true"
                      className="size-5 hover:cursor-pointer"
                    />
                  </MenuButton>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <MenuItem>
                      <a
                        onClick={() => {
                          setClient(client);
                          setShowForm(true);
                          setIsEdit(true);
                        }}
                        className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                      >
                        Edit
                        <span className="sr-only">, {client.name}</span>
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        onClick={() => handleDelete(client.id)}
                        className="block px-3 py-1 text-sm/6 text-red-700 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                      >
                        Delete
                        <span className="sr-only">, {client.name}</span>
                      </a>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              )}
            </div>
            <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm/6 bg-white">
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Phone</dt>
                <dd className="text-gray-700">{client.phone}</dd>
              </div>
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Address</dt>
                <dd className="text-gray-700">{client.address}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
      <Pagination
        page={clients.pagination?.page || 1}
        totalPages={clients.pagination?.total_pages || 1}
        onPageChange={onPageChange}
      />
    </div>
  );
}
