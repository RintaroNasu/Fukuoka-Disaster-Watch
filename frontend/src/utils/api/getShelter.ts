export const getShelter = async () => {
  const url = "http://localhost:8000/shelter";

  const data = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data.json();
};
