export const getLand = async (searchCities: string[]) => {
  const url = "http://localhost:8000/land";

  const data = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ searchCities }),
  });

  return data.json();
};
