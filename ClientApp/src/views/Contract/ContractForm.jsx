import { useState, useEffect } from "react";
import { Card, Row, Col, FormLabel } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import {
  TextField,
  DateField,
  SubmitBtn,
  SelectField,
  UploadFileDropZone,
} from "../../components/Form";

import tenantsApi from "../../api/tenantsApi";
import roomsApi from "../../api/roomsApi";
import contractsApi from "../../api/contractsApi";

const schema = Yup.object({
  id: Yup.number(),
  tNo: Yup.string().required().label("T Number"),
  roomId: Yup.string().required().label("Room"),
  license: Yup.string().required().label("License"),
  endDate: Yup.date()
    .when(
      "startDate",
      (startDate, schema) => startDate && schema.min(startDate)
    )
    .label("End Date"),
  tenantId: Yup.string().required().label("Tenant"),
  startDate: Yup.date().required().label("Start Date"),
  amountPerSq: Yup.number()
    .min(100)
    .max(1000)
    .required()
    .label("Amount Per Karre"),
  witness1: Yup.string().required().label("Witness 1"),
  witness2: Yup.string().required().label("Witness 2"),
  witness3: Yup.string(),
});

export default function ContractForm(props) {
  const [contract, setContract] = useState({
    id: 0,
    tNo: "",
    roomId: "",
    license: "",
    endDate: "",
    tenantId: "",
    startDate: "",
    amountPerSq: "",
    witness1: "",
    witness2: "",
    witness3: "",
  });
  const [tenants, SetTenants] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoad = async () => {
    setIsLoading(true);
    const { data: tenants } = await tenantsApi.getAll();
    const { data: rooms } = await roomsApi.getAll();
    setIsLoading(false);

    SetTenants([...tenants]);
    setRooms([...rooms]);
  };
  const handleSubmit = async (contract, { resetForm }) => {
    setIsLoading(true);
    if (contract.id === 0) {
      const response = await contractsApi.add({
        ...contract,
      });
      setIsLoading(false);

      if (response.ok) {
        toast.info("Success");
        return resetForm();
      }

      if (response.status === 400)
        return toast.error("This room is already rented!");

      toast.error("Something went wrong");
    } else {
      const response = await contractsApi.update(contract.id, contract);
      setIsLoading(false);

      if (response.ok) {
        return props.history.goBack();
      }
      toast.error("Something went wrong");
    }
  };
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
  const handleUpdate = () => {
    if (props?.history?.location?.state) {
      const { data } = props?.history?.location?.state;
      const contract = data;
      delete contract.room;
      delete contract.tenant;
      setContract({ ...contract });
    }
  };

  useEffect(() => {
    handleLoad();
    handleUpdate();
  }, []);

  return (
    <>
      <Card>
        <Card.Header>
          <Card.Title>
            {contract.id === 0 ? "New Contract" : "Update Contract"}
          </Card.Title>
        </Card.Header>
        <Formik
          initialValues={contract}
          enableReinitialize
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <>
              <Card.Body>
                <Row>
                  <Col>
                    <SelectField
                      name="tenantId"
                      options={tenants.map((t) => ({
                        label: t.name,
                        value: t.id,
                      }))}
                      label="Tenant"
                      isLoading={isLoading}
                      required
                    />
                  </Col>
                  <Col>
                    <SelectField
                      name="roomId"
                      options={rooms.map((r) => ({
                        label: `${r.roomNumber}-${r.floorNo} (${r.roomSizeInSq}Karre)`,
                        value: r.id,
                      }))}
                      label="Room"
                      isLoading={isLoading}
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Row>
                      <Col>
                        <TextField
                          name="amountPerSq"
                          label="Amount Per Karre"
                          type="number"
                          required
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    <FormLabel>Total Rent Per Month</FormLabel>
                    <input
                      className="form-control"
                      disabled
                      value={`${
                        values["amountPerSq"] != "" && values["roomId"] != ""
                          ? formatNumber(
                              values["amountPerSq"] *
                                rooms.find((r) => r.id === values["roomId"])
                                  ?.roomSizeInSq,
                              ","
                            )
                          : 0
                      } Birr`}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <DateField name="startDate" label="Start Date" required />
                  </Col>
                  <Col>
                    <DateField name="endDate" label="End Date" required />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextField name="tNo" label="T No" required />
                  </Col>
                  <Col>
                    <UploadFileDropZone
                      required
                      type="file"
                      file="license"
                      name="license"
                      label="License Document"
                      value={values["license"]}
                      setFile={(value) => setFieldValue("license", value)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextField name="witness1" label="Witness 1" required />
                  </Col>
                  <Col>
                    <TextField name="witness2" label="Witness 2" required />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextField name="witness3" label="Witness 3" />
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer className="text-center">
                <SubmitBtn
                  size="lg"
                  title={
                    isLoading
                      ? "...Loading"
                      : contract.id === 0
                      ? "Submit"
                      : "Update"
                  }
                  disabled={isLoading}
                />
              </Card.Footer>
            </>
          )}
        </Formik>
      </Card>
    </>
  );
}
