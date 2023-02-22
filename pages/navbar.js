import { Navbar, Button, Link, Text } from "@nextui-org/react";
import { createTheme } from "@nextui-org/react"
import { NextUIProvider } from "@nextui-org/react"
import {Link as NextLink} from "next/link";

export default function App() {
  
  const collapseItems = [
    "Add Operator",
    "List Operator",
    "Logout"
  ];

  return (
     <NextUIProvider  >
      <Navbar isBordered variant="static" style={{textTransform:'uppercase'}} >
        <Navbar.Brand>
          <Navbar.Toggle aria-label="toggle navigation" />
          
          <Text b color="inherit" hideIn="xs" css={{marginLeft:'1.25rem'}}>
            PEQUREL TECHNOLOGIES
          </Text>
        </Navbar.Brand>
        <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
          <Navbar.Link href="/home">Home</Navbar.Link>
          <Navbar.Link href="/locations">
            Locations
          </Navbar.Link>
          <Navbar.Link href="/additional">
            
              Additional
            
          </Navbar.Link>
          
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Link color="inherit" href="/logout">
            Logout
          </Navbar.Link>
          <Navbar.Item>
            <Button auto flat as={Link} href="/contact">
              Contact Developer
            </Button>
          </Navbar.Item>
        </Navbar.Content>
        <Navbar.Collapse>
       
          <Navbar.CollapseItem >
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
          <Navbar.CollapseItem >
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
          <Navbar.CollapseItem >
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              href="/logout"
            >
             Logout
            </Link>
          </Navbar.CollapseItem>
       
       
      </Navbar.Collapse>
      </Navbar>
      </NextUIProvider>
    
  )
}
