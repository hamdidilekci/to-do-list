import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { Stack } from "@mui/material";
import PrioritySelect from "../PrioritySelect.jsx";
import CategorySelect from "../CategorySelect.jsx";
import { useBackend } from "../../../backend-context.jsx";

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

const BasicModal = ({ open, handleClose, task }) => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [priority, setPriority] = useState();
  const [category, setCategory] = useState();

  const backend = useBackend();

  // update state when task prop changes
  useEffect(() => {
    setTitle(task.title || "");
    setDescription(task.description || "");
    setPriority(task.priority || "High");
    setCategory(task.category || "Home");
  }, [task.id]);

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
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
              <PrioritySelect priority={priority} setPriority={setPriority} />
            </Stack>
            <Stack sx={{ marginBottom: "20px" }}>
              {/* CategorySelect component */}
              <CategorySelect category={category} setCategory={setCategory} />
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
      </Modal>
    </div>
  );
};

export default BasicModal;
