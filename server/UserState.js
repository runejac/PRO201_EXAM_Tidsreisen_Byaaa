import { Router } from "express";

export function UserState(mongoDatabase) {
  const router = new Router();

  router.post("/", async (req, res) => {
    const { user, intro, walk } = req.body;

    console.log(req.body);

    if (walk !== undefined) {
      await mongoDatabase
        .collection("user")
        .updateOne({ name: user }, { $set: { walk: walk } });
      res.sendStatus(200);
    }
    if (intro !== undefined) {
      await mongoDatabase
        .collection("user")
        .updateOne({ name: user }, { $set: { intro: intro } });
      res.sendStatus(200);
    }
  });

  return router;
}
