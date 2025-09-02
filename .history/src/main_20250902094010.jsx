import React from "react";
import { createRoot } from "react-dom/client";
import TodoList from "./TodoList";

const root = createRoot(document.querySelector(".main"));
root.render(<TodoList />);