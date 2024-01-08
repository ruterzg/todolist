import { Box } from "@mui/material";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";

export const categories = ["работа", "личное", "быт", "Образование"];

function App() {
  const [todo, setTodo] = useState("");
  const [date, setDate] = useState(null);
  const [todos, setTodos] = useState([]);
  const [category, setCategory] = useState("");

  const handleChange = (event) => {
    setTodo(event.target.value);
  };

  const handleDateChange = (newValue) => {
    setDate(newValue);
  };

  const handleCategoryChange = (event) => {
    setDate(event.target.value);
  };

  const handleRateChange = (value, id) => {
    const filterTodos = todos.filter((item) => item.id !== id);
    const foundTodo = todos.find((item) => item.id === id);

    const newTodo = {
      ...foundTodo,
      rate: value,
    };

    setTodos([newTodo, ...filterTodos]);
  };

  const handleAdd = () => {
    setTodos((prevState) => {
      const newTodo = {
        name: todo,
        id: uuidv4(),
        isDone: false,
        deadLine: date,
        rate: 1,
        category: category,
      };

      return [newTodo, ...prevState];
    });

    setTodo("");
    setDate(null);
    setCategory("");
  };

  useEffect(() => {
    if (todos.length !== 0) {
      localStorage.setItem("__todolist", JSON.stringify(todos));
    } else {
      const todoInLS = JSON.parse(localStorage.getItem("__todolist"));
      setTodos(todoInLS || []);
    }
  }, [todos]);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          rowGap: "20px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <AddTodo
            todo={todo}
            date={date}
            handleDateChange={handleDateChange}
            handleChange={handleChange}
            handleAdd={handleAdd}
            category={category}
            handleCategoryChange={handleCategoryChange}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Todos
            title="Todos"
            todos={todos.filter((item) => item.isDone === false)}
            handleRateChange={handleRateChange}
            handleChange={handleRateChange}
          />
          <Todos
            handleRateChange={handleRateChange}
            handleChange={handleRateChange}
            title="Done Todos"
            todos={todos.filter((item) => item.isDone === true)}
          />
        </Box>
      </Box>
    </LocalizationProvider>
  );
}

export default App;
