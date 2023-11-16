import { Modal } from "react-bootstrap";
import { Button } from "@mui/material";
import FontAwesome from "react-fontawesome";

function ViewDocument({ show, document, handleCloseDocument }) {
  return (
    <Modal show={show} onClosed={handleCloseDocument} backdrop="static">
      <Modal.Header>
        <Modal.Title>View Document</Modal.Title>
        <Button
          className="float-right"
          onClick={handleCloseDocument}
          style={{ fontSize: 20, color: "black" }}
        >
          <FontAwesome style={{ fontSize: 20 }} className="feather icon-x" />
        </Button>
      </Modal.Header>
      <img width="100%" height="100%" src={document} alt="contract document" />
    </Modal>
  );
}

export default ViewDocument;
