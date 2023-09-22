import { Modal } from "react-bootstrap";
import { makeStyles } from "@mui/styles";
import { Grid, Button } from "@mui/material";
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

export default function ViewReceiptModel({ show, setShow, receipt }) {
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
        <Modal.Title>Receipt detail</Modal.Title>
        <Button
          className="float-right"
          onClick={() => setShow(false)}
          style={{ fontSize: 22, color: "black" }}
        >
          <FontAwesome name="close" />
        </Button>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className={classes.formGroup}>
          <InputGroupText>Tenant</InputGroupText>
          <Input value={receipt?.tenant?.name} disabled />
          <InputGroupText>Telephone</InputGroupText>
          <Input value={receipt?.tenant?.telephone} disabled />
        </InputGroup>

        <InputGroup className={classes.formGroup}>
          <InputGroupText>Paid By</InputGroupText>
          <Input value={receipt?.payerName} disabled />
        </InputGroup>

        <InputGroup className={classes.formGroup}>
          <InputGroupText>Payment Method</InputGroupText>
          <Input value={receipt?.paymentMethod} disabled />
        </InputGroup>

        <InputGroup className={classes.formGroup}>
          <InputGroupText>Description</InputGroupText>
          <textarea className="form-control" disabled rows="5">
            {receipt?.description}
          </textarea>
        </InputGroup>

        <div className="row">
          <div className="col-sm-12">
            <h5 style={{ position: "relative", top: -7.5 }}>Paid Bills</h5>

            <div className="table-responsive">
              <table className="table invoice-detail-table">
                <thead>
                  <tr className="thead-default">
                    <th className="text-center">Description</th>
                    <th className="text-center">Due Date</th>
                    <th className="text-center">Due Amount</th>
                    <th className="text-center">Paid Amount</th>
                    <th className="text-center">Remaining Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {receipt?.bills?.map((b) => (
                    <tr key={b.id}>
                      <td className="text-center">
                        <h6>{b.room}</h6>
                        <p className="m-0">{b.description}</p>
                      </td>
                      <td className="text-center">
                        {new Date(b.dueDate).toLocaleDateString()}
                      </td>
                      <td className="text-center">
                        {formatNumber(b.amount)}.00 BIRR
                      </td>
                      <td className="text-center">
                        {" "}
                        {formatNumber(b.paidAmount)}.00 BIRR
                      </td>
                      <td className="text-center">
                        {" "}
                        {formatNumber(b.amount - b.paidAmount)}.00 BIRR
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <table className="table table-responsive invoice-table invoice-total">
              <tbody>
                <tr className="text-info">
                  <td>
                    <hr />
                    <h5 className="text-primary m-r-10">Total Paid :</h5>
                  </td>
                  <td>
                    <hr />
                    <h5 className="text-primary">
                      {formatNumber(
                        receipt?.bills
                          ?.map((b) => b.paidAmount)
                          .reduce((a, b) => a + b)
                      )}
                      .00 Birr
                    </h5>
                  </td>
                </tr>
                <tr className="text-info">
                  <td>
                    <hr />
                    <h5 className="text-primary m-r-10">Remaining Balance :</h5>
                  </td>
                  <td>
                    <hr />
                    <h5 className="text-primary">
                      {formatNumber(
                        receipt?.bills
                          ?.map((b) => {
                            return b.amount - b.paidAmount;
                          })
                          .reduce((a, b) => a + b)
                      )}
                      .00 Birr
                    </h5>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <Grid item xl={6} lg={6} sm={6} xs={12}>
          <Grid
            container
            flexDirection="column"
            className={classes.actionsContainer}
            justifyContent="center"
          ></Grid>
        </Grid>
      </Modal.Body>
    </Modal>
  );
}
