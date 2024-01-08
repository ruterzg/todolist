import { Box, Button, MenuItem, TextField } from "@mui/material";

import { DateTimePicker } from "@mui/x-date-pickers";
import { categories } from "../App";

const AddTodo = ({
  category,
  todo,
  handleChange,
  handleAdd,
  date,
  handleDateChange,
  handleCategoryChange,
  handAdd,
  handleCategoryChang,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
      <TextField
        name="todo"
        label="Задача"
        placeholder="Введите задачу"
        value={todo}
        onChange={handleChange}
      />

      <DateTimePicker
        value={date}
        onChange={handleDateChange}
        disablePast={true}
      />
      <TextField
        select
        label="Категория"
        value={category}
        onChange={handleCategoryChange}
      >
        {categories.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </TextField>
      <Button variant="contained" onClick={handleAdd}>
        Добавить задачу
      </Button>
    </Box>
  );
};

export default AddTodo;
