import {useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, Row, Stack} from "react-bootstrap";
import MainLayout from "../components/Layout/MainLayout";
import {SearchInput} from "../components/SearchInput";
import {SimpleTable} from "../components/Table/SimpleTable";
import {useDispatch, useSelector} from "react-redux";
import {getClient, getClientById} from "../store/actions/getClient";
import {deleteClient} from "../store/actions/deleteClient";
import {hideClientModal, searchByName, showClientModal} from "../store/reducers/clientSlice";
import {hideAlert, showAlert} from "../store/reducers/alertSlice";
import {DeleteItem} from "../components/Modal/DeleteItem";
import {EditClient} from "../components/Features/EditClient";
import {NewClient} from "../components/Features/NewClient";

export const Clients = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const headers = ["Email", "Nombre", "Apellido", "Telefono", "Direccion", "Accion"];
  const dispatch = useDispatch();
  const {
    getClientLoading,
    filteredClients,
    deleteClientError,
    deleteClientSuccess,
  } = useSelector(
    (state) => state.clientReducer
  );

  useEffect(() => {
    dispatch(getClient({}));
  }, []);

  useEffect(() => {
    if (deleteClientSuccess) {
      setDeleteModal(false);
      dispatch(getClient({}));
    }
  }, [deleteClientSuccess]);

  useEffect(() => {
    if (deleteClientError) {
      dispatch(showAlert({
        title: "Ocurrio un problema",
        msg: "Ocurrio un problema con la solicitud, por favor intente de nuevo.",
        variant: "danger"
      }));
      setDeleteModal(false);
      setTimeout(() => {
        dispatch(hideAlert())
      }, 5000);
    }
  }, [deleteClientError]);

  // build table
  const buildData = (arrayData) => {
    const data = [];
    const columns = ["email", "name", "lastname", "phone", "address"];

    for (const item of arrayData) {
      let objectRow = {};
      for (const col of columns) {
        objectRow[col] = item[col];
      }
      objectRow["action"] = (
        <div>
          <Button variant="outline-primary" size={"sm"} onClick={() => handleEditItem(item)}>Editar</Button>{' '}
          <Button variant="outline-danger" size={"sm"} onClick={() => handleDeleteItem(item)}>Eliminar</Button>
        </div>
      );
      data.push(objectRow);
    }
    return data;
  }

  const handleEditItem = (item) => {
    dispatch(showClientModal("edit"))
    dispatch(getClientById({id: item._id}))
  }

  // manage delete modal

  const handleDeleteItem = (item) => {
    setItemToDelete(item);
    setDeleteModal(true);
  }

  const handleSubmitDeleteItem = (item) => {
    dispatch(deleteClient({id:item._id}));
  }

  const handleDeleteModalClose = () => setDeleteModal(false);

  // manage input search

  const handleSearchChange = (event) => {
    setInputSearch(event.target.value);
  };

  const handleSearch = () => {
    dispatch(searchByName(inputSearch))
  }

  const handleClearSearch = () => {
    setInputSearch("");
    dispatch(searchByName(""))
  }

  const handleNewClient = () => {
    dispatch(showClientModal("new"));
  }

  const handleUpdateListClient = () => {
    dispatch(getClient({}));
  }

  return (
    <MainLayout>
      <DeleteItem
        objectItem={itemToDelete}
        handleClose={handleDeleteModalClose}
        nameItem={itemToDelete?(itemToDelete.name + " " + itemToDelete.lastname):""}
        showModal={deleteModal}
        handleSubmit={handleSubmitDeleteItem}
      />
      <EditClient/>
      <NewClient/>
      <Container>
        <Row>
          <Col>
            <Card style={{marginTop:20}}>
              {/*<Card.Header>clients</Card.Header>*/}
              <Card.Body>
                <Button variant="primary" onClick={handleNewClient}>Nuevo</Button>{' '}
                <Button variant="outline-secondary" onClick={handleUpdateListClient}>Actualizar</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card style={{marginTop:20}}>
              <Card.Header>
                <SearchInput
                  value={inputSearch}
                  handleClear={handleClearSearch}
                  handleChange={handleSearchChange}
                  handleSearch={handleSearch}
                />
              </Card.Header>
              <Card.Body>
                <SimpleTable
                  data={buildData(filteredClients)}
                  headers={headers}
                  loading={getClientLoading}
                >
                </SimpleTable>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  )
}