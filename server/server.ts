import express from "express";
import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import { z } from "zod";

const app = express();
const PORT = 5000;
app.use(cors());

// app.get("/", (req: any, res: any) => res.send("Hello"));

const t = initTRPC.create();
const router = t.router;
const publicProcedure = t.procedure;

interface Todo {
  id: string,
  content: string
}

const todoList:Todo[] = [
  {
    id: "1",
    content: "散歩"
  },
  {
    id: "2",
    content: "プログラミング"
  },
];

const appRouter = router({
  test: publicProcedure.query(() => {
    return "TEST TRPC";
  }),
  getTodos: publicProcedure.query(()=>{
    return todoList;
  }),
  addTodo: publicProcedure.input(z.string()).mutation((req)=>{
    const id = `${Math.random()}`;
    const todo = {
      id, 
      content:req.input
    };
    todoList.push(todo);
    return todoList;
  }),
  deleteTodo: publicProcedure.input(z.string()).mutation((req)=>{
    const idTodoDelete = req.input; 
    const indexToDelete = todoList.findIndex(
      (todo) => todo.id === idTodoDelete
    );

    todoList.splice(indexToDelete, 1);
    return todoList;
  }),
});

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
)
app.listen(PORT);

export type AppRouter = typeof appRouter;