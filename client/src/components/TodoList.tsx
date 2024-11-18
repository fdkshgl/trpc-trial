import { CSSProperties } from "react";
import { trpc } from "../utils/trpc";

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "#cba471",
  },
  innerContainer: {
    width: "50%",
    padding: "20px",
    margin: "10px",
    borderRadius: "15px",
    backgroundColor: "#ccd8e1",
    boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
  },
  title: {
    fontSize: "32px",
    color: "#333",
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    padding: "12px 20px",
    margin: "8px 0",
    boxSizing: "border-box",
    borderRadius: "4px",
    border: "none",
    outline: "none",
  },
  list: {
    listStyleType: "none",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between", // コンテンツを両端に寄せる
    alignItems: "center", // 垂直方向中央に配置
    backgroundColor: "#f9f9f9",
    margin: "8px 0",
    padding: "12px",
    borderRadius: "4px",
    textAlign: "left",
  },
  addButton: {
    padding: 10,
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
  deleteButton: {
    marginLeft: "10px",
    cursor: "pointer",
    color: "red",
    textAlign: "right",
  },
};

const TestValue = () => {
  const fetchTestValues = trpc.test.useQuery();
  // console.log("型定義:", typeof fetchTestValues.data?.value)
  // console.log("値:", fetchTestValues.data?.value)
  
  const fetchTodoList = trpc.todoList.useQuery();
  // console.log("fetchTodoList:", fetchTodoList.data)
  // console.log("fetchTodoList:", typeof fetchTodoList.data)

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <p style={styles.title}>問１</p>
        <ul style={styles.list}>
          <li style={styles.listItem}>型：{typeof fetchTestValues.data?.value}</li>
          <li style={styles.listItem}>入力値：{fetchTestValues.data?.value}</li>
        </ul>
      </div>

      <div style={styles.innerContainer}>
      <p style={styles.title}>問２</p>
        <ul style={styles.list}>
          {fetchTodoList.data?.map((todo) => {
            return (
              // 問２に正しい回答を入れるとエラーが消えます
              <div key={todo.id}>
                <li style={styles.listItem}>ID：{typeof todo.id}</li>
                <li style={styles.listItem}>ユーザ名：{typeof todo.user}</li>
                <li style={styles.listItem}>内容：{typeof todo.content}</li>
                <li style={styles.listItem}>作成日時：{typeof todo.createAt}</li>
              </div>
            )
          })}
        </ul>
      </div>
    </div>
  );
};

export default TestValue;