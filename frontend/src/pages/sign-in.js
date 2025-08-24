import React, { useState } from "react";
import Toast from "@/components/ui/Toast";
import { SignInForm } from "@/components/signIn";

export default function SignIn() {
  const [error, setError] = useState("");

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
            className="text-sm/6 font-semibold text-gray-900 hover:text-indigo-700"
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
          title="Sign In Error"
          message={error}
          setMessage={setError}
          isError={true}
        />
      )}
      <div className="flex flex-col min-h-[90vh] items-center justify-center">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">
            Sign in to your account
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Not a member?{" "}
            <a
              href="/sign-up"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Sign up now
            </a>
          </p>
          <SignInForm setError={setError} />
        </div>
      </div>
    </div>
  );
}
