const BASE = process.env.NEXT_PUBLIC_API_URL; // <-- your backend URL

export const getContact = async () => {
  const res = await fetch(`${BASE}/api/contact`);
  return res.json();
};

export const updateContact = async (data) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to update contact");
  }

  return res.json();
};
