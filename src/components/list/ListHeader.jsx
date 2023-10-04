import React, { useState } from "react";
import Swal from "sweetalert2";
import { useBackend } from "../../context/backend-context.jsx";
import { useListItems } from "../../context/ListItemsContext.jsx";

import {
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button,
  TextField,
} from "@mui/material";

function ListHeader() {
  // get list items from the comntext
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");

  const { rows, setRows } = useListItems();

  const backend = useBackend();

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPriority("");
    setCategory("");
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Check if any field is empty before submitting
    if (!title || !priority || !category) {
      alert("Please fill in all fields");
      return;
    }

    const formData = {
      title,
      description,
      priority,
      category,
      completed: false,
    };

    // Send a POST request to backend endpoint with the form values
    const response = await backend.post("todos", formData).then((response) => {
      if (response) {
        // Add new todo to the list
        setRows([...rows, { ...response, id: response._id }]);

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Todo item created!",
        });

        resetForm();
      }
    });
  };

  return (
    <FormControl sx={{ display: "flex", marginTop: "40px" }}>
      <Stack sx={{ marginBottom: "20px" }} spacing={2}>
        <TextField
          type="text"
          size="small"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <TextField
          type="text"
          size="small"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
      </Stack>
      <Stack sx={{ marginBottom: "20px" }} spacing={4}>
        {/* PrioritySelect component */}
        <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="priority-select-label">Priority</InputLabel>
          <Select
            labelId="priority-select-label"
            id="priority-select"
            name="priority"
            value={priority}
            label="Priority"
            onChange={(e) => setPriority(e.target.value)}
          >
            <MenuItem value={"High"}>High</MenuItem>
            <MenuItem value={"Medium"}>Medium</MenuItem>
            <MenuItem value={"Low"}>Low</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Stack sx={{ marginBottom: "20px" }}>
        {/* CategorySelect component */}
        <FormControl size="small">
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            name="category"
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value={"Home"}>Home</MenuItem>
            <MenuItem value={"Work"}>Work</MenuItem>
            <MenuItem value={"School"}>School</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Box sx={{ marginBottom: "20px" }}>
        <Button variant="outlined" onClick={handleSubmit}>
          Add Task
        </Button>
      </Box>
    </FormControl>
  );
}

export default ListHeader;
