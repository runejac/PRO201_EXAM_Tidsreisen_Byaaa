import express from "express";
import * as path from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { MongoClient } from "mongodb";
import { QuizApi } from "./quizApi.js";
import { HistoryApi } from "./historyApi.js";
import { SoundApi } from "./soundApi.js";
import { LoginApi } from "./loginApi.js";
import { UserState } from "./UserState.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//MONGODB//
const mongoClient = new MongoClient(process.env.MONGODB_URL);
await mongoClient.connect().then(async () => {
  console.log("Connected to MongoDB");
  app.use(
    "/api/quiz",
    QuizApi(mongoClient.db(process.env.MONGODB_DATABASE || "quiz_db"))
  );
  app.use(
    "/api/history",
    HistoryApi(mongoClient.db(process.env.MONGODB_DATABASE || "quiz_db"))
  );

  app.use(
    "/api/sound",
    SoundApi(mongoClient.db(process.env.MONGODB_DATABASE || "quiz_db"))
  );

  app.use(
    "/api/login",
    LoginApi(mongoClient.db(process.env.MONGODB_DATABASE || "quiz_db"))
  );

  app.use(
    "/api/update-state",
    UserState(mongoClient.db(process.env.MONGODB_DATABASE || "quiz_db"))
  );
});

app.get("/api/deleteCookie", (req, res) => {
  res.clearCookie("user");
  res.sendStatus(200);
});

app.use(express.static(path.resolve("..", "dist")));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../dist/index.html"));
  } else {
    next();
  }
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Started on http://localhost:${server.address().port}`);
});
