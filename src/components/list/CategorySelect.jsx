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

const CategorySelect = ({ category, setCategory }) => {
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <FormControl size="small">
      <InputLabel id="category-select-label">Category</InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        value={category}
        label="Category"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={"Home"}>Home</MenuItem>
        <MenuItem value={"Work"}>Work</MenuItem>
        <MenuItem value={"School"}>School</MenuItem>
      </Select>
    </FormControl>
  );
};

export default CategorySelect;
