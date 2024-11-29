export const getComments = async (): Promise<
  { id: number; lat: number; lng: number; content: string }[]
> => {
  const url = "http://localhost:8000/comments";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("コメントデータの取得に失敗しました");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};
