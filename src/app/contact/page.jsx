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
        // Ensure all fields are defined
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
      // backend sends { message: "error message" }
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
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10 max-w-xl">
        <h1 className="text-2xl font-bold mb-4">Edit Contact Section</h1>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <input
            name="heading"
            value={form.heading ?? ""}
            onChange={handleChange}
            placeholder="Heading"
            className="border p-2"
          />
          <input
            name="subheading"
            value={form.subheading ?? ""}
            onChange={handleChange}
            placeholder="Subheading"
            className="border p-2"
          />
          <input
            name="btnText"
            value={form.btnText ?? ""}
            onChange={handleChange}
            placeholder="Button Text"
            className="border p-2"
          />
          <button className="bg-black text-white py-2">Save</button>
        </form>
      </div>
    </div>
  );
}
