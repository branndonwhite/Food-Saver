import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Grid } from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import firebase from '../firebase';

export const EditItemDialog = (props) => {
  const {open, handleClose, item, openEditSnackbar} = props;
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [expiredDate, setExpiredDate] = useState(new Date());

  useEffect(() => {
    if (item === null) return;
    setName(item.name);
    setQuantity(item.quantity);
    setExpiredDate(new Date(item.expiredDate.seconds * 1000));
  }, [item]);

  const margin = {marginBottom: 20}

  const updateItem = () => {
    const db = firebase.firestore();
    db.collection("items").doc(item.id).set({
      name: name,
      quantity: quantity,
      expiredDate: firebase.firestore.Timestamp.fromDate(new Date(expiredDate))
    });
  }

  const updateAndCloseDialog = () => {
    updateItem();
    handleClose();
    openEditSnackbar();
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
        Edit Item
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
          value={name}
          onChange={e => setName(e.target.value)}
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
            value={quantity} 
            onChange={e => setQuantity(e.target.value)}
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
            <Button color="primary" type="submit" onClick={updateAndCloseDialog}>
              Save
            </Button>
          </DialogActions>
      </Dialog>
  );
}