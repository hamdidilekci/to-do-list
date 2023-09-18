import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { DataGrid } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import { IconButton, Button } from "@mui/material";
import { useListItems } from "../ListItemsContext.jsx";

export default function ListTable() {
  const { setCompleted } = useListItems();

  const handleDeleteTask = () => {
    console.log("delete");
  };

  const handleEditTask = () => {
    console.log("edit");
  };

  const toggleStatus = (isCompleted) => {
    if (isCompleted === true) {
      return setCompleted(false);
    }

    if (isCompleted === false) {
      return setCompleted(true);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 30 },
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
          <IconButton onClick={toggleStatus(params.row.completed)}>
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

  const rows = [
    {
      id: "65075e0e82ee05a41ca5b50c",
      userId: "65075d6c82ee05a41ca5b503",
      title: "ofis",
      description: "sandalye, masa, kağıt",
      priority: "gereksiz",
      category: "ofis alışverişi",
      completed: false,
      createdAt: "2023-09-17T20:14:06.675Z",
      updatedAt: "2023-09-17T20:14:06.675Z",
    },
    {
      id: "65075e3f82ee05a41ca5b50f",
      userId: "65075d6c82ee05a41ca5b503",
      title: "araba",
      description: "yıllık bakım yapılacak",
      priority: "çok önemli",
      category: "bakım",
      completed: false,
      createdAt: "2023-09-17T20:14:55.139Z",
      updatedAt: "2023-09-17T20:14:55.139Z",
    },
  ];

  // const rows = [
  //   {
  //     id: 1,
  //     title: "bakım",
  //     description: "senelik bakım yapılacak",
  //     priority: "çok önemli",
  //     category: "araç",
  //     status: "active",
  //   },
  //   {
  //     id: 2,
  //     title: "mutfak",
  //     description: "alışveriş yapılacak",
  //     priority: "çok önemli",
  //     category: "gıda",
  //     status: "active",
  //   },
  //   {
  //     id: 3,
  //     title: "ofis",
  //     description: "alışveriş yapılacak",
  //     priority: "önemli",
  //     category: "kırtasiye",
  //     status: "completed",
  //   },
  //   {
  //     id: 4,
  //     title: "ev",
  //     description: "halılar yıkamaya gönderilecek",
  //     priority: "az önemli",
  //     category: "gıda",
  //     status: "completed",
  //   },
  // ];

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  let todos;

  // useEffect(async () => {
  //   todos = await axios.get(`${backendUrl}/`).catch(async (error) => {
  //     // Show a generic error message to the user
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops...",
  //       text: error.response.data.message,
  //     });
  //   });
  // }, []);

  console.log("todos", todos);

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
