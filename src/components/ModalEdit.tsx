"use client";

import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { updateUser } from "@/services/UserService";
import { toast } from "react-toastify";

const ModalEdit = (props: any) => {
  const { handleClose, show, dataUserEdit, handleEditUserFromModal } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const handleEditUser = async () => {
    let res = await updateUser(name, job);
    if (res && res.updateAt) {
      handleEditUserFromModal({
        first_name: name,
        id: dataUserEdit.id,
      });
      toast.success("Edit user success!");
    } else {
      toast.warning("Edit user failed!");
    }
  };

  useEffect(() => {
    if (show) {
      setName(dataUserEdit.first_name);
      setJob(dataUserEdit.last_name);
    }
  }, [dataUserEdit]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Job</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter job"
                value={""}
                onChange={(e) => setJob(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleEditUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEdit;
