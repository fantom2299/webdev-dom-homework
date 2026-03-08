import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

// Разрешаем запросы с фронтенда (CORS)
app.use(cors());
app.use(express.json());

// Начальные комментарии
let comments = [
  {
    id: 1,
    author: { name: "Глеб Фокин" },
    date: "2022-02-12T12:18:00.000Z",
    text: "Это будет первый комментарий на этой странице",
    likes: 3,
  },
  {
    id: 2,
    author: { name: "Варвара Н." },
    date: "2022-02-13T19:22:00.000Z",
    text: "Мне нравится как оформлена эта страница! ❤",
    likes: 75,
  },
];

let nextId = 3;

// GET /comments — получить все комментарии
app.get("/comments", (req, res) => {
  res.json({ comments });
});

// POST /comments — добавить новый комментарий
app.post("/comments", (req, res) => {
  const { name, text } = req.body;

  if (!name || !text) {
    return res.status(400).json({ error: "Поля name и text обязательны" });
  }

  const newComment = {
    id: nextId++,
    author: { name },
    date: new Date().toISOString(),
    text,
    likes: 0,
  };

  comments.push(newComment);

  res.status(201).json(newComment);
});

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
