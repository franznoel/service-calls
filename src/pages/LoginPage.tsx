import React, { useState } from "react";
import { Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material"
import CustomAppBar from "../components/CustomAppBar";

const PageLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log({ email, password });
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
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField label="Email" fullWidth value={email} onChange={(e)=>setEmail(e.target.value)}/>
              </Grid>
              <Grid item xs={12}>
                <TextField label="Password" fullWidth type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" fullWidth>Login</Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default PageLogin;
