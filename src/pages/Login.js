import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Paper, Box,Avatar, Grid, TextField } from "@mui/material";
import {useAuth} from '../components/auth'
import PersonIcon from '@mui/icons-material/Person';
import {blue } from '@mui/material/colors';

const schema = yup.object({
  firstName: yup.string().required(),
  password: yup.string().required().min(5),
});

const Login = () => {
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const auth=useAuth()
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.path || "/";

  const paperStyle = {
    padding: 20,
    height: "50vh",
    width: 280,
    margin: "50px auto",
  };
  return (
    <Box>
      <Grid>
        <Paper elevation={8} style={paperStyle}>
        <Grid align="center" sx={{ paddingY: 3 }}>
            <Avatar sx={{ bgcolor: blue[500] }} variant="round">
             <PersonIcon/>
            </Avatar>
          </Grid>{" "}  
          <form
            onSubmit={handleSubmit((data) => {
              auth.login(data.firstName);
              navigate(redirectPath, { replace: true });
            })}
          >
            <TextField
              //   sx={{padding:1}}
              fullWidth
              variant="outlined"
              label="Name"
              size="small"
              autoComplete="email"
              autoFocus
              helperText={errors.firstName?.message}
              {...register("firstName")}
              placeholder="Name"
            />
            <br />
            <br />
            <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="Password"
                helperText={errors.password?.message}
                type="password"
                {...register("password")}
                placeholder="Password"
              />
            <br />
            <br />
            <Button variant="contained" fullWidth type="submit">
              Login
            </Button>
          </form>
        </Paper>
      </Grid>
    </Box>
  );
};

export default Login;
