import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button} from '@material-ui/core';
import firebase from '../firebase';

export const DeleteItemDialog = (props) => {
  const {open, handleClose, item, openDeleteSnackbar} = props;

  const deleteItem = () => {
    const db = firebase.firestore();
    db.collection("items").doc(item.id).delete();
  }

  const deleteAndCloseDialog = () => {
    deleteItem();
    handleClose();
    openDeleteSnackbar();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete Item</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure want to delete this item? You can't undo it once you hit the delete button.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Cancel</Button>
        <Button onClick={deleteAndCloseDialog} color="primary" autoFocus>Delete</Button>
      </DialogActions>
    </Dialog>
  )
}