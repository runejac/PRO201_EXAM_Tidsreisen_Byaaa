import { Router } from "express";

export function QuizApi(mongoDb) {
  const router = new Router();

  router.get("/", async (req, res) => {
    const { id } = req.query;
    const correctId = id[0].toUpperCase() + id.slice(1).toLowerCase();
    const quiz = await mongoDb
      .collection("quiz")
      .find({ name_: correctId })
      .map(({ _id, category, question_, answers, name_, id }) => ({
        _id,
        category,
        question_,
        answers,
        name_,
        id,
      }))
      .toArray();
    res.json(quiz);
  });

  return router;
}
