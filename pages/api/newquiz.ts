import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import slugify from "../../utils/slugify";

// create a new quiz
export default async function quizHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // title, description, questions (array of objects)
  const body = req.body;
  // questions: { question, correctAnswer, answers (array of answers) }
  // body questions example = [
  //   {
  //     question: "Random question 1",
  //     correctAnswer: "11231223",
  //     answers: ["11231223", "4535236"],
  //   },
  //   {
  //     question: "Random question 2",
  //     correctAnswer: "hi",
  //     answers: ["163623", "456", "hi"],
  //   },
  //   {
  //     question: "Random question 3",
  //     correctAnswer: "4513136",
  //     answers: ["1211233", "4513136"],
  //   },
  // ];
  if (req.method === "POST") {
    try {
      const result = await prisma.quiz.create({
        data: {
          title: body.title,
          slug: slugify(body.title),
          description: body.description,
          questions: {
            createMany: {
              data: body.questions, // array of objects holding questions{question, correctAnswer, answers (array of answers)}
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
