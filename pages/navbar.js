import { Navbar, Button, Link, Text } from "@nextui-org/react";
import { createTheme } from "@nextui-org/react";
import { NextUIProvider } from "@nextui-org/react";
import { Link as NextLink } from "next/link";
import React from "react";
import Cookies from "js-cookie";
import AppContext from "./AppContext";
import Router from "next/router";

export default function App() {
  const [loggedIn, setLoggedIn] = React.useState(AppContext); // Create state here
  return (
    <AppContext.Provider value={{ loggedIn, setLoggedIn }}>
      <NextUIProvider>
        <Navbar
          isBordered
          variant="static"
          style={{ textTransform: "uppercase" }}
        >
          <Navbar.Brand>
            <Navbar.Toggle aria-label="toggle navigation" />

            <Text b color="inherit" hideIn="xs" css={{ marginLeft: "1.25rem" }}>
              PEQUREL TECHNOLOGIES
            </Text>
          </Navbar.Brand>
          <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
            <Navbar.Link href="/home">Home</Navbar.Link>
            <Navbar.Link href="/locations">Locations</Navbar.Link>
            <Navbar.Link href="/additional">Additional</Navbar.Link>
          </Navbar.Content>
          <Navbar.Content>
            <Navbar.Link color="inherit">
              <Button auto animated
                onClick={() => {
                  Cookies.set("signedIn", false);
                  Router.push('/')
                  window.location.reload();
                }}
              >
                LOGOUT
              </Button>
            </Navbar.Link>
            <Navbar.Item>
              <Button auto flat as={Link} href="/contact">
                Contact Developer
              </Button>
            </Navbar.Item>
          </Navbar.Content>
          <Navbar.Collapse>
            <Navbar.CollapseItem>
              <Link
                color="inherit"
                css={{
                  minWidth: "100%",
                }}
                href="add"
              >
                Add Operator
              </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem>
              <Link
                color="inherit"
                css={{
                  minWidth: "100%",
                }}
                href="/list"
              >
                List Operator
              </Link>
            </Navbar.CollapseItem>
            <Navbar.CollapseItem>
              <Link
                color="inherit"
                css={{
                  minWidth: "100%",
                }}
                onClick={() => {
                  Cookies.set("signedIn", false);
                  Router.push('/')
                  window.location.reload();
                }}
              >
                Logout
              </Link>
            </Navbar.CollapseItem>
          </Navbar.Collapse>
        </Navbar>
      </NextUIProvider>
    </AppContext.Provider>
  );
}
