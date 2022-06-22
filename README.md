# Quiz

Web application that allows you to make your own quiz and take other quizzes. After finishing a quiz you can see how you scored compared to others.

Tech stack: Next, React, Typescript, Prisma and TailwindCSS.

## Run project locally

Create a `.env` file in the root directory of the project. `.env.example` shows an example of the file.
We need to point to a postgres database in order to run the project properly. You can point to a local postgres database or a remote postgres database.
If you want to set up a remote database quickly, you could use a service like [railway](https://railway.app/).

Install all dependencies:

```bash
npm i
# or
yarn
```

After setting the `.env` variable, run the development server:

```bash
npm run dev
# or
yarn dev
```

Push the prisma schema to the database:
```bash
npx prisma db push
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
