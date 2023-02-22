import { margin } from "@mui/system";
import { Loading, Card, Grid, Table , Input, Button, Modal,Textarea,Radio,Text} from "@nextui-org/react";
import { useState, useEffect } from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

import IconButton from "@mui/material/IconButton";

import DeleteIcon from "@mui/icons-material/Delete";

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
  const [id, setId] = useState('');
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
  async function handleButtonClick()  {
    fullNameValidityHandler();
    loctionValidityHandler();
    phoneValidityHandler();
    addressValidityHandler();
    adharNumberValidityHandler();
    if (!formisValid) {
      console.log("Cannot continue! as one or more fields are invalid");
    } else {
    await fetch('/api/modify',{
      method:'POST',
      body :  JSON.stringify({
        id : id,
        fullName:fullName,
        phone:phone,
        adharNumber:adharNumber,
        location : location,
        address : address
      })
    }).then((response) => {
         return response.json()
    }).then((data)=>{
        console.log(data.message);
    })
  }
}
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

  const [available, setAvailable] = useState(false);
  const [data, setData] = useState([]);
  const [visibility, setVisibility] = useState(false);

  const handler = () => setVisibility(true);
  const closeHandler = () => {
    setVisibility(false);
    console.log("closed");
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
              h: "$24",
              height: "60vh",
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
                <Table.Column align="right">Adhar Number</Table.Column>
                <Table.Column align="right">A3S location</Table.Column>
                <Table.Column align="right">Actions</Table.Column>
              </Table.Header>
              <Table.Body>
                {data.map((item) => (
                  <Table.Row key={item.fullName}>
                    <Table.Cell align="right">{item.fullName}</Table.Cell>
                    <Table.Cell align="right">{item.phone}</Table.Cell>
                    <Table.Cell align="right">{item.address}</Table.Cell>
                    <Table.Cell align="right">{item.adharNumber}</Table.Cell>
                    <Table.Cell align="right">{item.location}</Table.Cell>
                    <Table.Cell align="right">
                      <IconButton
                        onClick={() => {
                          setFullName(item.fullName);
                          setAddress(item.address);
                          setAdharNumber(item.adharNumber);
                          setLocation(item.location);
                          setPhone(item.phone);
                          setId(item.id);
                          handler();
                        }}
                      >
                        <ModeEditOutlineIcon></ModeEditOutlineIcon>
                      </IconButton>
                      <IconButton>
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
            blur
            noPadding
            aria-labelledby="modal-title"
            open={visibility}
            onClose={closeHandler}
           width='45vw'
            
          >
            <Modal.Header>
              
              <Text id="modal-title" size={18}>
           
            <Text color = 'gray' size={20} css={{textAlign:'center'}}>
            To make changes, edit the desired fields and then click on the submit button
            </Text>
          </Text>
            </Modal.Header>
            <Modal.Body>
              <Card
                css={{
                  width: "45vw",
                  margin: "0 auto",
                  padding: "3rem",
                  marginTop: "5rem",
                  marginBottom: "5rem",
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
                <Button
                  size="lg"
                  css={{ width: "15%", marginTop: "1rem" }}
                  color="success"
                  onPress={handleButtonClick}
                >
                  Update
                </Button>
              </Card>
            </Modal.Body>
          </Modal>
        
          </div>
    );
  }
};

export default List;
