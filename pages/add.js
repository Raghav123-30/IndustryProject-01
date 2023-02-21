import { Card, Input, Button, Textarea, Radio, css } from "@nextui-org/react";
import { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
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
  const fullNameValidityHandler = () => {
    if (!fullName) {
      setfullNameError("Full Name is required");
      setformisValid(false);
    } else if (fullName.trim().length < 3) {
      setfullNameError("Please enter a valid full name");
      setformisValid(false);
    } else {
      setfullNameError("");
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
      setphoneError("");
      setformisValid(true);
    }
  };
  const addressValidityHandler = () => {
    if (!address) {
      setaddressError("Address is required");
      setformisValid(false);
    } else if (address.trim().length < 3) {
      setaddressError("Address is invalid");
      setformisValid(false);
    } else {
      setaddressError("");
      setformisValid(true);
    }
  };
  const loctionValidityHandler = () => {
    if (!location) {
      setlocationError("Please choose location to be assigned to the operator");
      setformisValid(false);
    } else {
      setlocationError("");
      setformisValid(true);
    }
  };
  const adharNumberValidityHandler = () => {
    if (!adharNumber) {
      setadharError("Adhar Number is required");
      setformisValid(false);
    } else if (
      adharNumber.trim().length < 16 ||
      adharNumber.trim().length > 16
    ) {
      setadharError("Please enter a valid adhar number");
      setformisValid(false);
    } else {
      setAdharNumber(adharNumber);
      setadharError("");
      setformisValid(true);
    }
  };
  async function handleButtonClick() {
    fullNameValidityHandler();
    loctionValidityHandler();
    phoneValidityHandler();
    addressValidityHandler();
    adharNumberValidityHandler();
    if (!formisValid) {
      console.log("Cannot continue! as one or more fields are invalid");
    } else {
      await fetch('/api/add',{
        method : 'POST',
        body : JSON.stringify({
          fullName : fullName,
          phone : phone,
          adharNumber : adharNumber,
          address : address,
          location : location
        })
    
      }).then((response) => {
        return response.json()
      }).then((data) => {
        console.log(data.message);
        setIsFormSubmitted(true)
      }).catch((error) => {
        console.log("failed");
        setIsFormSubmitted(false);
      }) 
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
          onPress={handleButtonClick}
        >
          Submit
        </Button>
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
