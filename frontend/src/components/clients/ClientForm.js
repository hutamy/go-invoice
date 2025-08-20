import React from "react";
import Text from "@/components/ui/Text";
import Email from "@/components/ui/Email";

export default function Form({
  client,
  handleInputChange,
  handleSubmit,
  errors,
  clearForm,
  setShowForm,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
            <Text
              componentclassname={"mb-3"}
              label={"Name*"}
              value={client.name}
              onChange={handleInputChange}
              id="name"
              name="name"
              autoComplete="name"
              error={errors.name}
              errormessage={errors.name}
            />
            <Email
              componentclassname={"mb-3"}
              label={"Email*"}
              value={client.email}
              onChange={handleInputChange}
              id="email"
              name="email"
              autoComplete="email"
              error={errors.email}
              errormessage={errors.email}
            />
            <Text
              componentclassname={"mb-3"}
              label={"Address*"}
              value={client.address}
              onChange={handleInputChange}
              id="address"
              name="address"
              autoComplete="address"
              error={errors.address}
              errormessage={errors.address}
            />
            <Text
              componentclassname={"mb-3"}
              label={"Phone*"}
              value={client.phone}
              onChange={handleInputChange}
              id="phone"
              name="phone"
              autoComplete="phone"
              error={errors.phone}
              errormessage={errors.phone}
            />
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          onClick={() => {
            clearForm();
            setShowForm(false);
          }}
          className="text-sm/6 font-semibold text-gray-900 cursor-pointer hover:text-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 hover:cursor-pointer"
        >
          Save
        </button>
      </div>
    </form>
  );
}
