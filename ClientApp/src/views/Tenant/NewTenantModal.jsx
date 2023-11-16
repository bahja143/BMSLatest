import FontAwesome from "react-fontawesome";
import { Formik } from "formik";

import { Modal, Button, Row, Col } from "react-bootstrap";
import {
  SubmitBtn,
  TextField,
  TextAreaField,
  UploadFileDropZone,
} from "../../components/Form";

const NewTenantModal = ({ show, setShow, tenant, schema, handleSubmit }) => {
  return (
    <Formik
      initialValues={tenant}
      onSubmit={handleSubmit}
      validationSchema={schema}
      enableReinitialize={true}
    >
      {({ setFieldValue, values }) => (
        <>
          <Modal show={show} size="xl">
            <Modal.Header>
              <Modal.Title>
                {tenant.id === 0 ? "New Tenant" : "Update Tenant"}
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
              <Row>
                <Col>
                  <UploadFileDropZone
                    type="file"
                    value={values["photo"]}
                    file="photo"
                    label="Tenant Photo"
                    name="photo"
                    setFile={(value) => setFieldValue("photo", value)}
                  />

                  <UploadFileDropZone
                    type="file"
                    value={values["identityDocument"]}
                    file="identityDocument"
                    label="Identity Document"
                    name="identityDocument"
                    setFile={(value) =>
                      setFieldValue("identityDocument", value)
                    }
                  />
                </Col>
                <Col>
                  <TextField name="name" label="Name" required />
                  <TextField name="telephone" label="Telephone" required />
                  <TextAreaField name="address" label="Address" />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setShow(false)} className="btn-secondary">
                Close
              </Button>
              <SubmitBtn title={tenant.id === 0 ? "Create" : "Update"} />
            </Modal.Footer>
          </Modal>
        </>
      )}
    </Formik>
  );
};

export default NewTenantModal;
