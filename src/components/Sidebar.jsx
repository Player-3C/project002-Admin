"use client";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      <nav className="flex flex-col gap-3">
        <button
          className="text-left p-2 hover:bg-gray-700 rounded"
          onClick={() => router.push("/dashboard")}
        >
          Dashboard
        </button>

        <button
          className="text-left p-2 hover:bg-gray-700 rounded"
          onClick={() => router.push("/contact")}
        >
          Edit Contact
        </button>

        <button
          className="text-left p-2 hover:bg-red-600 rounded mt-auto"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
    </div>
  );
}
