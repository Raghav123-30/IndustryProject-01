import { Grid, Card, Text } from "@nextui-org/react";
export default function Locations() {
  const MockItem = ({ text }) => {
    return (
      <Card css={{ h: "$24", $$cardColor: '$colors$error',height:'60vh' }}>
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
        <MockItem text="Choose the location here!" />
      </Grid>
      <Grid xs={8} md={6} >
        <MockItem text="Stats for a location will be displayed here!" />
      </Grid>
      <Grid xs={8} md={8} >
        <MockItem text="A3s layout of that location will be displayed here!" />
      </Grid>
      
    </Grid.Container>
  );
}



