import { useState, useEffect, useRef } from "react";
import { Card, Button, FormLabel, Row, Col } from "react-bootstrap";
import { MDBDataTableV5 } from "mdbreact";
import { toast } from "react-toastify";

import Select from "react-select";
import DateTime from "react-datetime";
import FontAwesome from "react-fontawesome";

import ReactToPrint from "react-to-print";
import PrinTible from "../../Utility/printible";
import ViewExpenseModel from "./ViewExpenseModel";
import CustomLoader from "../../components/Loader/CustomLoader";

import Filter from "../../Utility/receiptsFilter";
import expensesApi from "../../api/expensesApi";
import expenseCategoryApi from "../../api/expenseCategoryApi";

const Report = () => {
  const [tableHeaders] = useState([
    { label: "Category", field: "categoryName" },
    { label: "Amount", field: "totalAmount" },
    { label: "Date", field: "date" },
    { label: "", field: "actions" },
  ]);
  const [tableHeadersReport] = useState([
    { label: "Category", field: "categoryName" },
    { label: "Amount", field: "totalAmount" },
    { label: "Description", field: "description" },
    { label: "Date", field: "date" },
    { label: "", field: "actions" },
  ]);
  const [allExpenses, setAllExpenses] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState({
    name: "All",
    endDate: "",
    startDate: "",
    paymentMethod: "All",
  });
  const [showDetail, setShowDetail] = useState(false);
  const [expense, setExpense] = useState({});
  let componentRef = useRef();

  const handleLoad = async () => {
    setIsLoading(true);
    const { status, data } = await expensesApi.getAll();
    const { data: categories } = await expenseCategoryApi.getAll();
    setIsLoading(false);

    if (status !== 200) return toast.error("Network Error");

    setAllExpenses([...data]);
    setExpenses([...data]);
    setCategories([{ id: "All", name: "All" }, ...categories]);
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
    setExpenses([...Filter([...allExpenses], filter)]);
  };
  const handleShowDetail = (expense) => {
    setShowDetail(true);
    setExpense(expense);
  };
  const handleModelPrintData = (data) => {
    if (data.length === 0) return [];

    return data.map((r) => ({
      id: r.id,
      categoryName: r.expenseCategory.name,
      totalAmount: `${formatNumber(r.amount)} Birr`,
      description: r.description,
      date: new Date(r.date).toLocaleDateString(),
    }));
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <>
      <ViewExpenseModel
        show={showDetail}
        expense={expense}
        setShow={setShowDetail}
      />
      <Card>
        <Card.Header>
          <Card.Title>
            {" "}
            <Row>
              <Col> All Expenses </Col>
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
                    data={handleModelPrintData(expenses)}
                    theaders={tableHeadersReport
                      .filter((t) => t.label !== "")
                      .map((h) => h.label)}
                    title="Expenses Report"
                    ref={(el) => (componentRef = el)}
                  />
                </div>
              </Col>
            </Row>
          </Card.Title>
          <Row>
            <Col>
              <FormLabel>Category</FormLabel>
              <Select
                value={categories
                  .filter((c) => c.name === filter.name)
                  .map((c) => ({ label: c.name, value: c.id }))}
                onChange={(e) =>
                  handleOnChangeFilter({
                    currentTarget: { name: "name", value: e.label },
                  })
                }
                options={categories.map((c) => ({
                  label: c.name,
                  value: c.id,
                }))}
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
                Total Expenses:{" "}
                {expenses.length > 0
                  ? formatNumber(
                      expenses?.map((e) => e.amount)?.reduce((a, b) => a + b)
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
              entries={10}
              pagesAmount={10}
              data={{
                columns: tableHeaders,
                rows: [
                  ...expenses.map((r) => {
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
                      </>
                    );

                    r.totalAmount = `${formatNumber(r.amount)} Birr`;
                    r.categoryName = r.expenseCategory.name;
                    r.date = new Date(r.date).toDateString();
                    return r;
                  }),
                ],
              }}
              searchTop
              fullPagination
              searchBottom={false}
              searching={false}
              entriesOptions={[10, 25, 50, 100, 250, 500, 1000]}
            />
          </CustomLoader>
        </Card.Body>
      </Card>
    </>
  );
};

export default Report;
