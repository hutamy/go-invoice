import Header from "@/components/layout/Header";
import { classNames } from "@/lib/helper";
import { useAuth } from "@/contexts/AuthContext";
import { withAuth } from "@/components/withAuth";
import Text from "@/components/ui/Text";
import Email from "@/components/ui/Email";
import { useState } from "react";
import Toast from "@/components/ui/Toast";
import { Navigation } from "@/constants/settings";

function Settings() {
  const { user, updateUser } = useAuth();
  const [currrentUser, setCurrentUser] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    bank_name: user?.bank_name || "",
    bank_account_name: user?.bank_account_name || "",
    bank_account_number: user?.bank_account_number || "",
  });
  const [error, setError] = useState({});
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const validate = () => {
    let errs = {};
    if (!currrentUser.name) errs.name = "Name is required";
    if (!currrentUser.email) errs.email = "Email is required";
    if (!currrentUser.phone) errs.phone = "Phone number is required";
    if (!currrentUser.address) errs.address = "Address is required";
    if (!currrentUser.bank_name) errs.bank_name = "Bank name is required";
    if (!currrentUser.bank_account_name)
      errs.bank_account_name = "Bank account name is required";
    if (!currrentUser.bank_account_number)
      errs.bank_account_number = "Bank account number is required";
    setError(errs);
    return Object.keys(errs).length === 0;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError({});
    if (!validate()) return;
    try {
      await updateUser(currrentUser);
      setIsError(false);
      setMessage("Settings updated successfully!");
    } catch (err) {
      console.error("Failed to update settings:", err);
      setIsError(true);
      setMessage("Failed to update settings. Please try again.");
    }
  }

  return (
    <>
      <div className="bg-white h-20 border-b border-gray-900/10 px-6 lg:px-8 flex-shrink-0">
        <Header />
      </div>
      <main>
        {message && (
          <Toast
            title={isError ? "Error" : "Success"}
            message={message}
            isError={isError}
            setMessage={setMessage}
          />
        )}
        <div className="mx-auto max-w-7xl lg:flex lg:px-8 gap-x-16">
          <h1 className="sr-only">General Settings</h1>
          <aside className="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
            <nav className="flex-none px-4 sm:px-6 lg:px-0">
              <ul
                role="list"
                className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col"
              >
                {Navigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-50 text-blue-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-blue-500",
                        "group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm/6 font-medium"
                      )}
                    >
                      <item.icon
                        aria-hidden="true"
                        className={classNames(
                          item.current
                            ? "text-blue-600"
                            : "text-gray-400 group-hover:text-blue-600",
                          "size-6 shrink-0"
                        )}
                      />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <form
            className="mx-auto my-8 lg:my-20 w-full"
            onSubmit={handleSubmit}
          >
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm/6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <Text
                    componentclassname="sm:col-span-4"
                    label="Name"
                    value={currrentUser.name}
                    onChange={(e) =>
                      setCurrentUser({
                        ...currrentUser,
                        name: e.target.value,
                      })
                    }
                    id="name"
                    name="name"
                    errormessage={error.name}
                    error={!!error.name}
                  />
                  <Email
                    componentclassname="sm:col-span-4"
                    label="Email address"
                    value={currrentUser.email}
                    onChange={(e) =>
                      setCurrentUser({
                        ...currrentUser,
                        email: e.target.value,
                      })
                    }
                    id="email"
                    name="email"
                    errormessage={error.email}
                    error={!!error.email}
                  />
                  <Text
                    componentclassname="sm:col-span-4"
                    label="Phone"
                    value={currrentUser.phone}
                    onChange={(e) =>
                      setCurrentUser({
                        ...currrentUser,
                        phone: e.target.value,
                      })
                    }
                    id="phone"
                    name="phone"
                    errormessage={error.phone}
                    error={!!error.phone}
                  />

                  <Text
                    componentclassname="sm:col-span-4"
                    label="Address"
                    value={currrentUser.address}
                    onChange={(e) =>
                      setCurrentUser({
                        ...currrentUser,
                        address: e.target.value,
                      })
                    }
                    id="address"
                    name="address"
                    errormessage={error.address}
                    error={!!error.address}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-12 mt-10">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900">
                  Bank Accounts
                </h2>
                <p className="mt-1 text-sm/6 text-gray-600">
                  Connect bank accounts to your account.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <Text
                    componentclassname="sm:col-span-4"
                    label="Bank Name"
                    value={currrentUser.bank_name}
                    onChange={(e) =>
                      setCurrentUser({
                        ...currrentUser,
                        bank_name: e.target.value,
                      })
                    }
                    id="bank_name"
                    name="bank_name"
                    errormessage={error.bank_name}
                    error={!!error.bank_name}
                  />
                  <Text
                    componentclassname="sm:col-span-4"
                    label="Bank Account Name"
                    value={currrentUser.bank_account_name}
                    onChange={(e) =>
                      setCurrentUser({
                        ...currrentUser,
                        bank_account_name: e.target.value,
                      })
                    }
                    id="bank_account_name"
                    name="bank_account_name"
                    errormessage={error.bank_account_name}
                    error={!!error.bank_account_name}
                  />
                  <Text
                    componentclassname="sm:col-span-4"
                    label="Bank Account Number"
                    value={currrentUser.bank_account_number}
                    onChange={(e) =>
                      setCurrentUser({
                        ...currrentUser,
                        bank_account_number: e.target.value,
                      })
                    }
                    id="bank_account_number"
                    name="bank_account_number"
                    errormessage={error.bank_account_number}
                    error={!!error.bank_account_number}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default withAuth(Settings);
