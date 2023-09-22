import { Modal } from "react-bootstrap";
import { makeStyles } from "@mui/styles";
import { Grid, Button } from "@mui/material";
import { InputGroup, Input, InputGroupText } from "reactstrap";
import FontAwesome from "react-fontawesome";
import { saveAs } from "file-saver";

import Profile from "../../components/Profile";

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
  icon: {
    fontSize: 17,
  },
  image: {
    width: "100%",
    height: 500,
    borderRadius: 5,
  },
});

export default function ViewTenant({
  show,
  tenant,
  onEdit,
  handleCloseTenant,
}) {
  const classes = useStyles();
  const handleStringToArray = (str = "") => {
    const array = str.split(",");
    const buffer = [];

    for (let index = 0; index < array.length; index++) {
      buffer[index] = array[index];
    }

    const data = new Uint8Array(buffer);

    return data;
  };

  const identityFile = URL.createObjectURL(
    new Blob([handleStringToArray(tenant.identityDocument)], {
      type: "image/png",
    })
  );
  const photoFile = URL.createObjectURL(
    new Blob([handleStringToArray(tenant.photo)], {
      type: "image/png",
    })
  );

  const downloadImage = (url) => {
    saveAs(url, `${tenant.name}.png`);
  };

  return (
    <Modal show={show} centered size="xl">
      <Modal.Header>
        <Modal.Title>Tenant information</Modal.Title>
        <Button
          className="float-right"
          onClick={handleCloseTenant}
          style={{ fontSize: 22, color: "black" }}
        >
          <FontAwesome className="fas fa-close" name="close" />
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Grid container spacing={4}>
          <Grid item xl={6} lg={6} sm={6} xs={12}>
            <div className={classes.formGroup}>
              <Profile
                photo={photoFile}
                name={tenant?.name}
                subText={tenant?.telephone}
                icon={
                  <a href={`tel:${tenant.telephone}`}>
                    <i className={`fas fa-phone-alt ` + classes.profileIcon} />
                  </a>
                }
                onClick={onEdit}
                hover
              />
            </div>

            <InputGroup className={classes.formGroup}>
              <InputGroupText>Address</InputGroupText>
              <Input value={tenant.address} disabled />
            </InputGroup>
            <div className={classes.formGroup}>
              <Button
                fullWidth
                color="success"
                variant="contained"
                onClick={() => downloadImage(photoFile)}
              >
                Download Tenant Photo
              </Button>
            </div>
            <div className={classes.formGroup}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={() => downloadImage(identityFile)}
              >
                Download Tenant Identity
              </Button>
            </div>
          </Grid>
          <Grid item xl={6} lg={6} sm={6} xs={12}>
            <Grid
              container
              flexDirection="column"
              className={classes.actionsContainer}
              justifyContent="center"
            >
              <div className={classes.formGroup}>
                <img
                  src={identityFile}
                  className={classes.image}
                  alt="identity"
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Modal.Body>
    </Modal>
  );
}
