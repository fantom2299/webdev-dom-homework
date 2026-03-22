const API_URL = "https://wedev-api.sky.pro/api/v1/nikolay-vasiliev/comments";

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
    body: JSON.stringify({ name, text }),
  });

  const data = await response.json(); // читаем один раз

  if (!response.ok) {
    console.log("Ошибка:", data);
    throw new Error("Ошибка отправки комментария");
  }

  return data;
};
