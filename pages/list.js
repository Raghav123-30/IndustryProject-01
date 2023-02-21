import { margin } from "@mui/system";
import { Loading, Card, Grid, Table } from "@nextui-org/react";
import { useState, useEffect } from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

import IconButton from "@mui/material/IconButton";

import DeleteIcon from "@mui/icons-material/Delete";
const List = () => {
  const [available, setAvailable] = useState(false);
  const [data, setData] = useState([]);
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
                <Table.Column>Full Name</Table.Column>
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
                      <IconButton>
                        <ModeEditOutlineIcon></ModeEditOutlineIcon>
                      </IconButton>
                      <IconButton>
                        <DeleteIcon style={{ marginLeft: "0.25rem" }} ></DeleteIcon>
                      </IconButton>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Card>
        </Grid>
      </Grid.Container>
    );
  }
};

export default List;
