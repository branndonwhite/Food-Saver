import React, { useState, useEffect } from 'react';
import { makeStyles, Grid, Card, CardContent, CardActions, Button, Typography, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import firebase from '../firebase';
import { EditItemDialog } from './EditItemDialog';
import { DeleteItemDialog } from './DeleteItemDialog';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const ItemList = () => {
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [openEditSnackbar, setOpenEditSnackbar] = useState(false);
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false);

  const handleEdit = (item) => {
    setSelectedItem(item);
    setEditDialogOpen(!editDialogOpen);
  }

  const handleDelete = (item) => {
    setSelectedItem(item);
    setDeleteDialogOpen(!deleteDialogOpen);
  }
	
	const handleEditSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenEditSnackbar(false);
  }

  const handleDeleteSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenDeleteSnackbar(false);
  }

  useEffect(() => {
    const db = firebase.firestore();
    return db.collection("items").orderBy("expiredDate").onSnapshot((snapshot) => {
      let itemsData = [];
      snapshot.forEach(doc => itemsData.push(({...doc.data(), id: doc.id})));
      setItems(itemsData)
    });
    // const itemData = await db.collection("items").orderBy('expiredDate').get();
    // const response = itemData.docs.map(doc => ({...doc.data(), id: doc.id}))
  }, []);

  const renderItemCards = () => {
    return items.map(item => {
      const {id, name, quantity, expiredDate} = item;
      const date = String(new Date(expiredDate.seconds * 1000)).slice(0, 15);

      return (
        <Grid item xs={8} sm={6} lg={3}>
        <Card className={classes.card} key={id} variant="outlined">
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {date}
            </Typography>
            <Typography variant="h5" component="h3">
              {name}
            </Typography>
            <Typography color="textSecondary">
              Quantity: {quantity}
            </Typography>
          </CardContent>
          <CardActions>
            <Button color="secondary" onClick={() => handleEdit(item)}>Edit</Button>
            <Button color="secondary" onClick={() => handleDelete(item)}>Delete</Button>
          </CardActions>
        </Card>
      </Grid>
      )
    })
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {renderItemCards()}
        <EditItemDialog
          open={editDialogOpen}
          handleClose={() => {setEditDialogOpen(!editDialogOpen)}}
          item={selectedItem}
          openEditSnackbar={() => setOpenEditSnackbar(true)}
        />
        <DeleteItemDialog 
          open={deleteDialogOpen}
          handleClose={() => {setDeleteDialogOpen(!deleteDialogOpen)}}
          item={selectedItem}
          openDeleteSnackbar={() => setOpenDeleteSnackbar(true)}
        />
      </Grid>
      <Snackbar
				open={openEditSnackbar}
				autoHideDuration={5000}
				onClose={handleEditSnackbarClose}
			>
        <Alert onClose={handleEditSnackbarClose} severity="success">
          Item edited succesfully!
        </Alert>
      </Snackbar>
      <Snackbar
				open={openDeleteSnackbar}
				autoHideDuration={5000}
				onClose={handleDeleteSnackbarClose}
			>
        <Alert onClose={handleDeleteSnackbarClose} severity="success">
          Item deleted succesfully!
        </Alert>
      </Snackbar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    fontSize: 14,
  },
  date: {
    marginBottom: 10
  },
  card: {
    minWidth: 200
  }
}));
