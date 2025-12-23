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
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-5">Dashboard</h1>
        <p>Welcome to your admin panel!</p>
      </div>
    </div>
  );
}
