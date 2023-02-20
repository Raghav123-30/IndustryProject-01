import { Grid, Card, Text } from "@nextui-org/react";
export default function Home() {
  const MockItem = ({ text }) => {
    return (
      <Card css={{ h: "$24", $$cardColor: '$colors$primary',height:'60vh' }}>
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
      <Grid xs={9}  md={9}>
        <MockItem text="layout of location 1" />
      </Grid>
      <Grid xs={9} md={9} >
        <MockItem text="layout of location 2" />
      </Grid>
      <Grid xs={9} md={9} >
        <MockItem text="layout of location 3" />
      </Grid>
      
    </Grid.Container>
  );
}
