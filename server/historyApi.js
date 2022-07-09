import { Router } from "express";

export function HistoryApi(mongoDb) {
  const router = new Router();

  router.get("/", async (req, res) => {
    const history = await mongoDb
      .collection("history")
      .find({})
      .map(({ _id, name, category, story, id }) => ({
        _id,
        name,
        category,
        id,
        story,
      }))
      .toArray();
    res.json(history);
  });

  return router;
}
