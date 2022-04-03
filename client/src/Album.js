import React, { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Input from '@mui/material/Input';
import FormDialog from "./FormDialog";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Axios from "axios";
import App from './App';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Album() {
  const [Email,setEmail] = useState('');
  const [Phone,setPhone] = useState('');
  const [FirstName,setFirstName] = useState('');
  const [LastName,setLastName] = useState('');
  const [BirthDate,setBirthDate] = useState('');

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
      BirthDate:BirthDate,
    }).then(() => {
      setUsersList([
        ...UsersList,
        {First_Name: FirstName,Last_Name: LastName,Email : Email,Birth_Date: BirthDate},
      ]);
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

  const deleteUser = (eMail) => {
    Axios.post("http://localhost:3001/api/delete", {
      Email:eMail,
    }).then(()=> {
        setUsersList(UsersList.filter(item => item.Email !== eMail));
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            RonMatch
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 5,
            pb: 2,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Ron Match
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Something short and leading about the collection below—its contents,
              the creator, etc. Make it short and sweet, but not too short so folks
              don&apos;t simply skip over it entirely.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
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
                    <Grid item xs={3}>
                        <Input 
                        type="text" 
                        name="Bdate" 
                        placeholder="תאריך לידה"
                        dir="rtl"
                        onChange={(e) => {
                            setBirthDate(e.target.value);
                        }}
                        />                
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained"  onClick={(e) => submitUser(e)}>הוספה</Button>
                    </Grid>
                </Grid>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 2 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={3} >
            {UsersList.map((card) => (
              <Grid item key={card.Email} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '25px',
                      bgcolor: '#f6f6f6',
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.First_Name + " " + card.Last_Name}
                    </Typography>
                    <Typography>
                      {}
                    </Typography>
                    <Typography>
                      {card.Phone}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <FormDialog Email={card.Email} updateUser={updateUser}></FormDialog>
                    <Button sx={{ }} variant="outlined" color="error" onClick={() => deleteUser(card.Email)}>מחק</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}