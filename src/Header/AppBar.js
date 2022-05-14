import React, { useState } from "react";
import {  useNavigate , useLocation } from "react-router-dom";
import { AppBar, Toolbar, Button, Tab, Tabs, Typography,useTheme, useMediaQuery} from "@mui/material";
import DrawerComp from "../components/drawerComp";
import {useAuth} from '../components/auth'


const Appbar = () => {
  const [value, setValue] = useState();
  const theme=useTheme()
 
  const navigate = useNavigate();
  const location =useLocation()


  const auth= useAuth()

  const isMatch=useMediaQuery(theme.breakpoints.down('md'))
  console.log('breakPoints',isMatch)
  
  const PAGES=['Home', 'About' ,'Profile']

  const handleChange = (event, newValue) => {
    setValue(newValue);
  
    if (newValue === 0) {
      return navigate("/");
    } else if (newValue === 1) {
      return navigate("/about");
    }
    else if (newValue === 2) {
        return navigate("/profile");
      }
  };

  const LoginHandler=()=>{
    navigate("/login");
  }

  const singinHandler=()=>{
    navigate("/signup");
  }
  const logoutHandler=()=>{
  auth.logout()
    navigate("/");
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography sx={{fontSize:'2rem', paddingX:"1%"}}>ROUTING</Typography>
          {
              isMatch?(
                  <>
                  <DrawerComp />
                  </>
              ):(
                <>
                         <Tabs
            textColor="inherit"
            value={value}
            onChange={handleChange}
            indicatorColor=""
          >{
              PAGES.map((page,index)=>(
                <Tab key={index} label={page} />
              ))
          }
            
          </Tabs>
         {!auth.users && location.pathname==="/signup" && <Button sx={{ marginLeft: "auto" }} variant="contained" onClick={LoginHandler}>
            Login
          </Button>}
         {!auth.user && location.pathname==="/login" && <Button sx={{ marginLeft: "auto" }} variant="contained" onClick={singinHandler}>
            Signup
          </Button>}
          {auth.user && <Button sx={{ marginLeft: "auto" }} variant="contained" onClick={logoutHandler}>
            Logout
          </Button>}
                </>
              )
          } 
 
        </Toolbar>
      
      </AppBar>
    </>
  );
};

export default Appbar;
