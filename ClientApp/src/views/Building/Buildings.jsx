import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import { toast } from "react-toastify";
import { MDBDataTableV5 } from "mdbreact";
import * as Yup from "yup";
import jwt from "jwt-decode";

import CustomLoader from "../../components/Loader/CustomLoader";
import NewBuildingsModal from "./NewBuildingsModal";
import buildingesApi from "../../api/buildingesApi";

const schema = Yup.object({
  id: Yup.number(),
  name: Yup.string().required().label("Building Name"),
  address: Yup.string().required().label("Address"),
});

const Buildings = () => {
  const [show, setShow] = useState(false);
  const [buildings, setBuildings] = useState([]);
  const [building, setBuilding] = useState({
    id: 0,
    name: "",
    address: "",
  });
  const [tableHeaders] = useState([
    { label: "Name", field: "name" },
    { label: "Address", field: "address" },
    { label: "", field: "edit" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const user = jwt(localStorage["token"]);

  const handleLoad = async () => {
    setIsLoading(true);
    const { status, data } = await buildingesApi.getAll();
    setIsLoading(false);

    if (status !== 200) return toast.error("Network Error");

    setBuildings([...data]);
  };
  const handleSubmit = async (building, { resetForm }) => {
    resetForm();
    setShow(false);
    setIsLoading(true);

    if (building.id === 0) {
      const response = await buildingesApi.add({
        ...building,
      });
      setIsLoading(false);

      if (response.ok) {
        toast.info("Successful Registered.");
        setShow(false);
        return setBuildings([response.data, ...buildings]);
      }

      if (response.status === 400)
        return toast.error("This building is already exist!");

      toast.error("Something went wrong");
    } else {
      const response = await buildingesApi.update(building.id, building);
      setIsLoading(false);

      if (response.ok) {
        toast.info("Successful Updates.");
        setShow(false);
        return setBuildings([
          response.data,
          ...buildings.filter((c) => c.id !== building.id),
        ]);
      }
      toast.error("Something went wrong");
    }
  };
  const handleEdit = (custom) => {
    const cust = { ...custom };
    delete cust.edit;
    setBuilding(cust);
    setShow(true);
  };
  const handleShow = () => {
    setShow(true);
    setBuilding({
      id: 0,
      name: "",
      address: "",
    });
  };

  useEffect(() => {
    handleLoad();
  }, [building]);

  return (
    <>
      <NewBuildingsModal
        show={show}
        setShow={setShow}
        building={building}
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
              <FontAwesome name="fas fa-plus-circle" /> New Building
            </Button>
          ) : null}
          <Card.Title>Buildings</Card.Title>
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
                rows: buildings.map((rom) => {
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

export default Buildings;
