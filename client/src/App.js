
import React, { useEffect, useState } from "react";
import './App.css';
import Axios from "axios";
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FormDialog from "./FormDialog";
import { withEmotionCache } from "@emotion/react";
import Album from "./Album";

function App() {
  const [Email,setEmail] = useState('');
  const [Phone,setPhone] = useState('');
  const [FirstName,setFirstName] = useState('');
  const [LastName,setLastName] = useState('');

  const [UsersList,setUsersList] = useState([]);
  
  useEffect(()=>{
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setUsersList(response.data);
      console.log(response.data);
    })    
  }, [])

  const submitUser = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/api/insert", {
      Email:Email,
      Phone:Phone,
      FirstName:FirstName,
      LastName:LastName,
    }).then(() => {
      setUsersList([
        ...UsersList,
        {First_Name: FirstName,Last_Name: LastName,Email : Email},
      ]);
    })

    
  };

  const deleteUser = (eMail) => {
    Axios.post("http://localhost:3001/api/delete", {
      Email:eMail,
    }).then(()=> {
        setUsersList(UsersList.filter(item => item.Email !== eMail));
    })
  };

  const updateUser = (email,phone,firsName,lastName,bClose) => {
    Axios.put("http://localhost:3001/api/update", {
      Email:email,
      Phone:phone,
      FirstName:firsName,
      LastName:lastName,
    }).then((response) => {
      setUsersList(response.data);
      bClose();
    }); 
  };

  return (
    
    <div className="App" dir="rtl">
      <Album />  
      <form className='form'>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Input 
              type="text" 
              name="Email" 
              placeholder="אימייל"
              dir="rtl"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Input 
              type="text" 
              name="Phone" 
              placeholder="מס' טלפון"
              dir="rtl"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Input 
              type="text" 
              name="FName" 
              placeholder="שם פרטי"
              dir="rtl"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />  
          </Grid>
          <Grid item xs={3}>
            <Input 
              type="text" 
              name="LName" 
              placeholder="שם משפחה"
              dir="rtl"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />                
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined"  onClick={(e) => submitUser(e)}>הוספה</Button>
          </Grid>
        </Grid>
        
        <Grid container spacing={2}>  
          {UsersList.map((val) => {
            return (
              <Grid item xs={2}> 
                <Box sx={{ maxWidth: 300 }}>
                  <Card variant="outlined">
                    <React.Fragment>
                      <CardContent>
                        <Typography variant="h5" component="div">
                          שם פרטי: {val.First_Name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          שם משפחה: {val.Last_Name}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <div  dir="rtl">
                          <FormDialog Email={val.Email} updateUser={updateUser}></FormDialog>
                        </div>
                        <Button sx={{ }} variant="outlined" color="error" onClick={() => deleteUser(val.Email)}>מחק</Button>
                      </CardActions>
                    </React.Fragment>
                  </Card>
                </Box>
              </Grid>
            )
          })}
        </Grid>
      </form>
    </div> 
  );
}

export default App;
