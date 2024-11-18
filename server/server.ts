import express from "express";
import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import { date, z } from "zod";

// サーバの設定
const app = express();
const PORT = 5000;
app.use(cors());

const t = initTRPC.create();
const router = t.router;
const publicProcedure = t.procedure;

//----------- 問１ -----------
// 以下の内容を書き換えて、Typeが共有されていることを確認しよう
interface TestTypes {
  value: number;
}
const TestValues: TestTypes = {
  value: 1,
};
//----------- 問２ -----------
// 以下のinterfaceを完成させてエラーを解消してみよう
interface Todo {
  id:number,
  user:string,
  content:string,
  createAt: Date
}

const todoList: Partial<Todo>[] = [
  {
    id: 1,
    user: "tarou",
    content: "プログラミング",
    createAt: new Date(2024, 1, 1),
  }
];

//----------- 問３ -----------
// 以下のrouterに内容を追加し、APIを一から作成してみよう
const appRouter = router({
  test: publicProcedure.query(() => {
    return TestValues;
  }),
  todoList: publicProcedure.query(() => {
    return todoList;
  }),
});

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);
app.listen(PORT);

export type AppRouter = typeof appRouter;