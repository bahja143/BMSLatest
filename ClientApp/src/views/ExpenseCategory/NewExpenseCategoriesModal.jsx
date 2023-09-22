import FontAwesome from "react-fontawesome";
import { Formik } from "formik";

import { Modal, Button } from "react-bootstrap";
import { TextField, SubmitBtn } from "../../components/Form";

const NewExpenseCategoriesModal = ({
  show,
  setShow,
  category,
  schema,
  handleSubmit,
}) => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={category}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {() => (
        <>
          <Modal show={show}>
            <Modal.Header>
              <Modal.Title>
                {category.id === 0 ? "New Category" : "Update Category"}
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
              <TextField name="name" label="Name" required />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setShow(false)} className="btn-secondary">
                Close
              </Button>
              <SubmitBtn title={category.id === 0 ? "Create" : "Update"} />
            </Modal.Footer>
          </Modal>
        </>
      )}
    </Formik>
  );
};

export default NewExpenseCategoriesModal;
