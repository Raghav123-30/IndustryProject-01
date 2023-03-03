import React from "react";
import { useState, useEffect } from "react";
import { Button, Card, Input, Checkbox } from "@nextui-org/react";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Modal } from "@nextui-org/react";
import DoneIcon from "@mui/icons-material/Done";



const Location = () => {
  const [otphandlervisible, setotphandlervisible] = useState(false);
  const [otp, setOtp] = useState();
  const [verified, setVerified] = useState(false);
  const [adhar, setAdhar] = useState("");
  const [adharError, setAdharError] = useState("");
  const [locaddr, setLocAddr] = useState("");
  const [locerror, setLocError] = useState("");
  const [owner, setOwner] = useState("");
  const [ownererror, setOwnerError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setphoneError] = useState("");
  const [requestMessage, setRequestMessage] = useState('');
  const [formisValid, setformisValid] = useState(false);
  const [confirmFunction, setConfirmFunction] = useState();
  const [otpText, setOtpText] = useState('');
  const [added, setAdded] = useState(false);

  const otpcloseHandler = () => {
    setotphandlervisible(false);
  };
  async function renderOtpVerification() {
    let flag = 0;
    const phoneNumber = "+91" + phone;
    console.log(phoneNumber);
    const appVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          console.log("Verifying");
        },
      },
      auth
    );

    await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        try {
          setConfirmFunction(confirmationResult);
          
        } catch {
          console.log("Something went wrong");
        }
      })
      .catch(() => {
        
        setRequestMessage(
          "Too many OTP requested for the same phone number! please try again after some time"
        );
        setotphandlervisible(false);
      });
  }

  
  async function validateOtp() {
    if (!verified) {
      console.log(`Entered OTP was ${otp}`);
      try {
        await confirmFunction.confirm(otp);
        console.log("OTP verified successfully");

        setVerified(true);
        submitToFirestore();
        setotphandlervisible(false);
        return true;
      } catch (error) {
        if (error.code === "auth/invalid-verification-code") {
          console.log(
            `Entered OTP ${otp} did not match with the one sent from the server! Please try again`
          );
          setOtpText("OTP is invalid");
        } else {
          console.log("An error occurred while verifying the OTP:", error);
          setOtpText("An error occurred while verifying the OTP");
        }
        return false;
      }
    }
  }

  const locationValidityHandler = () => {
    if (!locaddr) {
      setLocError("Location is required");
      setformisValid(false);
      return false;
    } else if (locaddr.trim().length < 5) {
      setLocError("Please enter a valid location name");
      setformisValid(false);
      return false;
    } else {
      setLocError("");
      setformisValid(true);
      return true;
    }
  };

  const ownerValidityHandler = () => {
    if (!owner) {
      setOwnerError("Location is required");
      setformisValid(false);
      return false;
    } else if (owner.trim().length < 4) {
      setOwnerError("Please enter a valid Owner name");
      setformisValid(false);
      return false;
    } else {
      setOwnerError("");
      setformisValid(true);
      return true;
    }
  };

  const phoneValidityHandler = () => {
    if (!phone) {
      setphoneError("Phone number is required");
      setformisValid(false);
      return false;
    } else if (phone.trim().length < 10 || phone.trim().length > 10) {
      setphoneError("Invalid Number");
      setformisValid(false);
      return false;
    } else {
      setphoneError("");
      setformisValid(true);
      return true;
    }
  };

  const adharValidityHandler = () => {
    if (!adhar) {
      setAdharError("Adhar number is required");
      setformisValid(false);
      return false;
    } else if (adhar.trim().length < 12) {
      setAdharError("Invalid Adhar Number");
      setformisValid(false);
      return false;
    } else {
      setAdharError("");
      setformisValid(true);
      return true;
    }
  };

  async function handleLocation() {
    locationValidityHandler();
    ownerValidityHandler();
    phoneValidityHandler();
    adharValidityHandler();
    if (
      locationValidityHandler() &&
      ownerValidityHandler() &&
      phoneValidityHandler() &&
      adharValidityHandler()
    ) {
        
      setotphandlervisible(true);
      renderOtpVerification();
     
    }
  }

