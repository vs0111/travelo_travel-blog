import React from "react";
import { Card, CardBody, CardTitle, Container } from "reactstrap";

function Fallback({query,selectedCategory}) {
  return (
   <Container>
     <div>
      <Card style={{height:"400px",marginLeft:"60px"}}>
        <CardBody>
          {
            query ?
            <CardTitle tag="h5">0 Result Of "{query}"</CardTitle>:
            <CardTitle tag="h5">0 Result</CardTitle>

          }
          <p>Sorry, no blogs were found for the searched location.</p>
          {/* You can add additional content or styling here */}
        </CardBody>
      </Card>
    </div>
   </Container>
  );
}

export default Fallback;
