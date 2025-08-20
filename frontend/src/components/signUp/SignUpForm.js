import Text from "@/components/ui/Text";
import Email from "@/components/ui/Email";
import Password from "@/components/ui/Password";
import { Button } from "../buttons";

export default function Form({
  step,
  step1Form,
  step2Form,
  handleNext,
  handleSubmit,
  handleBack,
  isLoading,
}) {
  const currentForm = step === 1 ? step1Form : step2Form;
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = currentForm;

  return (
    <>
      {step === 1 && (
        <form onSubmit={handleFormSubmit(handleNext)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Text
              {...register("name")}
              componentclassname={"mb-3"}
              label={"Name*"}
              id="name"
              name="name"
              autoComplete="name"
              error={!!errors.name}
              errormessage={errors.name?.message}
            />
            <Email
              {...register("email")}
              componentclassname={"mb-3"}
              label={"Email*"}
              id="email"
              name="email"
              autoComplete="email"
              error={!!errors.email}
              errormessage={errors.email?.message}
            />
            <Text
              {...register("address")}
              componentclassname={"mb-3"}
              label={"Address*"}
              id="address"
              name="address"
              autoComplete="address"
              error={!!errors.address}
              errormessage={errors.address?.message}
            />
            <Text
              {...register("phone")}
              componentclassname={"mb-3"}
              label={"Phone*"}
              id="phone"
              name="phone"
              autoComplete="phone"
              error={!!errors.phone}
              errormessage={errors.phone?.message}
            />
            <Password
              {...register("password")}
              componentclassname={"mb-3"}
              label={"Password*"}
              id="password"
              name="password"
              autoComplete="new-password"
              error={!!errors.password}
              errormessage={errors.password?.message}
            />
            <Password
              {...register("confirmPassword")}
              componentclassname={"mb-3"}
              label={"Confirm Password*"}
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="new-password"
              error={!!errors.confirmPassword}
              errormessage={errors.confirmPassword?.message}
            />
          </div>
          <div className="flex justify-between mt-8">
            <div></div>
            <Button type="submit">Next</Button>
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleFormSubmit(handleSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Text
              {...register("bank_name")}
              componentclassname={"mb-3"}
              label={"Bank Name*"}
              id="bank_name"
              name="bank_name"
              error={!!errors.bank_name}
              errormessage={errors.bank_name?.message}
            />
            <Text
              {...register("bank_account_number")}
              componentclassname={"mb-3"}
              label={"Account Number*"}
              id="bank_account_number"
              name="bank_account_number"
              error={!!errors.bank_account_number}
              errormessage={errors.bank_account_number?.message}
            />
            <Text
              {...register("bank_account_name")}
              componentclassname={"mb-3"}
              label={"Account Name*"}
              id="bank_account_name"
              name="bank_account_name"
              error={!!errors.bank_account_name}
              errormessage={errors.bank_account_name?.message}
            />
          </div>
          <div className="flex justify-between mt-8">
            <Button type="button" onClick={handleBack}>
              Back
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <span className="space-x-2">
                  Signing Up...
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
                <span>Submit</span>
              )}
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
