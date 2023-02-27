import { AppBar, Toolbar,   Box,BottomNavigation ,BottomNavigationAction} from "@mui/material";
import { Text, Modal, Input ,Button} from "@nextui-org/react";
import { sha256 } from 'crypto-hash';
import { useEffect, useState } from "react";
import { useContext } from "react";
import AppContext from "./AppContext";
import Cookies from "js-cookie";
import {Grid ,Card}from "@nextui-org/react";

const MockItem = ({ text }) => {
  return (
    <Card css={{ h: "$24", $$cardColor: "white", height: "60vh" }}>
       <Card.Body>
        <Text>{text}</Text>
       </Card.Body>
    </Card>
  );
};
const LandingPage = () => {

  const [visible, setVisibility] = useState(false);
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [message, setMessage] = useState('');
  const {loggedIn, setLoggedIn} = useContext(AppContext);
  const [value,setValue] = useState('');
  const handleLogin = () => {
    setLoggedIn(true);
  }
 
  async function submitHandler(){
    const hashValue = await sha256('technology');


    try{
        await fetch('/api/signin',{
            method  : 'POST',
            body : JSON.stringify({
                email : email,
                password : password
            })
        }).then((response)=>{
            return response.json();
        }).then((data) => {
            setMessage(data.message);
           
            console.log("Setting it true now")

            if(data.data == true){
                setLoggedIn(true);
               
                Cookies.set('signedIn', hashValue);

            handleLogin();
            }

        })
    }
    catch{
        console.log("Something went wrong")
        setMessage("FAILED TO AUTHENTICATE THE USER")
    }
  }
  return (
    <>
    <AppContext.Provider value={{loggedIn,setLoggedIn}}>
      <Box >
        <AppBar style={{backgroundColor:'#00e676'}}>
          <Toolbar css={{ position: "relative" ,backgroundColor:'$green500'}}>
            <div style={{ position: "absolute", left: "2%" }}>
              <p  style={{color:'black',letterSpacing:'0.15rem'}} >PEQUREL TECHNOLOGIES</p>
            </div>
            <div style={{ position: "absolute", right: "15rem" }}>
              <Button
                css={{background:'$white',color:'Black',fontSize:'1.15rem'}}
                onClick={() => {
                  setMessage('');
                  setVisibility(true);
                  console.log("Modal should be visible by now");
                }}
              >
                SIGN IN
              </Button>
            </div>
            <div style={{ position: "absolute", right: "2rem" }} >
              <Button css={{background:'$white',color:'Black',fontSize:'1.15rem'}}>
                CONTACT
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <Modal closeButton
            blur
            style={{padding:'1rem'}}
            aria-labelledby="modal-title"
            open={visible}
            onClose={() => {
                setVisibility(false)
            }}
           width='35%'>
        <Modal.Body>
          <Input label="Email" placeholder="Enter your email" onChange={(event) => {
            setEmail(event.target.value)
          }} type='email'></Input>
          <Input label="Password" placeholder="Enter your password" onChange={(event) => {
            setPassword(event.target.value)
          }} type='password'></Input>
          <Button  css={{background:'$green500',color:'$black',width:'15%'}} onClick={submitHandler}>
            Sign In
          </Button>
          <div style={{color:'red'}}>{message}</div>
        </Modal.Body>
      </Modal>
      </AppContext.Provider>
      
      
        
      <Grid.Container gap={3} justify="center" css={{marginTop:'20vh'}}>
        <Grid xs={6} md={6} >
            <MockItem/>
        </Grid>
        <Grid xs={6} md={6}>
        <MockItem/>
        </Grid>
        
      </Grid.Container>
      <BottomNavigation
  showLabels
  value={value}
  onChange={(event, newValue) => {
    setValue(newValue);
  }}
 
>
  <BottomNavigationAction label="Copyright and other details will come here" style={{marginTop:'10vh', fontSize:'2rem'}}>
  
  </BottomNavigationAction>
</BottomNavigation>
      
    </>
   
  );
};

export default LandingPage;
