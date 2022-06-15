import prisma from "../lib/prisma";

const randomQuiz = () => {
  return null;
};

export const getServerSideProps = async () => {
  // fetch every quiz
  const result = await prisma.quiz.findMany({
    select: {
      slug: true,
    },
  });
  // get random quiz
  const randomQuiz = result[Math.floor(Math.random() * result.length)];

  return {
    redirect: {
      destination: randomQuiz && `/quiz/${randomQuiz.slug}`, // redirect to random quiz
      permanent: false,
    },
  };
};
export default randomQuiz;
