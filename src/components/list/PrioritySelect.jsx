import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

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
        name="priority"
        value={priority}
        label="Priority"
        onChange={handleChange}
      >
        <MenuItem value={"High"}>High</MenuItem>
        <MenuItem value={"Medium"}>Medium</MenuItem>
        <MenuItem value={"Low"}>Low</MenuItem>
      </Select>
    </FormControl>
  );
};

export default PrioritySelect;
