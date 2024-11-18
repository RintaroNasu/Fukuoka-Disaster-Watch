export const getTsunami= async () => {
  const url = "http://localhost:8000/tsunami";

  const data = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data.json();
};


