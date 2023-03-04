import {Card, Col, Container, Row} from "react-bootstrap";
import MainLayout from "../components/Layout/MainLayout";
import doge from "../assets/maintenance_mode.png";

export const Product = () => {

  return (
    <MainLayout>
      <Container>
        <Row>
          <Col>
            <Card style={{marginTop:20}}>
              <Card.Header>Modulo de Productos</Card.Header>
              <Card.Body>
                <div style={{textAlign: "center"}}>
                  <h5>Ops, estamos trabajando en ello...</h5>
                  <img src={doge} width={"300px"}/>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  )
}