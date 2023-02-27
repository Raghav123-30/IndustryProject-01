import { Card, Input, Button, Textarea, Radio, css } from "@nextui-org/react";
import { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import {auth} from '../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import React from "react";
const Add = () => {
  const [fullName, setFullName] = useState("");
  const [fullNameError, setfullNameError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setphoneError] = useState("");
  const [formisValid, setformisValid] = useState(true);
  const [address, setAddress] = useState("");
  const [addressError, setaddressError] = useState("");
  const [location, setLocation] = useState("");
  const [locationError, setlocationError] = useState("");
  const [adharNumber, setAdharNumber] = useState("");
  const [adharError, setadharError] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [otpConfirmed, setOtpConfirmed] = useState(false);
  const [error, setError] = useState('');
  async function renderOtpVerification(){
    let flag = 0;
    const phoneNumber = "+91" + phone;
    console.log(phoneNumber);
      const appVerifier = new RecaptchaVerifier('recaptcha-container',{'size':'normal',
    'callback' : (response) => {
      console.log("Verifying")
    }},auth);

    await signInWithPhoneNumber(auth, phoneNumber, appVerifier).then((confirmationResult) => {
      const otp = prompt("Enter 6 digit code sent to operator's phone");
      if(confirmationResult.confirm(otp)){
        console.log("OTP verified successfully");

        flag = 1;
        
      }
      else{
        setError("Invalid OTP! Try again later");
        
      }
    })
     
    if(flag == 1){
      return true;
    }
    else{
      return false;
    }
  }

  const fullNameValidityHandler = () => {
    if (!fullName) {
      setfullNameError("Full Name is required");
      setformisValid(false);
      return false;
    } else if (fullName.trim().length < 3) {
      setfullNameError("Please enter a valid full name");
      setformisValid(false);
      return false;
    } else {
      setfullNameError("");
      setformisValid(true);
      return true;
    }
  };
  const phoneValidityHandler = () => {
    if (!phone) {
      setphoneError("Phone number is required");
      setformisValid(false);
      return false;
      return true;
    } else if (phone.length == 10) {
      setphoneError("");
      setformisValid(true);
      return true;
    } else if (phone.trim().length < 10 || phone.trim().length > 10) {
      setphoneError("Phone number is invalid");
      setformisValid(false);
      return false;
    }
  };
  const addressValidityHandler = () => {
    if (!address) {
      setaddressError("Address is required");
      setformisValid(false);
      return false;
    } else if (address.trim().length < 3) {
      setaddressError("Address is invalid");
      setformisValid(false);
      return false;
    } else {
      setaddressError("");
      setformisValid(true);
      return true;
    }
  };
  const loctionValidityHandler = () => {
    if (!location) {
      setlocationError("Please choose location to be assigned to the operator");
      setformisValid(false);
      return false;
    } else {
      setlocationError("");
      setformisValid(true);
      return true;
    }
  };
  const adharNumberValidityHandler = () => {
    if (!adharNumber) {
      setadharError("Adhar Number is required");
      setformisValid(false);
      return false;
    } else if (
      adharNumber.trim().length < 16 ||
      adharNumber.trim().length > 16
    ) {
      setadharError("Please enter a valid adhar number");
      setformisValid(false);
      return false;
    } else {
      setAdharNumber(adharNumber);
      setadharError("");
      setformisValid(true);
      return true;
    }
  };
  async function handleButtonClick() {
    fullNameValidityHandler() 
      loctionValidityHandler() 
      phoneValidityHandler() 
      addressValidityHandler() 
      adharNumberValidityHandler()
    
    if (
      fullNameValidityHandler() &&
      loctionValidityHandler() &&
      phoneValidityHandler() &&
      addressValidityHandler() &&
      adharNumberValidityHandler()
    ) {
      const result = await renderOtpVerification();
      console.log("Verified successfully");
      console.log(result);
      if(result){
        await fetch("/api/add", {
          method: "POST",
          body: JSON.stringify({
            fullName: fullName,
            phone: phone,
            adharNumber: adharNumber,
            address: address,
            location: location,
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data.message);
            setIsFormSubmitted(true);
          })
          .catch((error) => {
            console.log("failed");
            setIsFormSubmitted(false);
          });
      }
    } else {
      console.log("Cannot continue! as one or more fields are invalid");
    }
  }
  if (!isFormSubmitted) {
    return (
      <Card
        css={{
          width: "80%",
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
          label="Full Name"
          className="helperText"
          bordered
          shadow
          placeholder="Eg.Raghavendra S Bhat"
          onChange={(event) => {
            setFullName(event.target.value);
          }}
        ></Input>
        {fullNameError && <div style={{ color: "red" }}>{fullNameError}</div>}
        <Input
          css={{ marginBottom: "1.5rem", marginTop: "1rem" }}
          label="Phone"
          size="lg"
          bordered
          shadow
          placeholder="Eg.98451XXXXX"
          onChange={(event) => {
            setPhone(event.target.value);
          }}
        ></Input>
        {phoneError && <div style={{ color: "red" }}>{phoneError}</div>}
        <Textarea
          css={{ marginBottom: "1.5rem", marginTop: "1rem" }}
          rows={4}
          size="lg"
          label="Address"
          placeholder="Eg.Navanagar, MIG XXX, Xth Cross"
          bordered
          shadow
          onChange={(event) => {
            setAddress(event.target.value);
          }}
        ></Textarea>
        {addressError && <div style={{ color: "red" }}>{addressError}</div>}
        <Radio.Group
          orientation="horizontal"
          label="A3S Location"
          defaultValue="success"
          css={{ marginBottom: "1.5rem" }}
          value={location}
          onChange={(event) => {
            setLocation(event);
          }}
        >
          <Radio value="Annigeri" color="primary">
            Annigeri
          </Radio>
          <Radio value="Kundgol" color="secondary">
            Kundgol
          </Radio>
          <Radio value="Madaganur" color="error">
            Madaganur
          </Radio>
        </Radio.Group>
        {locationError && <div style={{ color: "red" }}>{locationError}</div>}
        <Input
          label="Adhar Number"
          placeholder="Eg.XXXXXXXXXXXXXXXX"
          css={{ marginBottom: "1.5rem", marginTop: "1rem" }}
          onChange={(event) => {
            setAdharNumber(event.target.value);
          }}
          size="lg"
          bordered
          shadow
        ></Input>
        {adharError && <div style={{ color: "red" }}>{adharError}</div>}
        <Button
          size="lg"
          css={{ width: "15%", marginTop: "1rem" }}
          color="success"
          onPress={() => {
            
            handleButtonClick();
            
          }}
        >
          Submit
        </Button>
        <div id='recaptcha-container' style={{margin:'0 auto', marginTop:'1.5rem'}}></div>
      </Card>
    );
        }
  if (isFormSubmitted) {
    return (
      <Card
        css={{
          width: "50vw",
          margin: "0 auto",
          marginTop: "5rem",
          padding: "5rem",
        }}
      >
        
        <span>
          <DoneIcon accentHeight="5"></DoneIcon>
          <p>Operator is added successfully!!</p>
        </span>
      </Card>
    );
  }
};

export default Add;
