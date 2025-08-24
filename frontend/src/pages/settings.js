import { classNames } from "@/lib/helper";
import { useAuth } from "@/contexts/AuthContext";
import { withAuth } from "@/components/withAuth";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Navigation } from "@/constants/settings";
import { Text, Email, Toast, Button, Header } from "@/components/ui";
import { UserSettingsSchema } from "@/schema/Settings";

function Settings() {
  const { user, updateUser } = useAuth();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(UserSettingsSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      bank_name: "",
      bank_account_name: "",
      bank_account_number: "",
    },
  });

  // Reset form when user data changes
  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        bank_name: user.bank_name || "",
        bank_account_name: user.bank_account_name || "",
        bank_account_number: user.bank_account_number || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (formData) => {
    try {
      await updateUser(formData);
      setIsError(false);
      setMessage("Settings updated successfully!");
    } catch (err) {
      console.error("Failed to update settings:", err);
      setIsError(true);
      setMessage("Failed to update settings. Please try again.");
    }
  };

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
                          ? "bg-gray-50 text-indigo-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-indigo-500",
                        "group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm/6 font-medium"
                      )}
                    >
                      <item.icon
                        aria-hidden="true"
                        className={classNames(
                          item.current
                            ? "text-indigo-600"
                            : "text-gray-400 group-hover:text-indigo-600",
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
            onSubmit={handleSubmit(onSubmit)}
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
                    {...register("name")}
                    errormessage={errors.name?.message}
                    error={!!errors.name}
                  />
                  <Email
                    componentclassname="sm:col-span-4"
                    label="Email address"
                    {...register("email")}
                    errormessage={errors.email?.message}
                    error={!!errors.email}
                  />
                  <Text
                    componentclassname="sm:col-span-4"
                    label="Phone"
                    {...register("phone")}
                    errormessage={errors.phone?.message}
                    error={!!errors.phone}
                  />

                  <Text
                    componentclassname="sm:col-span-4"
                    label="Address"
                    {...register("address")}
                    errormessage={errors.address?.message}
                    error={!!errors.address}
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
                    {...register("bank_name")}
                    errormessage={errors.bank_name?.message}
                    error={!!errors.bank_name}
                  />
                  <Text
                    componentclassname="sm:col-span-4"
                    label="Bank Account Name"
                    {...register("bank_account_name")}
                    errormessage={errors.bank_account_name?.message}
                    error={!!errors.bank_account_name}
                  />
                  <Text
                    componentclassname="sm:col-span-4"
                    label="Bank Account Number"
                    {...register("bank_account_number")}
                    errormessage={errors.bank_account_number?.message}
                    error={!!errors.bank_account_number}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="space-x-2">
                    Saving...
                    <span className="inline-block mx-2 align-middle">
                      <span
                        style={{
                          display: "inline-block",
                          width: "20px",
                          height: "20px",
                          border: "3px solid #ccc",
                          borderTop: "3px solid #333",
                          borderRadius: "50%",
                          animation: "spin 0.8s linear infinite",
                        }}
                      />
                      <style>
                        {`@keyframes spin { 100% { transform: rotate(360deg); } }`}
                      </style>
                    </span>
                  </span>
                ) : (
                  <span>Save</span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default withAuth(Settings);