const submitToFirestore = async () => {
  
    await fetch("/api/addloc", {
      method: "POST",
      body: JSON.stringify({
        location: locaddr,
        owner: owner,
        phoneno: phone,
        adhar: adhar,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        console.log("Success");
        setAdded(true);
      })
      .catch((error) => {
        console.log("failed");
      });
  
}
  if(!added){
  return (
    <Card
        css={{
          width: "50%",
          margin: "0 auto",
          padding: "3rem",
          marginTop: "5rem",
        }}
      >
        <Input
          css={{
            marginBottom: "1.5rem",
            marginTop: "1rem",
          }}
          size="lg"
          className="helperText"
          bordered
          shadow
          type="text"
          placeholder="Eg. Annigeri, Near Maruti Temple"
          label="Location Address"
          onChange={(event) => {
            setLocAddr(event.target.value);
          }}
        ></Input>
        {locerror && <div style={{ color: "red" }}>{locerror}</div>}
        <Input
          css={{
            marginBottom: "1.5rem",
            marginTop: "1rem",
          }}
          size="lg"
          className="helperText"
          bordered
          shadow
          type="text"
          placeholder="Eg.Puneet Pandit"
          label="Owner's Full Name"
          onChange={(event) => {
            setOwner(event.target.value);
          }}
        ></Input>
        {ownererror && <div style={{ color: "red" }}>{ownererror}</div>}
        <Input
          css={{
            marginBottom: "1.5rem",
            marginTop: "1rem",
          }}
          size="lg"
          className="helperText"
          bordered
          shadow
          type="text"
          label="Owner Phone No"
          placeholder="Eg.98451XXXXX"
          onChange={(event) => {
            setPhone(event.target.value);
          }}
        ></Input>
        {phoneError && <div style={{ color: "red" }}>{phoneError}</div>}
        <Input
          css={{
            marginBottom: "1.5rem",
            marginTop: "1rem",
          }}
          size="lg"
          className="helperText"
          bordered
          shadow
          type="text"
          placeholder="Eg. 97389XXXXXXX"
          label="Owner's Adhar Number"
          onChange={(event) => {
            setAdhar(event.target.value);
          }}
        ></Input>
        {adharError && <div style={{ color: "red" }}>{adharError}</div>}
  
        <Button
          onPress={handleLocation}
          css={{ width: "20%", background: "$primary", margin: "0 auto" }}
        >
          Submit
        </Button>
        <div id="recaptcha-container"></div>
       
          <Modal
            closeButton
            aria-labelledby="modal-title"
            open={otphandlervisible}
            onClose={otpcloseHandler}
            width="30vw"
          >
            <Modal.Body>
              <Input
                label="OTP"
                placeholder="XXXXXX"
                onChange={(event) => {
                  setOtp(event.target.value);
                }}
              ></Input>
              <Button
                color="primary"
                css={{  width:'40%',margin:'0 auto', marginTop:'1rem',marginBottom:'1rem' }}
                onPress={() => {
                  validateOtp();
                  
                }}
              >
                Submit
              </Button>
              <p style={{color:'red',marginTop:'1rem', fontSize:'1.2rem', textTransform:'uppercase',textAlign:'center'}}>{otpText}</p>
             
            </Modal.Body>
          </Modal>
          
              
          <p style={{color:'red',marginTop:'1rem', fontSize:'1.5rem', textTransform:'uppercase',textAlign:'center'}}>{requestMessage}</p>
       
      </Card>
      
  );
            }
  if(added){
    return(
      <Card
      css={{
        width: "25vw",
        margin: "0 auto",
        marginTop: "5rem",
        padding: "3rem",
      }}
     
    >
      
        <div  style={{display:'flex', flexDirection:'row',justifyItems:'center', alignItems:'center', gap:'10%'}}>
        <DoneIcon accentHeight="5" style={{width:'1.75rem', height:'1.75rem',backgroundColor:'green',color:'white'}}></DoneIcon>
        <p style={{fontSize:'1.25rem'}}>A3S is added successfully!!</p>
        </div>
      
    </Card>
    )
  }
};
export default Location;
