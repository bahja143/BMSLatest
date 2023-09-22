import { useState, useEffect, useRef } from "react";
import { Card, Button, FormLabel, Row, Col } from "react-bootstrap";
import { MDBDataTableV5 } from "mdbreact";
import SweatAlert from "react-bootstrap-sweetalert";
import { toast } from "react-toastify";
import jwt from "jwt-decode";

import Select from "react-select";
import DateTime from "react-datetime";
import ReactToPrint from "react-to-print";
import FontAwesome from "react-fontawesome";
import PrinTible from "../../Utility/printible";

import CustomLoader from "../../components/Loader/CustomLoader";
import PrintReceiptModel from "./PrintReceiptModel";
import ViewReceiptModel from "./ViewReceiptModel";

import Filter from "../../Utility/receiptsFilter";
import receiptsApi from "../../api/receiptsApi";
import tenantsApi from "../../api/tenantsApi";

const Report = () => {
  const [tableHeaders] = useState([
    { label: "Tenant", field: "name" },
    { label: "Paid By", field: "payerName" },
    { label: "Total Amount", field: "amount" },
    { label: "Method Of Payment", field: "paymentMethod" },
    { label: "Date", field: "date" },
    { label: "", field: "actions" },
    { label: "", field: "status" },
  ]);
  const [tableHeadersReport] = useState([
    { label: "Tenant", field: "name" },
    { label: "Telephone", field: "telephone" },
    { label: "Paid By", field: "payerName" },
    { label: "Total Amount", field: "amount" },
    { label: "Method Of Payment", field: "paymentMethod" },
    { label: "Date", field: "date" },
    { label: "", field: "actions" },
    { label: "", field: "status" },
  ]);
  const [allReceipts, setAllReceipts] = useState([]);
  const [receipts, setReceipts] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState({
    name: "All",
    endDate: "",
    startDate: "",
    paymentMethod: "All",
  });
  const [paymentMethods] = useState([
    { label: "All", value: "All" },
    { label: "Bank Account", value: "Bank Account" },
    { label: "Hello Cash", value: "Hello Cash" },
    { label: "Cash", value: "Cash" },
  ]);
  const [show, setShow] = useState(false);
  const [printibleReceipt, setPrintibleReceipt] = useState({});
  const [showDetail, setShowDetail] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [receipt, setReceipt] = useState({});
  const user = jwt(localStorage["token"]);
  let componentRef = useRef();

  const handleLoad = async () => {
    setIsLoading(true);
    const { status, data } = await receiptsApi.getAll();
    const { data: tenants } = await tenantsApi.getAll();
    setIsLoading(false);

    if (status !== 200) return toast.error("Network Error");

    setAllReceipts([...data]);
    setReceipts([...data]);
    setTenants([{ id: "All", name: "All" }, ...tenants]);
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
  const handleOnChangeFilter = ({ currentTarget: input }) => {
    filter[input.name] = input.value;

    setFilter({ ...filter });
    handleFilter(filter);
  };
  const handleFilter = (filter) => {
    setReceipts([...Filter([...allReceipts], filter)]);
  };
  const handlePrint = (receipt) => {
    setPrintibleReceipt({
      ...receipt,
      receipt: { date: receipt.date, payerName: receipt.payerName },
    });
    setShow(true);
  };
  const handleShowDetail = (receipt) => {
    setShowDetail(true);
    setReceipt(receipt);
  };
  const handleDelete = async (receipt) => {
    setReceipt(receipt);
    setShowAlert(true);
  };
  const handleConfirmDelete = async () => {
    setShowAlert(false);
    setReceipts((r) => [...r.filter((r) => r.id !== receipt.id)]);

    await receiptsApi.update(receipt.id, {});
  };
  const handleModelPrintData = (data) => {
    if (data.length === 0) return [];

    return data.map((r) => ({
      id: r.id,
      name: r.tenant.name,
      telephone: r.tenant.telephone,
      payerName: r.payerName,
      totalAmount: `${formatNumber(r.totalAmount)} Birr`,
      paymentMethod: r.paymentMethod,
      date: new Date(r.date).toLocaleDateString(),
    }));
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <>
      <SweatAlert
        danger
        show={showAlert}
        closeOnClickOutside
        confirmBtnText="Delete"
        confirmButtonColor="green"
        title={`${receipt?.name} - ${receipt.amount} ${new Date(
          receipt.date
        ).toLocaleDateString()}`}
        confirmBtnCssClass="btn-danger"
        onCancel={() => setShowAlert(false)}
        onConfirm={() => handleConfirmDelete()}
      />
      <ViewReceiptModel
        show={showDetail}
        receipt={receipt}
        setShow={setShowDetail}
      />
      <PrintReceiptModel
        show={show}
        setShow={setShow}
        receipt={printibleReceipt}
      />
      <Card>
        <Card.Header>
          <Card.Title>
            <Row>
              <Col> All Payments </Col>
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
                    data={handleModelPrintData(receipts)}
                    theaders={tableHeadersReport
                      .filter((t) => t.label !== "")
                      .map((h) => h.label)}
                    title="Payments Report"
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
              <FormLabel>Payment Method</FormLabel>
              <Select
                value={paymentMethods.filter(
                  (c) => c.value === filter.paymentMethod
                )}
                onChange={(e) =>
                  handleOnChangeFilter({
                    currentTarget: { name: "paymentMethod", value: e.label },
                  })
                }
                options={paymentMethods}
                isLoading={isLoading}
              />
            </Col>
            <Col>
              <FormLabel>Start Date</FormLabel>
              <DateTime
                onChange={(e) =>
                  handleOnChangeFilter({
                    currentTarget: { name: "startDate", value: e._d },
                  })
                }
                value={filter["startDate"]}
                timeFormat={false}
                closeOnSelect
              />
            </Col>
            <Col>
              <FormLabel>End Date</FormLabel>
              <DateTime
                onChange={(e) =>
                  handleOnChangeFilter({
                    currentTarget: { name: "endDate", value: e._d },
                  })
                }
                value={filter["endDate"]}
                timeFormat={false}
                closeOnSelect
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <p style={{ fontSize: 18, position: "relative", top: 10 }}>
                Total Income:{" "}
                {receipts.length > 0
                  ? formatNumber(
                      receipts
                        ?.map((e) => e.totalAmount)
                        ?.reduce((a, b) => a + b)
                    )
                  : 0}{" "}
                BIRR
              </p>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <CustomLoader isLoading={isLoading}>
            <MDBDataTableV5
              data={{
                columns: tableHeaders,
                rows: [
                  ...receipts.map((r) => {
                    r.actions = (
                      <>
                        <Button
                          className="btn-light btn-sm mr-4"
                          onClick={() => handleShowDetail(r)}
                        >
                          <FontAwesome
                            name="eye text-secondary"
                            style={{ fontSize: 17 }}
                          />
                        </Button>
                        {user.role === "admin" ? (
                          <Button
                            className="btn-light btn-sm mr-4"
                            onClick={() => handleDelete(r)}
                          >
                            <FontAwesome
                              name="trash text-danger"
                              style={{ fontSize: 17 }}
                            />
                          </Button>
                        ) : null}

                        <Button
                          className="btn-light btn-sm mr-4"
                          onClick={() => handlePrint(r)}
                        >
                          <FontAwesome
                            name="print text-primary"
                            style={{ fontSize: 17 }}
                          />
                        </Button>
                      </>
                    );

                    r.amount = `${formatNumber(r.totalAmount)} Birr`;
                    r.date = new Date(r.date).toDateString();
                    return r;
                  }),
                ],
              }}
              searchTop
              pagingTop={false}
              searchBottom={false}
              entriesOptions={[5, 10, 25, 50, 100, 250, 500, 1000]}
            />
          </CustomLoader>
        </Card.Body>
      </Card>
    </>
  );
};

export default Report;
