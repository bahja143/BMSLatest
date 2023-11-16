import { saveAs } from "file-saver";
import { Modal } from "react-bootstrap";
import { makeStyles } from "@mui/styles";
import FontAwesome from "react-fontawesome";
import { Grid, Button, ButtonGroup } from "@mui/material";
import { InputGroup, Input, InputGroupText } from "reactstrap";

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

export default function ViewContractModel({
  show,
  setShow,
  contract,
  handleShowTenant,
  handleShowDocument,
}) {
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
  const handleStringToArray = (str = "") => {
    const array = str.split(",");
    const buffer = [];

    for (let index = 0; index < array.length; index++) {
      buffer[index] = array[index];
    }

    const data = new Uint8Array(buffer);

    return data;
  };
  const downloadImage = (url) => {
    saveAs(url, `${contract?.tenant?.name}.png`);
  };
  const monthDiff = (d1, d2) => {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  };

  const licenseFile = URL.createObjectURL(
    new Blob([handleStringToArray(contract.license)], {
      type: "image/png",
    })
  );

  const startDate = new Date(contract.startDate);
  const endDate = new Date(contract.endDate);

  startDate.setDate(startDate.getDate() + 1);
  endDate.setDate(endDate.getDate() + 1);

  return (
    <Modal show={show} centered size="xl">
      <Modal.Header>
        <Modal.Title>Contract detail</Modal.Title>
        <Button
          className="float-right"
          onClick={() => setShow(false)}
          style={{ fontSize: 22, color: "black" }}
        >
          <FontAwesome style={{ fontSize: 20 }} className="feather icon-x" />
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Grid container spacing={4}>
          <Grid item xl={6} lg={6} sm={6} xs={12}>
            <InputGroup className={classes.formGroup}>
              <InputGroupText>Tenant</InputGroupText>
              <Input value={contract?.tenant.name} disabled />
              <Button
                variant="outlined"
                onClick={() => handleShowTenant(contract.tenant)}
              >
                View Detail
              </Button>
            </InputGroup>

            <InputGroup className={classes.formGroup}>
              <InputGroupText>T No.</InputGroupText>
              <Input value={contract?.tNo} disabled />
            </InputGroup>

            <InputGroup className={classes.formGroup}>
              <InputGroupText>Room No.</InputGroupText>
              <Input value={contract?.room?.roomNumber} disabled />
              <InputGroupText>Floor No.</InputGroupText>
              <Input value={contract?.room?.floorNo} disabled />
            </InputGroup>

            <InputGroup className={classes.formGroup}>
              <InputGroupText>Room size</InputGroupText>
              <Input value={`${contract?.room?.roomSizeInSq} Karre`} disabled />
              <InputGroupText>Per Karre</InputGroupText>
              <Input
                value={`${formatNumber(contract?.amountPerSq)} Birr`}
                disabled
              />
            </InputGroup>

            <InputGroup className={classes.formGroup}>
              <InputGroupText>Total Amount Per Month</InputGroupText>
              <Input
                value={`${formatNumber(
                  contract?.amountPerSq * contract?.room?.roomSizeInSq
                )} Birr`}
                disabled
              />
            </InputGroup>

            <InputGroup className={classes.formGroup}>
              <InputGroupText>Start Date</InputGroupText>
              <Input value={startDate.toDateString()} disabled />
              <InputGroupText>End Date</InputGroupText>
              <Input value={endDate.toDateString()} disabled />
            </InputGroup>

            <InputGroup className={classes.formGroup}>
              <InputGroupText>Total Contract Amount</InputGroupText>
              <Input
                value={`${formatNumber(
                  Math.round(
                    (new Date(contract.endDate).getTime() -
                      new Date(contract.startDate).getTime()) /
                      (60 * 60 * 60 * 24 * 360)
                  ) *
                    contract?.amountPerSq *
                    contract?.room?.roomSizeInSq
                )} BIRR`}
                disabled
              />
              <InputGroupText>Duration</InputGroupText>
              <Input
                value={`${monthDiff(startDate, endDate)} Months`}
                disabled
              />
            </InputGroup>

            <InputGroup className={classes.formGroup}>
              <InputGroupText>Description</InputGroupText>
              <textarea className="form-control" disabled rows="5">
                {contract.description}
              </textarea>
            </InputGroup>
          </Grid>
          <Grid item xl={6} lg={6} sm={6} xs={12}>
            <Grid
              container
              flexDirection="column"
              className={classes.actionsContainer}
              justifyContent="center"
            >
              <ButtonGroup
                variant="contained"
                className={classes.formGroup}
                aria-label="outlined primary button group"
              >
                <InputGroupText>License document: </InputGroupText>
                <Button
                  fullWidth
                  color="success"
                  onClick={() => handleShowDocument(licenseFile)}
                >
                  View
                </Button>
                <Button
                  fullWidth
                  color="primary"
                  onClick={() => downloadImage(licenseFile)}
                >
                  Download
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>
      </Modal.Body>
    </Modal>
  );
}
