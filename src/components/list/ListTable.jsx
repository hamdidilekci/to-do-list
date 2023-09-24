import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Swal from "sweetalert2";
// MUI imports
import { DataGrid } from "@mui/x-data-grid";
import { DeleteForever, Edit, Brightness1, Alarm } from "@mui/icons-material";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
// contexts, modal and helper function
import { useListItems } from "../../context/ListItemsContext.jsx";
import { useBackend } from "../../context/backend-context.jsx";
import UpdateListItemModal from "./UpdateListItemModal.jsx";
import isCustomISO8601 from "../../helpers/is-date-ISO8601.js";

export default function ListTable() {
  const { rows, setRows } = useListItems();
  const backend = useBackend();

  const [reminderOpen, setReminderOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [selectedTaskToEdit, setSelectedTaskToEdit] = useState("");
  const [selectedTask, setSelectedTask] = useState("");
  const [reminderDate, setReminderDate] = useState("");

  const handleCloseEditModal = (editedTask) => {
    if (editedTask) {
      const updatedRows = rows.map((row) => {
        if (row.id === editedTask.id) {
          return editedTask;
        } else {
          return row;
        }
      });
      setRows(updatedRows);
    }
    setEditModalOpen(false);
    setSelectedTaskToEdit("");
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
              <Brightness1 />
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
                <DeleteForever sx={{ color: "red" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit Task">
              <IconButton
                onClick={() => {
                  setSelectedTaskToEdit(row);
                  setEditModalOpen(true);
                }}
              >
                <Edit sx={{ color: "green" }} />
              </IconButton>
            </Tooltip>
            <UpdateListItemModal
              open={editModalOpen}
              onClose={() => {
                handleCloseEditModal(selectedTaskToEdit);
              }}
              task={selectedTaskToEdit}
            />
            <Tooltip title="Set Reminder">
              <IconButton
                onClick={() => {
                  handleSetReminder(row);
                }}
              >
                <Alarm sx={{ color: "blue" }} />
              </IconButton>
            </Tooltip>
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
