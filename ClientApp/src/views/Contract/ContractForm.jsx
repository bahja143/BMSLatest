import { Card, Row, Col, FormLabel } from "react-bootstrap";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as Yup from "yup";

import NewTenantModal from "../Tenant/NewTenantModal";
import NewRoomModal from "../Room/NewRoomModal";

import {
  TextField,
  DateField,
  SubmitBtn,
  SelectField,
  UploadFileDropZone,
} from "../../components/Form";

import roomsApi from "../../api/roomsApi";
import tenantsApi from "../../api/tenantsApi";
import contractsApi from "../../api/contractsApi";
import buildingesApi from "../../api/buildingesApi";

const schema = Yup.object({
  id: Yup.number(),
  tNo: Yup.string().required().label("T Number"),
  roomId: Yup.string().required().label("Room No."),
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
  witness1: Yup.string().label("Witness 1"),
  witness2: Yup.string().label("Witness 2"),
  witness3: Yup.string().label("Witness 3"),
});
const TenantSchema = Yup.object({
  id: Yup.number(),
  name: Yup.string().min(5).max(50).required().label("Name"),
  photo: Yup.string().label("Photo"),
  telephone: Yup.string().label("Telephone"),
  identityDocument: Yup.string().label("Identity document"),
  messageChannel: Yup.string().label("Message channel"),
  address: Yup.string().label("Address"),
});
const RoomSchema = Yup.object({
  id: Yup.number(),
  roomNumber: Yup.string().required().label("Room No"),
  roomSizeInSq: Yup.string().required().label("Room Size"),
  floorNo: Yup.string().required().label("floorNo"),
  buildingId: Yup.string().required().label("Building"),
  description: Yup.string().label("Description"),
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
  const [tenant, setTenant] = useState({
    id: 0,
    name: "",
    photo: "",
    telephone: "",
    identityDocument: "",
    messageChannel: "SMS",
    address: "",
  });
  const [room, setRoom] = useState({
    id: 0,
    roomNumber: "",
    roomSizeInSq: "",
    floorNo: "",
    buildingId: 1,
    description: "",
  });
  const [rooms, setRooms] = useState([]);
  const [tenants, SetTenants] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [showRoom, setShowRoom] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTenant, setShowTenant] = useState(false);

  const handleLoad = async () => {
    setIsLoading(true);
    const { data: buildings } = await buildingesApi.getAll();
    const { data: tenants } = await tenantsApi.getAll();
    const { data: rooms } = await roomsApi.getAll();
    setIsLoading(false);

    setBuildings([...buildings]);
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
        setContract({
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
  const handleSubmitTenant = async (tenant, { resetForm }) => {
    resetForm();
    setShowTenant(false);
    setIsLoading(true);

    if (tenant.id === 0) {
      const response = await tenantsApi.add({
        ...tenant,
      });
      setIsLoading(false);

      if (response.ok) {
        toast.info("Successful Registered.");
        setShowTenant(false);
        setContract((c) => ({ ...c, tenantId: response.data.id }));
        return SetTenants([response.data, ...tenants]);
      }

      if (response.status === 400)
        return toast.error("This tenant is already exist!");

      toast.error("Something went wrong");
    } else {
      const response = await tenantsApi.update(tenant.id, tenant);
      setIsLoading(false);

      if (response.ok) {
        toast.info("Successful Updates.");
        setShowTenant(false);
        return SetTenants([
          response.data,
          ...tenants.filter((c) => c.id !== tenant.id),
        ]);
      }
      toast.error("Something went wrong");
    }
  };
  const handleSubmitRoom = async (room, { resetForm }) => {
    resetForm();
    setShowRoom(false);
    setIsLoading(true);

    if (room.id === 0) {
      const response = await roomsApi.add({
        ...room,
      });
      setIsLoading(false);

      console.log(response);

      if (response.ok) {
        toast.info("Successful Registered.");
        setShowRoom(false);
        setContract((c) => ({ ...c, roomId: response.data.id }));
        return setRooms([response.data, ...rooms]);
      }

      if (response.status === 400)
        return toast.error("This room already exist!");

      toast.error("Something went wrong");
    } else {
      const response = await roomsApi.update(room.id, room);
      setIsLoading(false);

      if (response.ok) {
        toast.info("Successful Updates.");
        setShowRoom(false);
        return setRooms([
          response.data,
          ...rooms.filter((c) => c.id !== room.id),
        ]);
      }
      toast.error("Something went wrong");
    }
  };
  const handleShowRoom = () => {
    setShowRoom(true);
    setRoom({
      id: 0,
      roomNumber: "",
      roomSizeInSq: "",
      floorNo: "",
      buildingId: "",
      description: "",
    });
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
  const handleShowTenant = () => {
    setShowTenant(true);
    setTenant({
      id: 0,
      name: "",
      photo: "",
      telephone: "",
      identityDocument: "",
      messageChannel: "SMS",
      address: "",
    });
  };

  useEffect(() => {
    handleLoad();
    handleUpdate();
  }, []);

  return (
    <>
      <NewRoomModal
        room={room}
        show={showRoom}
        schema={RoomSchema}
        setShow={setShowRoom}
        buildings={buildings}
        handleSubmit={handleSubmitRoom}
      />
      <NewTenantModal
        tenant={tenant}
        show={showTenant}
        schema={TenantSchema}
        setShow={handleShowTenant}
        handleSubmit={handleSubmitTenant}
      />
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
                      isLoading={isLoading}
                      options={tenants.map((t) => ({
                        label: t.name,
                        value: t.id,
                      }))}
                      onShow={handleShowTenant}
                      subTitle="New Tenant"
                      name="tenantId"
                      label="Tenant"
                      required
                      show
                    />
                  </Col>
                  <Col>
                    <SelectField
                      isLoading={isLoading}
                      options={rooms.map((r) => ({
                        label: `${r.roomNumber}-${r.floorNo} (${r.roomSizeInSq}Karre)`,
                        value: r.id,
                      }))}
                      onShow={handleShowRoom}
                      subTitle="New Room"
                      label="Room No."
                      name="roomId"
                      required
                      show
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
                    <TextField name="witness1" label="Witness 1" />
                  </Col>
                  <Col>
                    <TextField name="witness2" label="Witness 2" />
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
