import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { DataGrid } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import AlarmIcon from "@mui/icons-material/Alarm";
import {
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useListItems } from "../ListItemsContext.jsx";
import { useBackend } from "../../../backend-context.jsx";
import UpdateListItemModal from "./UpdateListItemModal.jsx";

export default function ListTable() {
  const { rows, setRows } = useListItems();

  const [reminderOpen, setReminderOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [reminderDateTime, setReminderDateTime] = useState(null);

  const handleSetReminder = (task) => {
    setSelectedTask(task);
    setReminderOpen(true);
  };

  const handleReminderDateTimeChange = (event) => {
    setReminderDateTime(event.target.value);
  };

  const handleSaveReminder = async () => {
    try {
      const response = await backend.post("reminders", {
        taskId: selectedTask.id,
        reminderDateTime: reminderDateTime,
      });

      if (response._id) {
        setReminderOpen(false);
        // Optionally, you can show a success message.
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Reminder set!",
        });
      }
    } catch (error) {
      // Handle errors, e.g., show an error message.
      console.error("Error setting reminder:", error);
    }
  };

  const backend = useBackend();

  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = (task) => {
    if (task) {
      const _rows = rows.map((row) => {
        if (row.id === task.id) {
          return task;
        } else {
          return row;
        }
      });
      setRows(_rows);
    }
    setOpen(false);
  };

  const handleDeleteTask = async (id) => {
    const response = await backend.delete(`todos/${id}`);
    if (response._id) {
      const _rows = [...rows];

      // remove todo from list
      setRows(_rows.filter((row) => row.id != id));

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Task deleted!",
      });
    }
  };

  const handleEditTask = () => {
    handleOpenModal();
  };

  const toggleStatus = async (task) => {
    const response = await backend.post(`todos/${task.id}`, {
      completed: !task.completed,
    });

    if (response._id) {
      // toggle status
      const _rows = rows.map((row) => {
        if (row.id === response._id) {
          return { ...response, id: response._id };
        } else {
          return row;
        }
      });

      setRows(_rows);
    }
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
      field: "createdAt",
      headerName: "Created At",
      type: "date",
      width: 90,
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: "status",
      headerName: "Status",
      width: 90,
      renderCell: (params) => (
        <span>
          <Tooltip title="Toggle Complete-Active">
            <IconButton
              style={{
                color: params.row.completed === true ? "green" : "red",
              }}
              onClick={() => {
                toggleStatus(params.row);
              }}
            >
              <Brightness1Icon />
            </IconButton>
          </Tooltip>
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            <Tooltip title="Delete Task">
              <IconButton
                onClick={() => {
                  handleDeleteTask(params.row.id);
                }}
              >
                <DeleteForeverIcon sx={{ color: "red" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit Task">
              <IconButton
                onClick={() => {
                  handleEditTask(params.row.id);
                }}
              >
                <EditIcon sx={{ color: "green" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Set Reminder">
              <IconButton
                onClick={() => {
                  handleSetReminder(params.row);
                }}
              >
                <AlarmIcon sx={{ color: "blue" }} />
              </IconButton>
            </Tooltip>
            <UpdateListItemModal
              open={open}
              handleClose={handleCloseModal}
              task={params.row}
            />
            <Dialog open={reminderOpen} onClose={() => setReminderOpen(false)}>
              <DialogTitle>Set Reminder</DialogTitle>
              <DialogContent>
                <TextField
                  size="medium"
                  label="Date and Time"
                  type="datetime-local"
                  value={reminderDateTime}
                  onChange={handleReminderDateTimeChange}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setReminderOpen(false)}>Cancel</Button>
                <Button onClick={handleSaveReminder} color="primary">
                  Save
                </Button>
              </DialogActions>
            </Dialog>
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
      autoHeight={true}
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
    />
  );
}
