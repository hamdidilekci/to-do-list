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
import isCustomISO8601 from "./is-date-ISO8601.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ListTable() {
  const { rows, setRows } = useListItems();
  const backend = useBackend();

  const [reminderOpen, setReminderOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [selectedTaskToEdit, setSelectedTaskToEdit] = useState("");
  const [selectedTask, setSelectedTask] = useState("");
  const [reminderDate, setReminderDate] = useState("");

  const handleEditModalOpen = (task) => {
    setSelectedTaskToEdit(task);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = (task) => {
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
    setEditModalOpen(false);
    setSelectedTask("");
  };

  const handleSetReminder = (task) => {
    setSelectedTask(task);
    setReminderOpen(true);
  };

  const handleReminderDateChange = (event) => {
    setReminderDate(event.target.value);
  };

  const handleSaveReminder = async () => {
    try {
      // Validate the reminder date-time format
      if (!isCustomISO8601(reminderDate)) {
        // The input is not in the expected format
        Swal.fire({
          icon: "error",
          title: "Invalid Format",
          text: "Please enter a valid date and time in the format YYYY-MM-DDTHH:mm",
        });
        return;
      }

      // Convert the selected reminderDate to UTC
      const utcDate = new Date(reminderDate);

      // Continue with saving the reminder...
      const response = await backend.post("reminder", {
        taskId: selectedTask.id,
        reminderDate: utcDate,
      });

      if (response._id) {
        setReminderOpen(false);
        // Success message
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Reminder set!",
        });
      }
    } catch (error) {
      // Handle errors
      console.error("Error setting reminder:", error);
    }
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
    { field: "title", headerName: "Title", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    {
      field: "priority",
      headerName: "Priority",
      width: 80,
    },
    {
      field: "category",
      headerName: "Category",
      width: 80,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      type: "date",
      width: 115,
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: "status",
      headerName: "Status",
      width: 80,
      renderCell: ({ row }) => (
        <span>
          <Tooltip title="Toggle Complete-Active">
            <IconButton
              style={{
                color: row.completed === true ? "green" : "grey",
              }}
              onClick={() => {
                toggleStatus(row);
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
      renderCell: ({ row }) => {
        return (
          <div>
            <Tooltip title="Delete Task">
              <IconButton
                onClick={() => {
                  handleDeleteTask(row.id);
                }}
              >
                <DeleteForeverIcon sx={{ color: "red" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit Task">
              <IconButton
                onClick={() => {
                  handleEditModalOpen(row);
                }}
              >
                <EditIcon sx={{ color: "green" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Set Reminder">
              <IconButton
                onClick={() => {
                  handleSetReminder(row);
                }}
              >
                <AlarmIcon sx={{ color: "blue" }} />
              </IconButton>
            </Tooltip>
            <UpdateListItemModal
              open={editModalOpen}
              handleClose={handleCloseEditModal}
              task={selectedTaskToEdit}
            />
            <Dialog
              fullWidth
              open={reminderOpen}
              onClose={() => setReminderOpen(false)}
            >
              <DialogTitle>Set Reminder</DialogTitle>
              <DialogContent>
                <TextField
                  fullWidth
                  id="datePicker"
                  label="Date and Time"
                  type="datetime-local"
                  value={reminderDate}
                  onChange={handleReminderDateChange}
                  InputLabelProps={{
                    shrink: true,
                    sx: { color: "blue ", marginTop: "5px" },
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

  // get all todos when page loaded
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

  // show notifications if any
  let isToasting = false;
  useEffect(() => {
    if (!isToasting) {
      isToasting = true;
      // get reminders
      backend.get("reminder").then((dbReminders) => {
        // Check if reminders array is not empty
        if (dbReminders.length > 0) {
          // Show toast notification for each reminder
          dbReminders.forEach((reminder) => {
            toast(`Reminder for task: ${reminder.taskTitle}`, {
              position: "top-right",
              autoClose: 5000, // Duration of the notification in milliseconds
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          });
        }
      });
    }
  }, []);

  return (
    <>
      <DataGrid
        autoHeight={true}
        getRowHeight={() => "auto"}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
      <ToastContainer />
    </>
  );
}
