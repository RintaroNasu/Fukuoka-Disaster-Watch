export const getComments = async (): Promise<
  { id: number; lat: number; lng: number; content: string ,createdAt: string }[]
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

export const postComment = async (lat: number, lng: number, content: string): Promise<boolean> => {
  try {
    const response = await fetch("http://localhost:8000/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lat, lng, content }),
    });

    if (!response.ok) {
      throw new Error("コメントの投稿に失敗しました");
    }

    return true;
  } catch (error) {
    console.error("Error posting comment:", error);
    return false;
  }
};