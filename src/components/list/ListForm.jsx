import React, { useState, useEffect, forwardRef } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import { useBackend } from "../../context/backend-context.jsx";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ListForm = forwardRef((props, ref) => {
  const { handleClose, task } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");

  const backend = useBackend();

  // update state when task prop changes
  useEffect(() => {
    setTitle(task.title || "");
    setDescription(task.description || "");
    setPriority(task.priority || "High");
    setCategory(task.category || "Home");
  }, [task.id]);

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
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
    };

    // Send a POST request to backend endpoint with the form values
    const response = await backend.post(`todos/${task.id}`, formData);

    if (response._id) {
      // Add new todo to the list
      handleClose({ ...response, id: response._id });
    }
  };

  return (
    <Box sx={style}>
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
              onChange={handlePriorityChange}
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
              onChange={handleCategoryChange}
            >
              <MenuItem value={"Home"}>Home</MenuItem>
              <MenuItem value={"Work"}>Work</MenuItem>
              <MenuItem value={"School"}>School</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box>
            <Button variant="outlined" onClick={handleSubmit}>
              Update Task
            </Button>
          </Box>
          <Box sx={{ marginLeft: "auto" }}>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Stack>
      </FormControl>
    </Box>
  );
});

export default ListForm;
