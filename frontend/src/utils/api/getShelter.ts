export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getShelter = async () => {
  const url = `${BASE_URL}/shelter`;

  const data = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data.json();
};
