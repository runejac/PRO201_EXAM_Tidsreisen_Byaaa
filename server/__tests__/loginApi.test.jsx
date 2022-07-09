import express from "express";
import request from "supertest";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { LoginApi } from "../loginApi.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cookieParser("test secret"));

const mongoDbClient = new MongoClient(process.env.MONGODB_URL);

beforeAll(async () => {
  await mongoDbClient.connect();
  const database = mongoDbClient.db("test_db");
  console.log("Connected to MongoDB");
  await database.collection("user").deleteMany({});
  app.use("/api/login", LoginApi(database));
});
afterAll(async () => {
  await mongoDbClient.close();
});

describe("LoginApi", () => {
  it("should add a user", async () => {
    const user = "leetboi94";
    const intro = true;
    const walk = false;
    const points = 0;
    const finishedCapsules = [];
    const testUser = { user, intro, walk, points, finishedCapsules };

    const name = "leetboi94";

    await request(app);
    await request(app).post("/api/login/").send(testUser).expect(200);

    expect(
      (
        await request(app).get("/api/login/").query({ name }).expect(200)
      ).body.map(({ name }) => name)
    ).toContain(user);
  });

  it("should update user by adding finished capsule", async () => {
    let user = "leetboi94";
    const intro = true;
    const walk = false;
    let points = 0;
    let finishedCapsules = [];
    let testUser = { user, intro, walk, points, finishedCapsules };

    await request(app);
    await request(app).post("/api/login/").send(testUser).expect(200);

    testUser.points = 100;
    testUser.finishedCapsules = [
      {
        id: 2,
        name: "Kvernhus",
        category: "Historiekapsel",
      },
    ];

    await request(app);
    await request(app).put("/api/login/updateuser/").send(testUser).expect(200);

    const name = "leetboi94";

    expect(
      (
        await request(app).get("/api/login/").query({ name }).expect(200)
      ).body.map(({ finishedCapsules }) => finishedCapsules)
    ).toContainEqual(finishedCapsules);
  });

  it("should not update user, capsule already done", async () => {
    let user = "leetboi94";
    const intro = true;
    const walk = false;
    let points = 0;
    let finishedCapsules = [
      {
        id: 2,
        name: "Kvernhus",
        category: "Historiekapsel",
      },
    ];
    let testUser = { user, intro, walk, points, finishedCapsules };

    await request(app);
    await request(app).post("/api/login/").send(testUser).expect(200);

    testUser.points = 100;
    testUser.finishedCapsules = [
      {
        id: 2,
        name: "Kvernhus",
        category: "Historiekapsel",
      },
    ];

    await request(app);
    await request(app).put("/api/login/updateuser/").send(testUser).expect(200);

    const name = "leetboi94";

    expect(
      (
        await request(app).get("/api/login/").query({ name }).expect(200)
      ).body.map(({ finishedCapsules }) => finishedCapsules).length
    ).toBe(1);
  });
});
