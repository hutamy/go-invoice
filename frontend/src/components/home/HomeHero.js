import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui";
import { useRouter } from "next/router";

export default function HomeHero() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  return (
    <div className="pt-14 py-18 sm:py-16 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Boost your productivity. Start using our invoice generator today.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg/8 text-gray-600">
            Try it for free, no signup required.
          </p>
          {isAuthenticated ? (
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button onClick={() => router.push("/dashboard")}>
                Go to Dashboard
              </Button>
            </div>
          ) : (
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button onClick={() => router.push("/sign-up/")}>
                Sign Up Now
              </Button>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.querySelector("#invoice");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="text-sm/6 font-semibold text-gray-900 cursor-pointer"
              >
                Try for free <span aria-hidden="true">→</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
