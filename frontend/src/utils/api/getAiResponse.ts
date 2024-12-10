export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAiResponse = async ({ city, region }: { city: string; region: string }) => {
  const url = `${BASE_URL}/ai-analysis`;

  const data = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ city, region }),
  });

  return data.json();
};
