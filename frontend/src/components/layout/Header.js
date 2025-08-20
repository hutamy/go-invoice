import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { Navigation } from "@/constants/general/navigations";
import { usePathname } from 'next/navigation';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname()

  return (
    <header className="absolute inset-x-0 top-0 z-10">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8"
      >
        <div className="hidden lg:flex lg:flex-1"></div>
 
        <div className="flex lg:gap-x-12 gap-x-8 lg:max-w-screen max-w-2/3 overflow-x-auto overflow-scroll-x">
          {isAuthenticated &&
            Navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm/6 font-medium text-gray-900 hover:text-indigo-700 hover:cursor-pointer hover:font-semibold ${pathname.startsWith(item.href) ? "text-indigo-600 font-semibold" : ""}`}
              >
                {item.name}
              </a>
            ))}
        </div>
        <div className="flex flex-1 justify-end">
          {isAuthenticated ? (
            <div className="flex flex-1 items-center justify-end gap-x-8">
              <div className="relative">
                <button
                  type="button"
                  className="-m-1.5 p-1.5 cursor-pointer group"
                  onClick={() => setProfileOpen((open) => !open)}
                  aria-haspopup="true"
                  aria-expanded={profileOpen ? "true" : "false"}
                >
                  <span className="flex items-center text-sm/6 font-medium text-gray-700 group-hover:text-indigo-600">
                    <div className="size-10 flex-none rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-md uppercase ring-1 ring-gray-900/10">
                      {user &&
                        user?.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                    </div>
                    <span className="ml-2 text-indigo-600 font-semibold">{user?.name || "User"}</span>
                    {profileOpen ? (
                      <ChevronUpIcon className="h-5 w-5  ml-2" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5 ml-2" />
                    )}
                  </span>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-white py-1 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <a
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </a>
                    <a
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={(e) => {
                        e.preventDefault();
                        logout();
                      }}
                    >
                      Sign out
                    </a>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <a
              href="/sign-in"
              className="text-sm/6 font-semibold text-gray-900 hover:text-indigo-600"
            >
              Sign in <span aria-hidden="true">&rarr;</span>
            </a>
          )}
        </div>
      </nav>
    </header>
  );
}
