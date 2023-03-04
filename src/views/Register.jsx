import React, {useEffect, useState} from 'react';
import {Alert, Button, Card, Col, Container, Form, Nav, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import { useForm } from 'react-hook-form';
import {useDispatch, useSelector} from "react-redux";
import {userRegister} from "../store/actions/userRegister";

export const Register = () => {
  const dispatch = useDispatch();
  const { loading, error, success, errorPayload } = useSelector(
    (state) => state.userInfoReducer
  );
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    dispatch(userRegister(data));
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
                    <h2 className="fw-bold mb-2 text-uppercase ">Registro</h2>
                  </div>
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      {error && (
                        <Alert key={"danger"} variant={"danger"}>
                          {
                            (errorPayload && errorPayload.email)?
                              "El correo ya existe":"Hubo un error al procesar la informacion, por favor revise la informacion enviada"
                          }
                        </Alert>
                      )}
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Ingrese su email"
                          isInvalid={errors.email}
                          {...register("email", {required: true, maxLength: 80})}
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

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Nombre
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Ingrese su nombre"
                          isInvalid={errors.name}
                          {...register("name", {required: true, maxLength: 80})}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Apellido
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Ingrese su apellido"
                          isInvalid={errors.lastname}
                          {...register("lastname", {required: true, maxLength: 80})}
                        />
                      </Form.Group>

                      {/*<Form.Group className="mb-3" controlId="formBasicEmail">*/}
                      {/*  <Form.Label className="text-center">*/}
                      {/*    Telefono*/}
                      {/*  </Form.Label>*/}
                      {/*  <Form.Control*/}
                      {/*    type="text"*/}
                      {/*    placeholder="Ingrese su telefono"*/}
                      {/*    {...register("phone", {required: true, maxLength: 10})}*/}
                      {/*  />*/}
                      {/*</Form.Group>*/}

                      {/*<Form.Group className="mb-3" controlId="formBasicEmail">*/}
                      {/*  <Form.Label className="text-center">*/}
                      {/*    Dirección*/}
                      {/*  </Form.Label>*/}
                      {/*  <Form.Control*/}
                      {/*    type="text"*/}
                      {/*    placeholder="Ingrese su dirección"*/}
                      {/*    {...register("address", {required: true, maxLength: 80})}*/}
                      {/*  />*/}
                      {/*</Form.Group>*/}

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
                          {loading ? 'Cargando...' : 'Registrarse'}
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Tienes una cuenta?{" "}
                        <Nav.Link style={{display:"inline"}} as={Link} className="text-primary fw-bold" to={"/sign-in"}>Ingresar</Nav.Link>
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
