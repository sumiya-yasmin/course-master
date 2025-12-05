"use client";

import { useRouter, usePathname } from "next/navigation";
import { Search, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface NavbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export default function Navbar({ searchTerm, onSearchChange }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dashboardUrl, setDashboardUrl] = useState("/student/dashboard");
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (token) {
      setIsLoggedIn(true);
      if (userStr) {
        const user = JSON.parse(userStr);
        setDashboardUrl(
          user.role === "admin" ? "/admin/dashboard" : "/student/dashboard"
        );
      }
    } else {
      setIsLoggedIn(false);
    }
    setIsAuthChecked(true);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    queryClient.clear();
    setIsLoggedIn(false);
    router.push("/");
    router.refresh();
  };
  const isDashboardActive = pathname.includes("/dashboard");

  return (
    <div className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <h1
          className="text-2xl font-bold text-blue-600 cursor-pointer"
          onClick={() => router.push("/")}
        >
          CourseMaster
        </h1>

        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search courses (e.g. React, Design)..."
            className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="flex gap-2 items-center">
          {isAuthChecked &&
            (isLoggedIn ? (
              <>
                <Button
                  onClick={() => router.push(dashboardUrl)}
                  className={`border ${
                    isDashboardActive
                      ? "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200"
                      : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                  }`}
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>

                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => router.push("/login")}>
                  Log In
                </Button>
                <Button onClick={() => router.push("/register")}>
                  Sign Up
                </Button>
              </>
            ))}
        </div>
      </div>
    </div>
  );
}
