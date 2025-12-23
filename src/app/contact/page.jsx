"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getContact, updateContact } from "../../lib/api";
import Sidebar from "../../components/Sidebar";

export default function ContactAdmin() {
  const router = useRouter();
  const [form, setForm] = useState({ heading: "", subheading: "", btnText: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/"); // redirect to login

    getContact().then((data) => {
      if (data) {
        setForm({
          heading: data.heading || "",
          subheading: data.subheading || "",
          btnText: data.btnText || "",
        });
      }
    });
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await updateContact(form);

      if (data.message) {
        alert("Error: " + data.message);
        return;
      }

      alert("Contact updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update contact. Check console.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 p-10 max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 border-b border-gray-700 pb-4">
          Edit Contact Section
        </h1>

        <form className="grid gap-6" onSubmit={handleSubmit}>
          <input
            name="heading"
            value={form.heading ?? ""}
            onChange={handleChange}
            placeholder="Heading"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <input
            name="subheading"
            value={form.subheading ?? ""}
            onChange={handleChange}
            placeholder="Subheading"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <input
            name="btnText"
            value={form.btnText ?? ""}
            onChange={handleChange}
            placeholder="Button Text"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-300">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
