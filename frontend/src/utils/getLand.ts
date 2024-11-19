export const getLand= async () => {
  const url = "http://localhost:8000/land";

  const data = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data.json();
};


