export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getLand = async (searchCities: string) => {
  const url = `${BASE_URL}/land`;

  const data = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ searchCities }),
  });

  return data.json();
};
