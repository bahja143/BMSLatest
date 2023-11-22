import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { MDBDataTableV5 } from "mdbreact";
import { toast } from "react-toastify";

import Fontawesome from "react-fontawesome";
import SweatAlert from "react-bootstrap-sweetalert";

import ViewDocument from "./ViewDocument";
import PrintContract from "./PrintContract";
import ViewTenant from "../Tenant/ViewTenant";
import ViewContractModel from "./ViewContractModel";
import CustomLoader from "../../components/Loader/CustomLoader";

import contractsApi from "../../api/contractsApi";

const Contracts = () => {
  const [tableHeaders] = useState([
    { label: "Tenant", field: "name" },
    { label: "Telephone", field: "tellphone" },
    { label: "Room", field: "roomNumber" },
    { label: "Amount(Monthly)", field: "amount" },
    { label: "Date", field: "date" },
    { label: "", field: "edit" },
  ]);
  const [contracts, setContracts] = useState([]);
  const [contract, setContract] = useState({ tenant: {} });
  const [show, setShow] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showTenant, setShowTenant] = useState(false);
  const [tenant, setTenant] = useState({});
  const [showDocument, setShowDocument] = useState(false);
  const [document, setDocument] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPrint, setShowPrint] = useState(false);

  const handleOut = (obj) => {
    setContract(obj);
    setShow(true);
  };
  const handleLoad = async () => {
    setIsLoading(true);
    const { status, data } = await contractsApi.getCurrent();
    setIsLoading(false);

    if (status !== 200) return toast.error("Network Error");

    setContracts([...data]);
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
    setDocument(document);
    setShowDetail(false);
    setShowDocument(true);
  };
  const handleCloseDocument = () => {
    setShowDocument(false);
    setShowDetail(true);
  };
  const handleApproveGetOut = async () => {
    setShow(false);
    setContracts([...contracts.filter((c) => c.id !== contract.id)]);

    contractsApi.getOut(contract.id);
  };
  const handlePrint = async (contract) => {
    setShowPrint(true);
    setContract(contract);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <>
      <PrintContract
        show={showPrint}
        setShow={setShowPrint}
        contract={contract}
      />
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
      <SweatAlert
        show={show}
        closeOnClickOutside
        confirmButtonColor="green"
        onCancel={() => setShow(false)}
        onConfirm={() => handleApproveGetOut()}
        title={"Are you sure to out(" + contract.tenant.name + ")"}
      />
      <Card>
        <Card.Header>
          <Card.Title>Contracts</Card.Title>
        </Card.Header>
        <Card.Body>
          <CustomLoader isLoading={isLoading}>
            <MDBDataTableV5
              hover
              striped
              entriesOptions={[10, 25, 50, 100, 250, 500, 1000]}
              entries={10}
              pagesAmount={10}
              data={{
                columns: tableHeaders,
                rows: contracts.map((ren) => {
                  ren.edit = (
                    <>
                      <Button
                        className="btn-light btn-sm mr-4"
                        onClick={() => handleShowDetail(ren)}
                      >
                        <Fontawesome
                          name="eye"
                          style={{ fontSize: 17 }}
                          className="fas fa-eye text-secondary "
                        />
                      </Button>
                      <Button
                        className="btn-light btn-sm mr-4"
                        onClick={() => handlePrint(ren)}
                      >
                        <Fontawesome
                          name="print"
                          style={{ fontSize: 17 }}
                          className="fas fa-print text-primary "
                        />
                      </Button>
                      {/* <NavLink
                        to={{
                          pathname: "/contract/contractform/edit/" + ren.id,
                          state: {
                            id: ren.id,
                            data: { ...ren },
                          },
                        }}
                      >
                        <Fontawesome
                          className="fas fa-edit text-primary"
                          style={{ fontSize: 17 }}
                          name="edit"
                        />
                      </NavLink> */}
                      <Button
                        onClick={() => handleOut(ren)}
                        className="btn-light btn-sm ml-4"
                      >
                        <Fontawesome
                          className="fas fa-sign-out-alt text-danger"
                          style={{ fontSize: 17 }}
                          name="edit"
                        />
                      </Button>
                    </>
                  );

                  ren.name = ren.tenant?.name;
                  ren.tellphone = ren.tenant?.telephone;
                  ren.roomNumber = `${ren.room?.roomNumber} (${ren.room.floorNo})`;
                  ren.amount = `${formatNumber(
                    ren.room?.roomSizeInSq * ren.amountPerSq
                  )} Birr`;
                  ren.date = new Date(ren.date).toDateString();
                  return ren;
                }),
              }}
              pagingTop
              searchTop
              fullPagination
              searchBottom={false}
            />
          </CustomLoader>
        </Card.Body>
      </Card>
    </>
  );
};

export default Contracts;
