import { useState, useEffect, useRef } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { MDBDataTableV5 } from "mdbreact";
import FontAwesome from "react-fontawesome";
import ReactToPrint from "react-to-print";

import PrintBillModal from "./PrintBillModal";
import PrinTible from "../../Utility/printible";
import CustomLoader from "../../components/Loader/CustomLoader";

import billsApi from "../../api/billsApi";

export default function Bills() {
  const [tableHeaders] = useState([
    { label: "Tenant", field: "tenantName" },
    { label: "Room", field: "room" },
    { label: "Amount", field: "amountLabel" },
    { label: "Description", field: "description" },
    { label: "Due Date", field: "dueDateLabel" },
    { label: "Date", field: "date" },
    { label: "", field: "actions" },
  ]);
  const [tableHeadersReport] = useState([
    { label: "Tenant", field: "tenantName" },
    { label: "Room", field: "room" },
    { label: "Amount", field: "amountLabel" },
    { label: "Description", field: "description" },
    { label: "Due Date", field: "dueDate" },
    { label: "Date", field: "date" },
  ]);
  const [bills, setBills] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [bill, setBill] = useState({});
  let componentRef = useRef();

  const handleLoad = async () => {
    setIsLoading(true);
    const { data } = await billsApi.getOverDueBills();
    setIsLoading(false);

    setBills(data);
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
  const handleModelPrintData = (data) => {
    if (data.length === 0) return [];

    return data.map((b) => ({
      id: b.id,
      tenantName: b.tenantName,
      room: b.room,
      amount: `${formatNumber(b.amount)} Birr`,
      description: b.description,
      dueDate: new Date(b.dueDate).toLocaleDateString(),
      date: new Date(b.date).toLocaleDateString(),
    }));
  };
  const handleShow = (bill) => {
    setBill(bill);
    setShow(true);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <>
      <PrintBillModal bill={bill} show={show} setShow={setShow} />
      <Card>
        <Card.Header>
          <Card.Title>
            <Row>
              <Col> Bills </Col>
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
                    data={handleModelPrintData(bills)}
                    theaders={tableHeadersReport
                      .filter((t) => t.label !== "")
                      .map((h) => h.label)}
                    title="Bills"
                    ref={(el) => (componentRef = el)}
                  />
                </div>
              </Col>
            </Row>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <p style={{ fontSize: 17, position: "relative", top: 10 }}>
                Total Bills:{" "}
                {bills.length > 0
                  ? formatNumber(
                      bills?.map((e) => e.amount)?.reduce((a, b) => a + b)
                    )
                  : 0}{" "}
                BIRR
              </p>
            </Col>
          </Row>
          <CustomLoader isLoading={isLoading}>
            <MDBDataTableV5
              hover
              striped
              entries={10}
              pagesAmount={10}
              entriesOptions={[10, 25, 50, 100, 250]}
              data={{
                columns: tableHeaders,
                rows: bills.map((bill) => {
                  bill.date = new Date(bill.date).toDateString();
                  bill.dueDateLabel = (
                    <span className="badge badge-danger">
                      {new Date(bill.dueDate).toDateString()}
                    </span>
                  );
                  bill.actions = (
                    <>
                      <Button
                        className="btn-light btn-sm mr-4"
                        onClick={() => handleShow(bill)}
                      >
                        <FontAwesome
                          name="print text-primary"
                          style={{ fontSize: 17 }}
                        />
                      </Button>
                    </>
                  );

                  bill.amountLabel = formatNumber(bill.amount) + " Birr";
                  return bill;
                }),
              }}
              searchTop
              paging={false}
              fullPagination
              searchBottom={false}
            />
          </CustomLoader>
        </Card.Body>
      </Card>
    </>
  );
}
