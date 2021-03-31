import React, { useState } from 'react';
import { Container, Fab, makeStyles, Snackbar } from '@material-ui/core';
import { ItemList } from '../Components/ItemList';
import { AddItemDialog } from '../Components/AddItemDialog';
import AddIcon from '@material-ui/icons/Add';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  extendedIcon: {
    marginRight: theme.spacing(1),
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Home() {
  const classes = useStyles();
  const [isAddDialogOpen, setDialogState] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
	
	const handleDialog = () => {
    setDialogState(!isAddDialogOpen);
	}
	
	const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  }
	
	return (
    <Container maxWidth="lg">
      <Fab variant="extended" color="secondary" className={classes.root} style={{marginBottom: 20}} onClick={handleDialog}>
        <AddIcon className={classes.extendedIcon}/>
        Add
      </Fab>
      <AddItemDialog 
        open={isAddDialogOpen}
				handleClose={handleDialog}
				openSnackbar={() => setOpenSnackbar(true)}
      />
      <ItemList />
      <Snackbar
				open={openSnackbar}
				autoHideDuration={5000}
				onClose={handleSnackbarClose}
			>
        <Alert onClose={handleSnackbarClose} severity="success">
          Item added succesfully!
        </Alert>
      </Snackbar>            
    </Container>
  )
}