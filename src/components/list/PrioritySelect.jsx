import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Grid,
} from "@mui/material";

const PrioritySelect = ({ priority, setPriority }) => {
  const handleChange = (event) => {
    setPriority(event.target.value);
  };

  return (
    <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="priority-select-label">Priority</InputLabel>
      <Select
        labelId="priority-select-label"
        id="priority-select"
        value={priority}
        label="Priority"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={"High"}>High</MenuItem>
        <MenuItem value={"Medium"}>Medium</MenuItem>
        <MenuItem value={"Low"}>Low</MenuItem>
      </Select>
    </FormControl>
  );
};

export default PrioritySelect;
