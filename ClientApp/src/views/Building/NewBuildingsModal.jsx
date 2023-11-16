import FontAwesome from "react-fontawesome";
import { Formik } from "formik";

import { Modal, Button } from "react-bootstrap";
import { TextField, TextAreaField, SubmitBtn } from "../../components/Form";

const NewBuildingsModal = ({
  show,
  setShow,
  building,
  schema,
  handleSubmit,
}) => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={building}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {() => (
        <>
          <Modal show={show}>
            <Modal.Header>
              <Modal.Title>
                {building.id === 0 ? "New Building" : "Update Building"}
              </Modal.Title>
              <Button
                size="sm"
                variant="light"
                className="float-right"
                onClick={() => setShow(false)}
              >
                <FontAwesome
                  style={{ fontSize: 20 }}
                  className="feather icon-x"
                />
              </Button>
            </Modal.Header>
            <Modal.Body>
              <TextField name="name" label="Name" required />
              <TextAreaField name="address" label="Address" required />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setShow(false)} className="btn-secondary">
                Close
              </Button>
              <SubmitBtn title={building.id === 0 ? "Create" : "Update"} />
            </Modal.Footer>
          </Modal>
        </>
      )}
    </Formik>
  );
};

export default NewBuildingsModal;
