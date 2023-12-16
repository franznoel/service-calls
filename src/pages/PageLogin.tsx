import React, { useContext, useState } from "react";
import { Alert, Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material"
import CustomAppBar from "../components/CustomAppBar";
import { firebaseAuth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthProviderContext } from "../context/AuthProviderContext";

const PageLogin = () => {
  const authContext = useContext<any>(AuthProviderContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorCode, setErrorCode] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((credential) => {
        console.log('credential', credential);
        sessionStorage.setItem('user', JSON.stringify(credential.user));
        authContext.setCurrentUser(credential.user);
      })
      .catch((error) => {
        console.log('error', error);
        setIsError(true);
        setErrorCode(error.code);
      });
  }

  const clearError = () => {
    setIsError(false);
  }

  return (
    <div>
      <CustomAppBar />
      <Card sx={{ m: '3rem auto', width: 400 }}>
        <CardContent>
          <div style={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h4">Login</Typography>
          </div>
          <form onSubmit={handleSubmit}>
            <Alert severity="error" sx={{ display: isError ? 'block' : 'none', margin: '1rem 0' }}>{errorCode}</Alert>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField label="Email" fullWidth value={email} onChange={(e)=>setEmail(e.target.value)} onFocus={()=>clearError()}/>
              </Grid>
              <Grid item xs={12}>
                <TextField label="Password" fullWidth type="password" value={password} onChange={(e)=>setPassword(e.target.value)} onFocus={()=>clearError()}/>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" type="submit" fullWidth>Login</Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default PageLogin;
