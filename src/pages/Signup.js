import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Paper, Box, Avatar, Grid, TextField } from "@mui/material";
import {useAuth} from '../components/auth'
import PersonIcon from '@mui/icons-material/Person';
import {blue } from '@mui/material/colors';

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  password: yup.string().required().min(5),
  email: yup
    .string()
    .email("Invalid email format it requires @")
    .required("Required"),
});

const Signup = () => {
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
    height: "70vh",
    width: 280,
    margin: "50px auto",
  };

  return (
    <Box>
      <Grid>
        <Paper elevation={8} style={paperStyle}>
            <form
              onSubmit={handleSubmit((data) => {
                auth.login(data.firstName);
                navigate(redirectPath, { replace: true });
              })}
            > <Grid align="center" sx={{ paddingY: 2 }}>
            <Avatar sx={{ bgcolor: blue[500] }} variant="round">
             <PersonIcon/>
            </Avatar>
            </Grid>
              <TextField 
           
                fullWidth
                variant="outlined"
                label="Frist Name"
                autoComplete="firstName"
                size="small"
                placeholder="First Name"
                autoFocus
                helperText={errors.firstName?.message}
                {...register("firstName")}
              />
              <br/><br/>
              <TextField
            
                fullWidth
                variant="outlined"
                label="LastName"
                size="small"
                autoComplete="lastName"
                helperText={errors.lastName?.message}
                {...register("lastName")}
                placeholder="Last Name"
              />
              <br/><br/>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="Password"
                helperText={errors.password?.message}
                type="password"
                {...register("password")}
                placeholder="Password"
              />  <br/><br/>
          
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="email"
                autoComplete="email"
                helperText={errors.email?.message}
                type="email"
                {...register("email")}
                placeholder="Email"
            
              /><br/><br/>
              <Button variant="contained" fullWidth type="submit">
                Signup
              </Button>
            </form>
        </Paper>
      </Grid>
    </Box>
  );
};

export default Signup;
