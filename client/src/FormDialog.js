import React, { useEffect, useState } from "react"; 
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Axios from "axios";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const {updateUser,setupdateUser} = props.updateUser;
  const [Phone,setPhone] = useState('');
  const [FirstName,setFirstName] = useState('');
  const [LastName,setLastName] = useState('');


  const handleClickOpen = () => {
    setOpen(true);
    console.log();
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
            id="phone"
            name="phone"
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
            id="firsName"
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
            id="lastName"
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
            <Button variant="contained" onClick={this.props.UpdateClick(Phone,FirstName,LastName)}>עדכן</Button>  
            <Button variant="contained" onClick={handleClose}>סגור</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
