import {Alert, Button, Form, Modal} from "react-bootstrap";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {updateClient} from "../../store/actions/updateClient";
import {getClient, getClientById} from "../../store/actions/getClient";
import {hideClientModal} from "../../store/reducers/clientSlice";
import {hideAlert, showAlert} from "../../store/reducers/alertSlice";

export const EditClient = (props) => {
  const dispatch = useDispatch();
  const {
    updateClientLoading,
    updateClientError,
    updateClientErrorData,
    updateClientSuccess,
    showClientModal,
    client,
    getClientIdSuccess,
  } = useSelector(
    (state) => state.clientReducer
  );
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    dispatch(updateClient({id: client._id, info: data}));
  }

  useEffect(() => {
    reset({
      name: client.name,
      email: client.email,
      lastname: client.lastname,
      phone: client.phone,
      address: client.address,
    });
  }, [reset, client]);

  useEffect(() => {
    dispatch(hideClientModal());
    if (updateClientError) {
      dispatch(showAlert({
        title: "Ocurrio un problema",
        msg: "Ocurrio un problema con la solicitud, por favor intente de nuevo.",
        variant: "danger"
      }));
    }
  }, [updateClientError]);

  useEffect(() => {
    dispatch(hideClientModal());

    if (updateClientSuccess) {
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
  }, [updateClientSuccess]);

  const handleEditModalClose = () => dispatch(hideClientModal());

  return (
    <Modal show={showClientModal} onHide={handleEditModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
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
              {...register("address", {required: false, maxLength: 80})}
            />
          </Form.Group>
          <div style={{textAlign:"right"}}>
            <Button
              variant="secondary"
              onClick={handleEditModalClose}
              disabled={updateClientLoading}
            >
              Cerrar
            </Button>{' '}
            <Button
              variant="primary"
              type="submit"
              disabled={updateClientLoading}
            >
              {updateClientLoading ? 'Cargando...' : 'Guardar Cambios'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}