import FontAwesome from "react-fontawesome";
import { Formik } from "formik";

import { Modal, Button } from "react-bootstrap";
import {
  TextField,
  TextAreaField,
  SelectField,
  SubmitBtn,
} from "../../components/Form";

const NewRoomModal = ({
  isLoading,
  show,
  setShow,
  room,
  buildings,
  schema,
  handleSubmit,
}) => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={room}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {() => (
        <>
          <Modal show={show}>
            <Modal.Header>
              <Modal.Title>
                {room.id === 0 ? "New Room" : "Update Room"}
              </Modal.Title>
              <Button
                size="sm"
                variant="light"
                className="float-right"
                onClick={() => setShow(false)}
              >
                <FontAwesome style={{ fontSize: 15 }} name="fas fa-close" />
              </Button>
            </Modal.Header>
            <Modal.Body>
              <TextField name="roomNumber" label="Room No" required />
              <TextField
                name="roomSizeInSq"
                label="Room Size(Karre)"
                type="number"
                required
              />
              <TextField name="floorNo" label="Floor No" required />
              <SelectField
                name="buildingId"
                label="Building"
                options={buildings.map((b) => ({ label: b.name, value: b.id }))}
                required
                isLoading={isLoading}
              />
              <TextAreaField name="description" label="Description" />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setShow(false)} className="btn-secondary">
                Close
              </Button>
              <SubmitBtn title={room.id === 0 ? "Create" : "Update"} />
            </Modal.Footer>
          </Modal>
        </>
      )}
    </Formik>
  );
};

export default NewRoomModal;
