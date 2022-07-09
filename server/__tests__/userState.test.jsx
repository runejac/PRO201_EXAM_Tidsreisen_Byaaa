import express from "express";
import request from "supertest";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { UserState } from "../UserState.js";
import { LoginApi } from "../loginApi.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET));

const mongoDbClient = new MongoClient(process.env.MONGODB_URL);
const database = mongoDbClient.db("test_db");

beforeAll(async () => {
  await mongoDbClient.connect().then(async () => {
    console.log("Connected to MongoDB");
    await database.collection("user").deleteMany({});
    app.use("/api/update-state", UserState(database));
    app.use("/api/login", LoginApi(database));
  });
});
afterAll(() => {
  mongoDbClient.close();
});

describe("UserState", () => {
  it("should update user if walk !== undefined", async () => {
    const user = "notleetboi94";
    const intro = undefined;
    const walk = false;
    const points = 0;
    const finishedCapsules = [];
    const testUser = { user, intro, walk, points, finishedCapsules };

    const name = "notleetboi94";

    await request(app).post("/api/login/").send(testUser).expect(200);
    await request(app).post("/api/update-state").send(testUser);

    expect(
      (
        await request(app).get("/api/login/").query({ name }).expect(200)
      ).body.map(({ walk }) => walk)
    ).toContain(false);
  });

  it("should update user if intro !== undefined", async () => {
    const user = "notleetboi94";
    const intro = true;
    const walk = undefined;
    const points = 0;
    const finishedCapsules = [];
    const testUser = { user, intro, walk, points, finishedCapsules };

    const name = "notleetboi94";

    await request(app).post("/api/login/").send(testUser).expect(200);
    await request(app).post("/api/update-state").send(testUser);

    expect(
      (
        await request(app).get("/api/login/").query({ name }).expect(200)
      ).body.map(({ intro }) => intro)
    ).toContain(true);
  });
});
