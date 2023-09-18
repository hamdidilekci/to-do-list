import React, { useState } from "react";
import Swal from "sweetalert2";
import { useBackend } from "../../../backend-context.jsx";

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import PrioritySelect from "../PrioritySelect.jsx";
import CategorySelect from "../CategorySelect.jsx";
import { useListItems } from "../ListItemsContext.jsx";

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
    console.log("formData", formData);
    const response = await backend.post("todos", formData);

    if (response._id) {
      // Add new todo to the list
      setRows([...rows, { ...response, id: response._id }]);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Todo item created!",
      });
      resetForm();
    }
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
        <PrioritySelect priority={priority} setPriority={setPriority} />
      </Stack>
      <Stack sx={{ marginBottom: "20px" }}>
        {/* CategorySelect component */}
        <CategorySelect category={category} setCategory={setCategory} />
      </Stack>
      <Box>
        <Button variant="outlined" onClick={handleSubmit}>
          Add Task
        </Button>
      </Box>
    </FormControl>
  );
}

export default ListHeader;
