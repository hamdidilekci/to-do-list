import React from "react";
import Modal from "@mui/material/Modal";
import ListForm from "./ListForm.jsx";

const UpdateListItemModal = ({ open, handleClose, task }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <ListForm handleClose={handleClose} task={task} />
    </Modal>
  );
};

export default UpdateListItemModal;
