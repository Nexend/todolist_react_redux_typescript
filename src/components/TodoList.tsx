import React, { FC, useEffect, useState } from "react";
import { Input, Row, Spin, Checkbox } from "antd";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { getCookie } from "../utils/cookies";

const TodoList: FC = () => {
  const [event, setEvent] = useState("");
  const [customLoading, setCustomLoading] = useState(false);
  const { todoList, isLoading } = useTypedSelector((state) => state.todo);
  const { getTodoList, createTodo, updateTodo, deleteTodo } = useActions();
  const token = getCookie("token") || "";

  useEffect(() => {
    getTodoList(token);
  }, []);

  const handlerAddEvent = () => {
    if (event) {
      createTodo(event, setCustomLoading, token);
      setEvent("");
    }
  };

  if (isLoading) {
    return (
      <Row justify="center" align="middle" className="h100">
        <Spin tip="Loading..." />
      </Row>
    );
  }
  return (
    <div className="todo-list">
      <Input.Search
        value={event}
        placeholder="Добавьте задачу"
        enterButton="Добавить"
        size="large"
        style={{
          maxWidth: "520px",
          padding: "10px 10px 5px 10px",
          margin: "0 auto",
        }}
        onChange={(e) => setEvent(e.target.value)}
        onSearch={handlerAddEvent}
        loading={customLoading}
      />
      <div className="todo-list__items">
        {todoList.map((todo) => (
          <div key={todo._id} className="todo-list__item">
            <div className="todo-list__descr" style={{ width: "100%" }}>
              <Checkbox
                checked={todo.completed}
                style={{
                  width: "100%",
                  textDecoration: `${todo.completed ? "line-through" : "none"}`,
                }}
                onChange={(e) => updateTodo(todo._id, e.target.checked, token)}
              >
                {todo.description}
              </Checkbox>
            </div>
            <i
              className="far fa-times-circle todo-list__btn"
              onClick={() => deleteTodo(todo._id, token)}
              style={{
                fontSize: "19px",
                cursor: "pointer",
              }}
            ></i>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
