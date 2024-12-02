export const getAiResponse = async ({ city, region }: { city: string; region: string }) => {
  const url = "http://localhost:8000/ai-analysis";

  const data = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ city, region }),
  });

  return data.json();
};
