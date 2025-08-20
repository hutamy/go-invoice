import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import Toast from "@/components/ui/Toast";
import { SignUpForm, SignUpSteps } from "@/components/signUp";
import { SignUpStep1, SignUpStep2 } from "@/schema/SignUp";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signUp } = useAuth();

  // Form for step 1 (user info)
  const step1Form = useForm({
    resolver: yupResolver(SignUpStep1),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Form for step 2 (bank info)
  const step2Form = useForm({
    resolver: yupResolver(SignUpStep2),
    mode: "onChange",
    defaultValues: {
      bank_name: "",
      bank_account_number: "",
      bank_account_name: "",
    },
  });

  const handleNext = async (data) => {
    // Step 1 data is valid, move to step 2
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Combine data from both forms
      const step1Data = step1Form.getValues();
      const completeData = { ...step1Data, ...data };

      await signUp(completeData);
      router.push("/dashboard");
    } catch (err) {
      setError("Registration failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-yellow-50"
        style={{ zIndex: -2 }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-10"
        style={{
          zIndex: -1,
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(147, 51, 234, 0.05) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.03) 0%, transparent 50%)`,
        }}
      />
      <div className="h-20 px-6 lg:px-8 flex-shrink-0">
        <div className="flex items-center h-full justify-start space-x-4">
          <a
            href="/"
            className="text-sm/6 font-semibold text-gray-900 hover:text-blue-700"
          >
            <span aria-hidden="true" className="mr-2">
              &larr;
            </span>{" "}
            Home
          </a>
        </div>
      </div>
      {error && (
        <Toast
          title="Sign Up Error"
          message={error}
          setMessage={setError}
          isError={true}
        />
      )}
      <div className="flex flex-col my-10 items-center justify-center">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">
            Let's get you started
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Already have an account?{" "}
            <a
              href="/sign-in"
              className="font-semibold text-blue-600 hover:text-blue-500"
            >
              Sign in
            </a>
          </p>
          <SignUpSteps step={step} />
          <SignUpForm
            step={step}
            step1Form={step1Form}
            step2Form={step2Form}
            handleNext={handleNext}
            handleBack={handleBack}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
