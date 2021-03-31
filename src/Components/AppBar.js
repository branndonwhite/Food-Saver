import React, { useState } from 'react';
import { makeStyles, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 30
  },
  title: {
    flexGrow: 1,
    textAlign: 'center'
  },
}));

export default function MainAppBar() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleSetting = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Save'em
                    </Typography> 
                    {/* <IconButton aria-label="settings" color="inherit" onClick={handleSetting}>
                        <SettingsIcon />
                    </IconButton> */}
                </Toolbar>
            </AppBar>
        </div>
    );
}
