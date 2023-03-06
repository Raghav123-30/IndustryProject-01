import { margin, width } from "@mui/system";
import {
  Loading,
  Card,
  Grid,
  Table,
  Input,
  Button,
  Modal,
  Textarea,
  Radio,
  Text,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import ReportProblemSharpIcon from "@mui/icons-material/ReportProblemSharp";
import React from "react";
import DoneIcon from "@mui/icons-material/Done";
import IconButton from "@mui/material/IconButton";

import DeleteIcon from "@mui/icons-material/Delete";

import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";


const List = () => {
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
  const [id, setId] = useState("");
  const { loggedIn, setLoggedIn } = useState();
  const [deleted, setDeleted] = useState(false);
  const [editionModal, setEditionModal] = useState(false);
  const [modified, setModified] = useState(false);
  const [goBack, setGoBack] = useState(false);
  const [verified, setVerified] = useState(false);
  const [otphandlervisible, setotphandlervisible] = useState(false);
  const [otp, setOtp] = useState();
  const [confirmFunction, setConfirmFunction] = useState();
  const [otpText, setOtpText] = useState('');
  const [added, setAdded] = useState(false);
  const [newPhone, setnewPhone] = useState('');
  const [requestMessage, setRequestMessage] = useState('');
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
        setModified(true);
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
  const checkfornewPhone = () => {
        if(phone == newPhone){
          return false;
        }
        return true;
  }
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
  async function submitToFirestore(){
    if(validateInputs()){
      try{
        await fetch("/api/modify", {
          method: "POST",
          body: JSON.stringify({
            id: id,
            fullName: fullName,
            phone: phone,
            adharNumber: adharNumber,
            location: location,
            address: address,
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data.message);
            setEditionModal(true);
          });
      }
      catch{
        console.log("Something went wrong!");
      }
      }
    }
  
  async function validateInputs() {
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
  )  {
      return true;
    }
    else{
       return false;
    }
  }
  
  async function deleteHandler() {
    await fetch("/api/delete", {
      method: "POST",
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.message);
        setDeleted(true);
      });
  }
  

  const [available, setAvailable] = useState(false);
  const [data, setData] = useState([]);
  const [visibility, setVisibility] = useState(false);

  const handler = () => setVisibility(true);
  const closeHandler = () => {
    setVisibility(false);
    console.log("closed");
    
  };
  const [delModalVisible, setDelModalVisible] = useState(false);
  const delModalHandler = () => {
    setDelModalVisible(true);
  };
  const closedelModalHandler = () => {
    setDelModalVisible(false);
   
  };
  const modify = (key) => {
    const documentToModify = data.find((doc) => doc.phone === key);
    if (documentToModify) {
      const location = prompt("Enter new location");
      documentToModify.location = location;
      console.log(documentToModify);
    }
  };
  useEffect(() => {
    async function getData() {
      await fetch("/api/list", {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setData(data.data);
          console.log(data);
          console.log(data.message);
          setAvailable(true);
        })
        .catch((error) => {
          console.log("Something went wrong");
          setAvailable(true);
        });
    }
    getData();
  }, []);
  if (!available) {
    return (
      <Loading size="xl" css={{ marginLeft: "35%", marginTop: "5rem" }}>
        {" "}
        Fetching latest data from the server
      </Loading>
    );
  }
  if (available && data.length == 0) {
    return (
      <Card
        css={{
          marginTop: "5rem",
          padding: "5rem",
          width: "50vw",
          marginLeft: "30%",
        }}
      >
        <div style={{ color: "red", margin: "0 auto" }}>
          Something went wrong! We are unable to fetch data from server, please
          try again later
        </div>
      </Card>
    );
  } else {
    return (
      <div>
        <Grid.Container justify="center">
          <Grid xs={10} md={10}>
            <Card
              css={{
                
                padding: "5rem",
                marginTop: "5rem",
              }}
            >
              <Table
                aria-label="Example static collection table"
                css={{
                  align: "center",
                }}
                selectionMode="single"
              >
                <Table.Header>
                  <Table.Column align="right">Full Name</Table.Column>
                  <Table.Column align="right">Phone Number</Table.Column>
                  <Table.Column align="right">Address</Table.Column>
                  <Table.Column align="right">A3S location</Table.Column>
                  <Table.Column align="right">Adhar Number</Table.Column>
                  <Table.Column align="right">Actions</Table.Column>
                </Table.Header>
                <Table.Body>
                  {data.map((item) => (
                    <Table.Row key={item.fullName}>
                      <Table.Cell align="right">{item.fullName}</Table.Cell>
                      <Table.Cell align="right">{item.phone}</Table.Cell>
                      <Table.Cell align="right">{item.address}</Table.Cell>
                      <Table.Cell align="right">{item.location }</Table.Cell>
                      <Table.Cell align="right">{item.adharNumber || '    N/A    '}</Table.Cell>
                      <Table.Cell align="right">
                        <IconButton
                          onClick={() => {
                            setFullName(item.fullName);
                            setAddress(item.address);
                            setAdharNumber(item.adharNumber);
                            setLocation(item.location);
                            setPhone(item.phone);
                            setnewPhone(item.phone)                            
                            handler();
                            setId(item.id);
                          }}
                        >
                          <ModeEditOutlineIcon></ModeEditOutlineIcon>
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setId(item.id);
                            setDelModalVisible(true);
                          }}
                        >
                          <DeleteIcon
                            style={{ marginLeft: "0.25rem" }}
                          ></DeleteIcon>
                        </IconButton>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Card>
          </Grid>
        </Grid.Container>
        <Modal
          closeButton
          noPadding
          aria-labelledby="modal-title"
          open={visibility}
          onClose={closeHandler}
          width="60%"
        >
          {/* <Modal.Header>
            <Text id="modal-title" size={18}>
              <Text b color="black" size={20} css={{ textAlign: "center" }}>
                Edit Details
              </Text>
            </Text>
          </Modal.Header> */}
          <Modal.Body>
            {!editionModal && (
              <Card
                css={{
                  padding: "3rem",
                  // marginTop: "5rem",
                  // marginBottom: "5rem",
                  height: "fit-content",
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
                  value={fullName}
                  placeholder="Eg.Raghavendra S Bhat"
                  onChange={(event) => {
                    setFullName(event.target.value);
                  }}
                ></Input>
                {fullNameError && (
                  <div style={{ color: "red" }}>{fullNameError}</div>
                )}
                <Input
                  css={{ marginBottom: "1.5rem", marginTop: "1rem" }}
                  label="Phone"
                  size="lg"
                  bordered
                  shadow
                  value={phone}
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
                  value={address}
                  placeholder="Eg.Navanagar, MIG XXX, Xth Cross"
                  bordered
                  shadow
                  onChange={(event) => {
                    setAddress(event.target.value);
                  }}
                ></Textarea>
                {addressError && (
                  <div style={{ color: "red" }}>{addressError}</div>
                )}
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
                {locationError && (
                  <div style={{ color: "red" }}>{locationError}</div>
                )}
                <Input
                  label="Adhar Number"
                  placeholder="Eg.XXXXXXXXXXXXXXXX"
                  css={{ marginBottom: "1.5rem", marginTop: "1rem" }}
                  onChange={(event) => {
                    setAdharNumber(event.target.value);
                  }}
                  value={adharNumber}
                  size="lg"
                  bordered
                  shadow
                ></Input>
                {adharError && <div style={{ color: "red" }}>{adharError}</div>}
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around',gap:'1rem'}}>
                <Button
                  size="lg"
                  css={{ width: "15%", margin: "0 auto", marginTop: "1rem" }}
                  color="error"
                  onPress={() => {
                    setEditionModal(true);
                    
                   
                  }}
                >
                  Update
                </Button>
                <Button
                  color="primary"
                  size="lg"
                  css={{ width: "15%", margin: "0 auto", marginTop: "1rem" }}
                  onClick={() => {
                   
                    closeHandler();
                  }}
                >
                  Go back
                </Button>
                </div>
              </Card>
            )}
            {editionModal && !modified && (
              <Card style={{ padding: "2vw" }}>
                <div
                  style={{
                    padding: "2vw",
                    display: "flex",
                    flexDirection: "row",
                    justifyItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                  }}
                >
                  <ReportProblemSharpIcon
                    style={{ height: "3.5vh", width: "3.5vw" }}
                  ></ReportProblemSharpIcon>
                  <Text style={{ marginBottom: "1.5rem" }} size={20}>
                    On clicking confirm details of operator will be edited in
                    the database. Do you like to proceed?
                  </Text>
                </div>

                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly',gap:'1rem'}}>
                <Button
                  color="error"
                  style={{
                    width: "20%",
                    margin: "0 auto",
                    fontSize: "1.2rem",
                   
                  }}
                  onClick={() => {
                    if(!checkfornewPhone()){
                       
                      submitToFirestore();
                      setModified(true);
                    window.location.reload();
                  }
                  else{
                    renderOtpVerification();
                      setotphandlervisible(true);
                  }
                   
                    
                  }}
                >
                  confirm
                </Button>
                <Button
                  color="primary"
                  style={{
                    width: "20%",
                    margin: "0 auto",
                    fontSize: "1.2rem",
                   
                  }}
                  onClick={() => {
                    setModified(false);
                    setEditionModal(false);
                  }}
                >
                  Go back
                </Button>
               
                </div>
              </Card>
            )}
            {modified && (
              <Card
                style={{
                  padding: "2vw",
                  display: "flex",
                  flexDirection: "row",
                  justifyItems: "center",
                  justifyContent: "center",
                }}
              >
                <DoneIcon
                  style={{
                    width: "3.5vw",
                    height: "3.5vh",
                    background: "green",
                    color: "whitesmoke",
                    marginRight: "1.2rem",
                  }}
                ></DoneIcon>
                <Text style={{ fontSize: "1.25rem", color: "red" }}>
                  Details of operator has been modified successfully
                </Text>
              </Card>
            )}
          </Modal.Body>
        </Modal>
        <Modal
          closeButton
          noPadding
          aria-labelledby="modal-title"
          open={delModalVisible}
          onClose={closedelModalHandler}
          width="45vw"
        >
          <Modal.Body>
            {!deleted && (
              <Card style={{ padding: "2vw" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "0.25rem",
                  }}
                >
                  <ReportProblemSharpIcon
                    style={{ height: "3.5vh", width: "3.5vw" }}
                  ></ReportProblemSharpIcon>
                  <Text style={{ marginBottom: "1.5rem" }} size={20}>
                    On clicking confirm operator will be removed from the
                    database. Do you like to proceed?
                  </Text>
                </div>

                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
                <Button color="primary"
                  style={{
                    width: "20%",
                    fontSize: "1.25rem",
                    
                    color: "white",
                    margin: "0 auto",
                  }}
                  onClick={closedelModalHandler}
                >
                  Go back
                </Button>
                <Button color="success"
                  style={{
                    width: "20%",
                    fontSize: "1.25rem",
                   
                    color: "white",
                    margin:'0 auto',
                    marginLeft:'1.5rem'
                  }}
                  onClick={() => {
                    deleteHandler();
                    window.location.reload();
                  }}
                >
                  Confirm
                </Button>
                </div>
              </Card>
            )}
            {deleted && (
              <Card
                style={{
                  padding: "2vw",
                  display: "flex",
                  flexDirection: "row",
                  justifyItems: "center",
                  justifyContent: "center",
                }}
              >
                <DoneIcon
                  style={{
                    width: "3.5vw",
                    height: "3.5vh",
                    background: "green",
                    color: "whitesmoke",
                    marginRight: "1.2rem",
                  }}
                ></DoneIcon>
                <Text style={{ fontSize: "1.25rem", color: "red" }}>
                  Operator has been removed successfully
                </Text>
              </Card>
            )}
          </Modal.Body>
        </Modal>
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
       
      </div>
    );
  }
};

export default List;
