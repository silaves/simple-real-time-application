import {Alert, Button, Form, Modal} from "react-bootstrap";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {updateClient} from "../../store/actions/updateClient";
import {getClient, getClientById} from "../../store/actions/getClient";
import {hideClientModal} from "../../store/reducers/clientSlice";
import {hideAlert, showAlert} from "../../store/reducers/alertSlice";
import {newClient} from "../../store/actions/newClient";

export const NewClient = (props) => {
  const dispatch = useDispatch();
  const {
    newClientLoading,
    newClientError,
    newClientErrorData,
    newClientSuccess,
    showNewClientModal,
  } = useSelector(
    (state) => state.clientReducer
  );
  const { register, reset, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (body) => {
    dispatch(newClient({body}));
  }

  useEffect(() => {
    reset({
      email: "",
      name: "",
      lastname: "",
      phone: "",
      address: "",
    })
  }, [newClientSuccess])

  useEffect(() => {
    dispatch(hideClientModal());

    if (newClientSuccess) {
      dispatch(getClient({}));
      dispatch(showAlert({
        title: "Se guardaron los cambios correctamente",
        msg: "Se guardaron los cambios correctamente",
        variant: "success"
      }));
      setTimeout(() => {
        dispatch(hideAlert())
      }, 5000);
    }
  }, [newClientSuccess]);

  const handleNewModalClose = () => dispatch(hideClientModal());

  return (
    <Modal show={showNewClientModal} onHide={handleNewModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {newClientError && (
            <Alert key={"danger"} variant={"danger"}>
              {
                (newClientErrorData && newClientErrorData.email)?
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

          <Form.Group className="mb-3" controlId="formBasicName">
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

          <Form.Group className="mb-3" controlId="formBasicLastname">
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

          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label className="text-center">
              Telefono
            </Form.Label>
            <Form.Control
              type="text"
              isInvalid={errors.phone}
              placeholder="Ingrese su telefono"
              {...register("phone", {required: false, maxLength: 10})}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAddress">
            <Form.Label className="text-center">
              Dirección
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su dirección"
              isInvalid={errors.address}
              {...register("address", {required: false, maxLength: 80})}
            />
          </Form.Group>
          <div style={{textAlign:"right"}}>
            <Button
              variant="secondary"
              onClick={handleNewModalClose}
              disabled={newClientLoading}
            >
              Cerrar
            </Button>{' '}
            <Button
              variant="primary"
              type="submit"
              disabled={newClientLoading}
            >
              {newClientLoading ? 'Cargando...' : 'Registrar'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}