import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import { toast } from "react-toastify";
import { MDBDataTableV5 } from "mdbreact";
import * as Yup from "yup";
import jwt from "jwt-decode";

import CustomLoader from "../../components/Loader/CustomLoader";
import NewRoomModal from "./NewRoomModal";
import roomsApi from "../../api/roomsApi";
import buildingesApi from "../../api/buildingesApi";

const schema = Yup.object({
  id: Yup.number(),
  roomNumber: Yup.string().required().label("Room No"),
  roomSizeInSq: Yup.string().required().label("Room Size"),
  floorNo: Yup.string().required().label("floorNo"),
  buildingId: Yup.string().required().label("Building"),
  description: Yup.string().label("Description"),
});

const Rooms = () => {
  const [show, setShow] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState({
    id: 0,
    floorNo: "",
    buildingId: 1,
    roomNumber: "",
    description: "",
    roomSizeInSq: "",
  });
  const [buildings, setBuildings] = useState([]);
  const [tableHeaders] = useState([
    { label: "Room No", field: "roomNumber" },
    { label: "Room Size (Karre)", field: "roomSizeInSq" },
    { label: "Building", field: "buildingName" },
    { label: "Floor No", field: "floorNo" },
    { label: "", field: "edit" },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const user = jwt(localStorage["token"]);

  const handleLoad = async () => {
    setIsLoading(true);
    const { status, data } = await roomsApi.getAll();
    const response = await buildingesApi.getAll();
    setIsLoading(false);

    if (status !== 200) return toast.error("Network Error");

    setRooms([...data]);
    setBuildings([...response.data]);
  };
  const handleSubmit = async (room, { resetForm }) => {
    resetForm();
    setShow(false);
    setIsLoading(true);

    if (room.id === 0) {
      const response = await roomsApi.add({
        ...room,
      });
      setIsLoading(false);

      if (response.ok) {
        toast.info("Successful Registered.");
        setShow(false);
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
        setShow(false);
        return setRooms([
          response.data,
          ...rooms.filter((c) => c.id !== room.id),
        ]);
      }
      toast.error("Something went wrong");
    }
  };
  const handleEdit = (custom) => {
    const cust = { ...custom };
    delete cust.edit;
    setRoom(cust);
    setShow(true);
  };
  const handleShow = () => {
    setShow(true);
    setRoom({
      id: 0,
      floorNo: "",
      buildingId: 1,
      roomNumber: "",
      description: "",
      roomSizeInSq: "",
    });
  };

  useEffect(() => {
    handleLoad();
  }, [room]);

  return (
    <>
      <NewRoomModal
        isLoading={isLoading}
        show={show}
        setShow={setShow}
        room={room}
        buildings={buildings}
        schema={schema}
        handleSubmit={handleSubmit}
      />
      <Card>
        <Card.Header>
          {user.role === "admin" ? (
            <Button
              className="float-right"
              onClick={handleShow}
              disabled={isLoading}
            >
              <FontAwesome name="fas fa-plus-circle" /> New Room
            </Button>
          ) : null}
          <Card.Title>Rooms</Card.Title>
        </Card.Header>
        <Card.Body>
          <CustomLoader isLoading={isLoading}>
            <MDBDataTableV5
              hover
              entriesOptions={[10, 25, 50, 100, 250, 500, 1000]}
              entries={10}
              pagesAmount={10}
              data={{
                columns: tableHeaders,
                rows: rooms.map((rom) => {
                  rom.edit = (
                    <>
                      {user.role === "admin" ? (
                        <Button
                          onClick={() => handleEdit(rom)}
                          className="btn-light btn-sm"
                        >
                          <FontAwesome
                            className="fas fa-edit text-primary"
                            style={{ fontSize: 17 }}
                            name="edit"
                          />
                        </Button>
                      ) : null}
                    </>
                  );

                  rom.buildingName = rom.building?.name;
                  return rom;
                }),
              }}
              pagingTop
              searchTop
              searchBottom={false}
              fullPagination
            />
          </CustomLoader>
        </Card.Body>
      </Card>
    </>
  );
};

export default Rooms;
