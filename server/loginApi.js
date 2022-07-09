import { Router } from "express";
export function LoginApi(mongoDatabase) {
  const router = new Router();

  router.get("/", async (req, res) => {
    let { user } = req.signedCookies;
    let { name } = req.query;

    if (name !== undefined) user = name;

    const userData = await mongoDatabase
      .collection("user")
      .find({ name: user })
      .map(({ name, intro, walk, points, finishedCapsules }) => ({
        name,
        intro,
        walk,
        points,
        finishedCapsules,
      }))
      .limit(1)
      .toArray();

    res.json(userData);
  });

  router.post("/", async (req, res) => {
    const { user, force } = req.body;
    console.log(force);
    if (force === true) {
      res.clearCookie("user");
      res.cookie("user", user, { signed: true });
      res.sendStatus(200);
    } else {
      mongoDatabase.collection("user").insertOne({
        name: user,
        intro: true,
        walk: false,
        points: 0,
        finishedCapsules: [],
      });

      res.clearCookie();
      res.cookie("user", user, { signed: true });
      res.sendStatus(200);
    }
  });

  router.put("/updateuser", (req, res) => {
    const { points, user, finishedCapsules } = req.body;
    console.log(finishedCapsules);
    mongoDatabase.collection("user").updateOne(
      {
        name: user.name,
        finishedCapsules: {
          $ne: finishedCapsules,
        },
      },
      {
        $inc: {
          points: points,
        },
        $push: {
          finishedCapsules: finishedCapsules,
        },
      }
    );
    res.sendStatus(200);
  });

  return router;
}
