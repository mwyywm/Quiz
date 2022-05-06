import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

// create a new quiz
export default async function quizHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;
  let arr = [
    {
      question: "Random question 1",
      correctAnswer: "right",
      answers: ["11231223", "4535236"],
    },
    {
      question: "Random question 2",
      correctAnswer: "123",
      answers: ["163623", "456", "hi"],
    },
    {
      question: "Random question 3",
      correctAnswer: "321",
      answers: ["1211233", "4513136"],
    },
  ];
  // title, description, questions (array of questions)
  // questions: { question, answers (array of answers), correctAnswer }
  if (req.method === "POST") {
    try {
      const result = await prisma.quiz.create({
        data: {
          title: body.title,
          description: body.description,
          questions: {
            createMany: {
              data: arr,
            },
          },
        },
      });
      return res.json(result);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    return res.status(405).end("Only POST requests are allowed");
  }
}
