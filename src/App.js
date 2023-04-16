import { useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Form, Modal } from "react-bootstrap";

// Redux actions
import { addUser, deleteUser, editUser } from "./redux/Reducers/UserReducer";

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [edit, setEdit] = useState({});
  const [nameEdit, setNameEdit] = useState("");
  const [mailEdit, setMailEdit] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);

  const handleAddNewUser = () => {
    dispatch(
      addUser({
        id: users[users.length - 1].id + 1,
        name: name,
        email: email,
      })
    );

    setName("");
    setEmail("");
  };

  const handleDeleteUSer = (id) => {
    dispatch(deleteUser(id));
  };

  const handleEditUser = (user) => {
    setNameEdit(user.name);
    setMailEdit(user.email);
    handleShow();
    setEdit(user);
  };

  const handleConfirmEdit = (user) => {
    const payload = { ...edit };
    payload.name = nameEdit;
    payload.email = mailEdit;
    dispatch(editUser(payload));
  };

  return (
    <div className="app">
      <h1>User Management</h1>
      <Form className="mt-3 mb-5">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>
        <Button
          variant="success"
          onClick={(e) => {
            handleAddNewUser();
          }}
        >
          Add user
        </Button>
      </Form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new name"
              value={nameEdit}
              onChange={(e) => {
                setNameEdit(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter new email"
              value={mailEdit}
              onChange={(e) => {
                setMailEdit(e.target.value);
              }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              handleConfirmEdit();
              handleClose();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={(e) => {
                        handleEditUser(user);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger ms-2"
                      onClick={(e) => {
                        handleDeleteUSer(user.id);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default App;
