import { Card, Input, Button, Textarea, Radio ,css} from "@nextui-org/react";
import { useState } from "react";

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
  const fullNameValidityHandler = () => {
   
    if (!fullName) {
      setfullNameError("Full Name is required");
      setformisValid(false);
    } else if (fullName.trim().length < 3) {
      setfullNameError("Please enter a valid full name");
      setformisValid(false);
    } else {
      
      setfullNameError('');
      setformisValid(true);
    }
  };
  const phoneValidityHandler = () => {
   
    if (!phone) {
      setphoneError("Phone number is required");
      setformisValid(false);
    } else if (phone.trim().length < 10 || phone.trim().length > 10) {
      setphoneError("Phone number is invalid");
      setformisValid(false);
    } else {
     
      setphoneError('');
      setformisValid(true);
    }
  };
  const addressValidityHandler = () => {
   
    if (!address) {
      setaddressError("Address is required");
      setformisValid(false);
    }
    if (address.trim().length < 3) {
      setaddressError("Address is invalid");
      setformisValid(false);
    } else {
     
      setaddressError('');
      setformisValid(true);
    }
  };
  const loctionValidityHandler = () => {
    
    if (!location) {
      setlocationError("Please choose location to be assigned to the operator");
      setformisValid(false);
    } else {
     
      setlocationError('');
      setformisValid(true);
    }
  };
  const adharNumberValidityHandler = () => {
    
    if (!adharNumber) {
      setadharError("Adhar Number is required");
      setformisValid(false);
    } else if (adharNumber.trim().length < 16 || adharNumber.trim().length > 16) {
      setadharError("Please enter a valid adhar number");
      setformisValid(false);
    } else {
      setAdharNumber(adharNumber);
      setadharError('');
      setformisValid(true);
    }
  };
  const handleButtonClick = () => {
    if (!formisValid) {
      console.log("One or more fields are invalid so cannot proceed!");
    } else {
      console.log(fullName, phone, location, address, adharNumber);
    }
  };
  return (
    <Card
      css={{
        width: "80%",
        margin: "0 auto",
        padding: "2rem",
        marginTop: "5rem",
      }}
    >
      <Input
        css={{ marginBottom: "1.2rem" }}
        bordered
        animated
        label="Full Name"
        className='helperText'
        placeholder="Eg.Raghavendra S Bhat"
        onChange={(event) => {
            setFullName(event.target.value)
            fullNameValidityHandler()
            
        }}
        onBlur={fullNameValidityHandler}
        helperText={fullNameError}
       
      ></Input>
      {/* {fullNameError && (
        <div style={{ color: "red" }}>{fullNameError}</div>
      )} */}
      <Input
        css={{ marginBottom: "1.2rem"}}
        label="Phone"
        bordered
        animated
        placeholder="Eg.98451XXXXX"
        onChange ={(event) => {
            setPhone(event.target.value)
            phoneValidityHandler();
           
        }}
        onBlur={phoneValidityHandler}
        helperText={phoneError}
      ></Input>
      {/* {phoneError && (
        <div style={{ color: "red" }}>{phoneError}</div>
      )} */}
      <Textarea
        css={{ marginBottom: "1.2rem" }}
        rows={4}
        label="address"
        placeholder="Eg.Navanagar, MIG XXX, Xth Cross"
        bordered
        animated
        onChange={(event) => {
            setAddress(event.target.value);
            addressValidityHandler();
            
        }}
        onBlur={addressValidityHandler}
        helperText = {addressError}
      ></Textarea>
      {/* {addressError && (
        <div style={{ color: "red" }}>{addressError}</div>
      )} */}
      <Radio.Group
        orientation="horizontal"
        label="A3S Location"
        defaultValue="success"
        css={{ marginBottom: "1.2rem" }}
        value={location}
        onChange = {(event)=>{
            setLocation(event);
            loctionValidityHandler();
            
        }}
        onBlur={loctionValidityHandler}
        helperText = {locationError}
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
      {locationError && (
        <div style={{ color: "red" }}>{locationError}</div>
      )}
      <Input
         bordered
         animated
        label="Adhar Number"
        placeholder="Eg.XXXXXXXXXXXXXXXX"
        css={{ marginBottom: "1.2rem" }}
        onChange={(event) => {
            setAdharNumber(event.target.value);
            adharNumberValidityHandler();
           
        }}
        onBlur={adharNumberValidityHandler}
        helperText={adharError}
      ></Input>
      {/* {adharError && (
        <div style={{ color: "red" }}>{adharError}</div>
      )} */}
      <Button
        css={{ width: "15%" }}
        color="success"
        onPress={handleButtonClick}
      >
        Submit
      </Button>
    </Card>
  );
};

export default Add;
