import { useState, useEffect, useRef } from "react";
import { Card, Button, FormLabel, Row, Col } from "react-bootstrap";
import { MDBDataTableV5 } from "mdbreact";
import { toast } from "react-toastify";

import FontAwesome from "react-fontawesome";
import ReactToPrint from "react-to-print";
import Select from "react-select";

import CustomLoader from "../../components/Loader/CustomLoader";
import ViewContractModel from "./ViewContractModel";
import PrinTible from "../../Utility/printible";
import ViewTenant from "../Tenant/ViewTenant";
import ViewDocument from "./ViewDocument";

import contractsApi from "../../api/contractsApi";
import tenantsApi from "../../api/tenantsApi";
import roomsApi from "../../api/roomsApi";
import Filter from "../../Utility/contractsFilter";

const Report = () => {
  const [tableHeaders] = useState([
    { label: "Tenant", field: "name" },
    { label: "Telephone", field: "tellphone" },
    { label: "Room", field: "roomNo" },
    { label: "Amount(Monthly)", field: "amount" },
    { label: "Date", field: "date" },
    { label: "", field: "actions" },
    { label: "", field: "status" },
  ]);
  const [tableHeadersReport] = useState([
    { label: "Tenant", field: "name" },
    { label: "Telephone", field: "tellphone" },
    { label: "Room", field: "roomNo" },
    { label: "Amount(Monthly)", field: "amount" },
    { label: "Start Date", field: "startDate" },
    { label: "End Date", field: "endDate" },
    { label: "Status", field: "status" },
  ]);
  const [allContracts, setAllContracts] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [contract, setContract] = useState({ tenant: {} });
  const [showDetail, setShowDetail] = useState(false);
  const [showTenant, setShowTenant] = useState(false);
  const [tenant, setTenant] = useState({});
  const [tenants, setTenants] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [showDocument, setShowDocument] = useState(false);
  const [document, setDocumnet] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState({
    date: "",
    name: "All",
    status: "",
    roomNumber: "All",
  });
  const [Statuses] = useState([
    {
      value: "Current",
      label: <span className="badge badge-success">Current</span>,
    },
    {
      value: "Expired",
      label: <span className="badge badge-danger">Expired</span>,
    },
    {
      value: "Throwed Out",
      label: <span className="badge badge-secondary">Throwed Out</span>,
    },
  ]);
  let componentRef = useRef();

  const handleLoad = async () => {
    setIsLoading(true);
    const { status, data } = await contractsApi.getAll();
    const { data: tenants } = await tenantsApi.getAll();
    const { data: rooms } = await roomsApi.getAll();
    setIsLoading(false);

    if (status !== 200) return toast.error("Network Error");

    setAllContracts([
      ...data?.map((c) => ({
        ...c,
        roomNumber: c.room.roomNumber,
        name: c.tenant.name,
      })),
    ]);
    setContracts([
      ...data?.map((c) => ({ ...c, roomNumber: c.room.roomNumber })),
    ]);
    setTenants([{ id: "All", name: "All" }, ...tenants]);
    setRooms([{ id: "All", roomNumber: "All" }, ...rooms]);
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
  const handleShowDetail = (contract) => {
    setShowDetail(true);
    setContract(contract);
  };
  const handleShowTenant = (tenant) => {
    setTenant(tenant);
    setShowDetail(false);
    setShowTenant(true);
  };
  const handleCloseTenant = () => {
    setShowTenant(false);
    setShowDetail(true);
  };
  const handleShowDocument = (document) => {
    setDocumnet(document);
    setShowDetail(false);
    setShowDocument(true);
  };
  const handleCloseDocument = () => {
    setShowDocument(false);
    setShowDetail(true);
  };
  const handleOnChangeFilter = ({ currentTarget: input }) => {
    filter[input.name] = input.value;

    setFilter({ ...filter });
    handleFilter(filter);
  };
  const handleFilter = (filter) => {
    setContracts([...Filter([...allContracts], filter)]);
  };
  const handleModelPrintData = (data) => {
    if (data.length === 0) return [];

    return data.map((r) => ({
      id: r.id,
      name: r.tenant.name,
      telephone: r.tenant.telephone,
      roomNumber: `${r.room.roomNumber}-${r.room.floorNo}`,
      amount: `${formatNumber(r.room?.roomSizeInSq * r.amountPerSq)} Birr`,
      startDate: new Date(r.startDate).toLocaleDateString(),
      endDate: new Date(r.endDate).toLocaleDateString(),
      status: r.isCurrent ? (
        new Date(r.endDate) > new Date() ? (
          <span className="badge badge-success">Current</span>
        ) : (
          <span className="badge badge-danger">Expired</span>
        )
      ) : (
        <span className="badge badge-secondary">Throwed Out</span>
      ),
    }));
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <>
      <ViewDocument
        show={showDocument}
        document={document}
        handleCloseDocument={handleCloseDocument}
      />
      <ViewTenant
        tenant={tenant}
        show={showTenant}
        setShow={setShowTenant}
        handleCloseTenant={handleCloseTenant}
      />
      <ViewContractModel
        show={showDetail}
        contract={contract}
        setShow={setShowDetail}
        handleShowTenant={handleShowTenant}
        handleShowDocument={handleShowDocument}
      />
      <Card>
        <Card.Header>
          <Card.Title>
            <Row>
              <Col>All Contracts </Col>
              <Col>
                <ReactToPrint
                  trigger={() => (
                    <button
                      type="button"
                      className="btn d-print-none float-right"
                    >
                      <FontAwesome
                        className="fas fa-print"
                        name="print"
                        style={{ fontSize: 25 }}
                      />
                    </button>
                  )}
                  content={() => {
                    return componentRef;
                  }}
                />
                <div className="d-none">
                  <PrinTible
                    data={handleModelPrintData(contracts)}
                    theaders={tableHeadersReport
                      .filter((t) => t.label !== "")
                      .map((h) => h.label)}
                    title="Contracts Report"
                    ref={(el) => (componentRef = el)}
                  />
                </div>
              </Col>
            </Row>
          </Card.Title>

          <Row>
            <Col>
              <FormLabel>Tenants</FormLabel>
              <Select
                value={tenants
                  .filter((c) => c.name === filter.name)
                  .map((c) => ({ label: c.name, value: c.id }))}
                onChange={(e) =>
                  handleOnChangeFilter({
                    currentTarget: { name: "name", value: e.label },
                  })
                }
                options={tenants.map((c) => ({
                  label: c.name,
                  value: c.id,
                }))}
                isLoading={isLoading}
              />
            </Col>
            <Col>
              <FormLabel>Rooms</FormLabel>
              <Select
                value={rooms
                  .filter((c) => c.roomNumber === filter.roomNumber)
                  .map((c) => ({ label: c.roomNumber, value: c.id }))}
                onChange={(e) =>
                  handleOnChangeFilter({
                    currentTarget: { name: "roomNumber", value: e.label },
                  })
                }
                options={rooms.map((c) => ({
                  label: c.roomNumber,
                  value: c.id,
                }))}
                isLoading={isLoading}
              />
            </Col>
            <Col>
              <FormLabel>Status</FormLabel>
              <Select
                value={Statuses.filter((c) => c.value === filter.status)}
                onChange={(e) =>
                  handleOnChangeFilter({
                    currentTarget: { name: "status", value: e.value },
                  })
                }
                options={Statuses}
                isLoading={isLoading}
              />
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <CustomLoader isLoading={isLoading}>
            <MDBDataTableV5
              entries={10}
              pagesAmount={10}
              data={{
                columns: tableHeaders,
                rows: [
                  ...contracts.map((ren) => {
                    ren.status = ren.isCurrent ? (
                      new Date(ren.endDate) > new Date() ? (
                        <span className="badge badge-success">Current</span>
                      ) : (
                        <span className="badge badge-danger">Expired</span>
                      )
                    ) : (
                      <span className="badge badge-secondary">Throwed Out</span>
                    );
                    ren.actions = (
                      <>
                        <Button
                          className="btn-light btn-sm mr-4"
                          onClick={() => handleShowDetail(ren)}
                        >
                          <FontAwesome
                            name="eye"
                            style={{ fontSize: 17 }}
                            className="fas fa-eye text-secondary "
                          />
                        </Button>
                      </>
                    );

                    ren.name = ren.tenant?.name;
                    ren.tellphone = ren.tenant?.telephone;
                    ren.roomNo = `${ren.room?.roomNumber} (${ren.room.floorNo})`;
                    ren.amount = `${formatNumber(
                      ren.room?.roomSizeInSq * ren.amountPerSq
                    )} Birr`;
                    ren.date = new Date(ren.date).toDateString();
                    return ren;
                  }),
                ],
              }}
              pagingTop
              searchTop
              fullPagination
              searchBottom={false}
              entriesOptions={[10, 25, 50, 100, 250, 500, 1000]}
            />
          </CustomLoader>
        </Card.Body>
      </Card>
    </>
  );
};

export default Report;
