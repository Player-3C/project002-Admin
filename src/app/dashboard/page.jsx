"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/"); // redirect to login
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-10">
        {/* Header */}
        <div className="border-b border-gray-700 pb-4 mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold">Dashboard</h1>
        </div>

        {/* Empty Content Area */}
        <div className="flex items-center justify-center h-[70vh] text-gray-400">
          <p className="text-xl">Select an option from the sidebar to get started</p>
        </div>
      </div>
    </div>
  );
}
