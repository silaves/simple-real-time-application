import React, {useEffect} from 'react'
import {Alert, Button, Card, Col, Container, Form, Nav, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import { useForm } from 'react-hook-form';
import {useDispatch, useSelector} from "react-redux";
import {userLogin} from "../store/actions/userLogin";

export const Login = () => {
  const dispatch = useDispatch();
  const { loading, errorLogin, success } = useSelector(
    (state) => state.userInfoReducer
  );
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    dispatch(userLogin(data));
  }

  useEffect(()=>{
    if (success) {
      window.location.href = '/';
    }
  }, [success])

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <div style={{textAlign:"center"}}>
                    <h2 className="fw-bold mb-2 text-uppercase ">LogIn</h2>
                  </div>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      {errorLogin && (
                        <Alert key={"danger"} variant={"danger"}>
                          El email o password son incorrectos
                        </Alert>
                      )}
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Ingrese el email"
                          isInvalid={errors.email}
                          {...register("email", {
                            required: true,
                            maxLength: 80,
                          })}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          isInvalid={errors.password}
                          {...register("password", {required: true, maxLength: 80})}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <p className="small">
                        </p>
                      </Form.Group>
                      <div className="d-grid">
                        <Button
                          variant="primary"
                          type="submit"
                          disabled={loading}
                        >
                          {loading ? 'Cargando...' : 'Ingresar'}
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        No tienes una cuenta?{" "}
                        <Nav.Link style={{display:"inline"}} as={Link} className="text-primary fw-bold" to={"/sign-up"}>Registrarse</Nav.Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
