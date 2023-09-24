import React from "react";
import Modal from "@mui/material/Modal";
import ListForm from "./ListForm.jsx";

const UpdateListItemModal = ({ open, onClose, task }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ListForm onClose={onClose} task={task} />
    </Modal>
  );
};

export default UpdateListItemModal;
