export const getPolygon = async () => {
  const url = "http://localhost:8000/polygon";

  const data = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data.json();
};


