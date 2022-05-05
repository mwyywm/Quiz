import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

// create a new quiz
export default async function quizHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;
  // title, description, questions (array of questions)
  // questions: { question, answers (array of answers), correctAnswer }
  if (req.method === "POST") {
    try {
      const result = await prisma.quiz.create({
        data: {
          title: body.title,
          description: body.description,
          questions: {
            create: {
              question: "what is the meaning of life?",
              correctAnswer: "ras",
              answers: ["ras", "test", "mus"],
              // need to programmatically generate answers
              // and "question"
            },
          },
        },
      });
      return res.json(result);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  } else {
    return res.status(405).end("Only POST requests are allowed");
  }
}
