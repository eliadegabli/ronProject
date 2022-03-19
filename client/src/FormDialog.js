import React, { useEffect, useState } from "react"; 
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Axios from "axios";

export default function FormDialog({Email,updateUser}) {
  const [open, setOpen] = React.useState(false);
  const [Phone,setPhone] = useState('');
  const [FirstName,setFirstName] = useState('');
  const [LastName,setLastName] = useState('');


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div  dir="rtl">
      <Button variant="outlined" color="success" onClick={handleClickOpen}>
        עדכון לקוח
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>עדכון לקוח</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="Phone"
            name="Phone"
            label="מס' טלפון"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
                setPhone(e.target.value);
            }}
          />
          <TextField
            autoFocus
            id="FirsName"
            name="FName"
            label="שם פרטי"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
                setFirstName(e.target.value);
            }}
          />
          <TextField
            autoFocus
            id="LastName"
            name="LName"
            label="שם משפחה"
            type="tezt"
            fullWidth
            variant="standard"
            onChange={(e) => {
                setLastName(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
            <Button variant="contained" onClick={() =>  updateUser(Email,Phone,FirstName,LastName)}>עדכן</Button>  
            <Button variant="contained" onClick={handleClose}>סגור</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
