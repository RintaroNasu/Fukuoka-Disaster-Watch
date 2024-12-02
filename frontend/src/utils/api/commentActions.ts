import { Comment, PostComment } from "../type";

export const getComments = async (): Promise<Comment[]> => {
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

export const postComment = async (comment: PostComment) => {
  const { lat, lng, content, userId } = comment;
  try {
    const response = await fetch("http://localhost:8000/comments", {
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
  try {
    const response = await fetch(`http://localhost:8000/comments/${commentId}`, {
      method: "DELETE",
    });
    return response.ok;
  } catch (error) {
    console.error("コメント削除中にエラーが発生しました:", error);
    return false;
  }
};
