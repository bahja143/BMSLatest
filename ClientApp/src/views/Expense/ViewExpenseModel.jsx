import { Modal } from "react-bootstrap";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import { InputGroup, Input, InputGroupText } from "reactstrap";
import FontAwesome from "react-fontawesome";

import colors from "../../config/colors";

const useStyles = makeStyles({
  profileIcon: {
    marginRight: 5,
    color: colors.dark,
    transition: "color .15s",
    "&:hover": {
      color: colors.main,
    },
  },
  actionsContainer: {
    width: "100%",
    height: "100%",
  },
  formGroup: {
    marginBottom: 25,
  },
  profileContainer: {
    marginBottom: 25,
  },
  balanceContainer: {
    width: "100%",
    height: "50%",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
    borderRadius: 10,
  },
  price: {
    fontSize: 21,
    fontWeight: "500",
    position: "relative",
    top: 15,
  },
  currency: {
    fontSize: 16,
    fontWeight: "400",
    color: "rgb(99, 115, 129)",
    textAlign: "center",
  },
  btn: { width: "100%" },
});

export default function ViewExpenseModel({ show, setShow, expense }) {
  const classes = useStyles();

  const formatNumber = (inputNumber) => {
    let formetedNumber = Number(inputNumber)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    let splitArray = formetedNumber.split(".");
    if (splitArray.length > 1) {
      formetedNumber = splitArray[0];
    }
    return formetedNumber;
  };

  return (
    <Modal show={show} centered size="lg">
      <Modal.Header>
        <Modal.Title>Expense detail</Modal.Title>
        <Button
          className="float-right"
          onClick={() => setShow(false)}
          style={{ fontSize: 22, color: "black" }}
        >
          <FontAwesome style={{ fontSize: 20 }} className="feather icon-x" />
        </Button>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className={classes.formGroup}>
          <InputGroupText>Category</InputGroupText>
          <Input value={expense?.name} disabled />
        </InputGroup>

        <InputGroup className={classes.formGroup}>
          <InputGroupText>Expense Amount (BIRR)</InputGroupText>
          <Input value={formatNumber(expense?.amount)} disabled />
        </InputGroup>

        <InputGroup className={classes.formGroup}>
          <InputGroupText>Date</InputGroupText>
          <Input value={new Date(expense?.date).toDateString()} disabled />
        </InputGroup>

        <InputGroup className={classes.formGroup}>
          <InputGroupText>Description</InputGroupText>
          <textarea className="form-control" disabled rows="5">
            {expense?.description}
          </textarea>
        </InputGroup>
      </Modal.Body>
    </Modal>
  );
}
