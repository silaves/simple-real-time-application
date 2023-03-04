import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const DeleteItem = (props) => {
  const {handleSubmit, handleClose, nameItem, showModal, objectItem} = props;

  return (
    <>
      <Modal show={showModal} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar {nameItem}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Esta seguro de realizar esta acción?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => handleSubmit(objectItem)}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
