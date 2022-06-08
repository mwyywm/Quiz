import assert from "assert";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;
  if (req.method === "GET") {
    const result = await prisma.quiz.findUnique({
      where: {
        slug: slug as string,
      },
      select: {
        id: true,
        title: true,
        description: true,
        questions: {
          select: {
            id: true,
            question: true,
            correctAnswer: true,
            answers: true,
          },
        },
      },
    });
    return res.json(result);
  } else if (req.method === "POST") {
    // TODO: Implement POST answers.
    const { questions } = req.body;
    const resultGET = await prisma.quiz.findUnique({
      where: {
        slug: slug as string,
      },
      select: {
        questions: {
          select: {
            id: true,
            correctAnswer: true,
          },
        },
      },
    });
    let correctAnswers = 0;
    let totalAnswers = resultGET?.questions?.length;
    let score = 0; // Percentage of correct answers.
    for (const questionID in questions) {
      const question = resultGET?.questions.find(
        (q) => q.id.toString() == questionID
      );

      if (question?.correctAnswer === questions[questionID]) {
        correctAnswers++;
        totalAnswers && (score += 1 / totalAnswers);
      }
    }

    return res.json({
      score: score,
      correct: correctAnswers,
      total: totalAnswers,
    });
  }
}
