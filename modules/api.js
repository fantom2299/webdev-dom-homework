const API_URL = "http://localhost:3001/comments";

export const getComments = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Ошибка загрузки комментариев");
  }

  return response.json();
};

export const postComment = async (name, text) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, text }),
  });

  if (!response.ok) {
    throw new Error("Ошибка отправки комментария");
  }

  return response.json();
};