import { Grid, Card, Text } from "@nextui-org/react";

export default function About() {

  const MockItem = ({ text }) => {
    return (
      <Card css={{ h: "$24", $$cardColor: '$colors$success',height:'50vh' }}>
        <Card.Body>
          <Text h6 size={15} color="white" css={{ mt: 0 }}>
            {text}
          </Text>
        </Card.Body>
      </Card>
    );
  };
  return (
   
    <Grid.Container gap={3} justify="center">
      <Grid xs={8}  md={4}>
        <MockItem text="item 1 of 3" />
      </Grid>
      <Grid xs={8} md={6} >
        <MockItem text="item 2 of 3" />
      </Grid>
      <Grid xs={8} md={6} >
        <MockItem text="item 3 of 3" />
      </Grid>
      <Grid xs={8} md={4} >
        <MockItem text="item 4 of 4" />
      </Grid>
      <Grid xs={8} md={5} >
        <MockItem text="item 5 of 5" />
      </Grid>
    </Grid.Container>
    
  );
}
