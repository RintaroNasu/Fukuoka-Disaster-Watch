import { Comment, PostComment } from "../type";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getComments = async (): Promise<Comment[]> => {
  const url = `${BASE_URL}/comments`;
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

export const postComment = async (comment: PostComment) => {
  const { lat, lng, content, userId } = comment;
  const url = `${BASE_URL}/comments`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lat, lng, content, userId }),
    });

    if (!response.ok) {
      throw new Error("コメントの投稿に失敗しました");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error posting comment:", error);
    return null;
  }
};

export const deleteComment = async (commentId: number): Promise<boolean> => {
  const url = `${BASE_URL}/comments/${commentId}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    return response.ok;
  } catch (error) {
    console.error("コメント削除中にエラーが発生しました:", error);
    return false;
  }
};
