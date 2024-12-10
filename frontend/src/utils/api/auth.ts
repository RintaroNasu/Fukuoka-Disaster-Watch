export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const signUp = async (body: { email: string; password: string }) => {
  const url = `${BASE_URL}/auth/signup`;

  const data = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data.json();
};

export const signIn = async (body: { email: string; password: string }) => {
  const url = `${BASE_URL}/auth/signin`;

  const data = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data.json();
};
