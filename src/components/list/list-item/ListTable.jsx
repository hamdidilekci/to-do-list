import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import { IconButton, Button } from "@mui/material";
import { useListItems } from "../ListItemsContext.jsx";
import { useBackend } from "../../../backend-context.jsx";

export default function ListTable() {
  const { rows, setRows } = useListItems();

  const backend = useBackend();

  const handleDeleteTask = () => {
    console.log("delete");
  };

  const handleEditTask = () => {
    console.log("edit");
  };

  const toggleStatus = (isCompleted) => {
    console.log("toggle", isCompleted);
  };

  const columns = [
    { field: "title", headerName: "Title", width: 90 },
    { field: "description", headerName: "Description", width: 350 },
    {
      field: "priority",
      headerName: "Priority",
      width: 90,
    },
    {
      field: "category",
      headerName: "Category",
      width: 90,
    },
    {
      field: "status",
      headerName: "Status",
      width: 90,
      renderCell: (params) => (
        <span
          style={{
            color: params.row.completed === true ? "green" : "red",
          }}
        >
          <IconButton
            onClick={() => {
              toggleStatus(params.row.completed);
            }}
          >
            <Brightness1Icon />
          </IconButton>
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 90,
      renderCell: () => {
        return (
          <div>
            <IconButton onClick={handleDeleteTask}>
              <DeleteForeverIcon sx={{ color: "red" }} />
            </IconButton>
            <IconButton onClick={handleEditTask}>
              <EditIcon sx={{ color: "green" }} />
            </IconButton>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    backend.get("todos").then((todos) => {
      todos = todos.map((todo) => {
        return {
          id: todo._id,
          ...todo,
        };
      });

      setRows(todos);
    });
  }, []);

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
      checkboxSelection
    />
  );
}
