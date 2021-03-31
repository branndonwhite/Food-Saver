import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid } from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import firebase from '../firebase';

export const AddItemDialog = (props) => {
  const {open, handleClose, openSnackbar} = props;
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [expiredDate, setExpiredDate] = useState(new Date());

  const margin = {marginBottom: 20}

  const addItem = () => {
    const db = firebase.firestore();
    
    const data = {
      name: name,
      quantity: quantity,
      expiredDate: firebase.firestore.Timestamp.fromDate(new Date(expiredDate))
    }

    db.collection("items").add(data)
  }

  const addAndCloseDialog = () => {
    addItem();
    handleClose();
    openSnackbar();
  }

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      aria-labelledby="form-dialog-title" 
      fullWidth={true} 
      maxWidth="xs"
    >
      <DialogTitle id="form-dialog-title">
        Add Item
      </DialogTitle>
      <DialogContent style={{marginTop: 0}}>
        <Grid item xs={12} style={margin}>
          <TextField 
            name="name" 
            required 
            id="nameForm" 
            variant="outlined" 
            type="string" 
            label="Name"
            onChange={e => setName(e.target.value)}
            // error={name === ""}
            // helperText={name === "" ? 'You must enter the item name!' : ''}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} style={margin}>
          <TextField 
            name="quantity" 
            required
            id="qtyForm" 
            variant="outlined" 
            type="number" 
            label="Quantity" 
            onChange={e => setQuantity(e.target.value)}
            // error={quantity === ""}
            // helperText={quantity === "" ? 'You must enter the item quantity!' : ''}
            fullWidth    
          />
        </Grid>
        <Grid item xs={12} style={margin}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
              autoOk
              required
              fullWidth
              disablePast
              id="dateForm"
              inputVariant="outlined"
              label="Expiration Date"
              format="DD/MM/YYYY"
              value={expiredDate}
              onChange={date => setExpiredDate(date)}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>Cancel</Button>
        <Button color="primary" type="submit" onClick={addAndCloseDialog}>Add</Button> 
      </DialogActions>
    </Dialog>
  );
}