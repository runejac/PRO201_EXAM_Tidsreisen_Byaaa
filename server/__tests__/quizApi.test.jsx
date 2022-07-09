import express from "express";
import request from "supertest";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { QuizApi } from "../quizApi.js";

const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

const mongoDbClient = new MongoClient(process.env.MONGODB_URL);
const database = mongoDbClient.db("test_db");

beforeAll(async () => {
  await mongoDbClient.connect();
  console.log("Connected to MongoDB");
  await database.collection("quiz").insertOne({
    category: "Quizkapsel",
    question_: "Hva er en test?",
    name_: "Test-quiz",
    answers: [
      {
        answer: "Dette er en test",
        isCorrect: true,
      },
      {
        answer: "Dette er ikke en test",
        isCorrect: false,
      },
    ],
  });
  app.use("/api/quiz", QuizApi(database));
});
afterAll(async () => {
  await mongoDbClient.connect().then(async () => {
    await database.collection("quiz").deleteMany({});
    app.use("/api/quiz", QuizApi(database));
  });
  mongoDbClient.close();
});

describe("QuizApi", () => {
  it("should get quiz capsule from database", async () => {
    const id = "Test-quiz";

    expect(
      (await request(app).get("/api/quiz/").query({ id }).expect(200)).body.map(
        ({ name_ }) => name_
      )
    ).toContain(id);
  });
});
