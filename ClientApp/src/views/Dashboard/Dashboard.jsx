import { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { toast } from "react-toastify";

import ClipLoader from "react-spinners/ClipLoader";
import Chart from "react-apexcharts";

import shape3 from "../../assets/images/shape3.png";
import pieChart2 from "./bar-chart-2";
import pieChart1 from "./pieChart1";

import dashboardApi from "../../api/dashboardApi";

const Dashboard = () => {
  const [data, setDate] = useState({
    totalBills: 0,
    totalReceipts: 0,
    totalExpenses: 0,
    totalContracts: "",
    bills: [],
    receipts: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLoad = async () => {
    setIsLoading(true);
    const { status, data } = await dashboardApi.getAll();
    setIsLoading(false);

    if (status !== 200) return toast.error("Network Error");

    setDate(data);
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

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <>
      <Row>
        <Col md={6} xl={4}>
          <Card className="theme-bg bitcoin-wallet">
            <Card.Body>
              <h5 className="text-white mb-2">Bills</h5>
              <h2 className="text-white mb-3 f-w-300">
                {isLoading ? (
                  <ClipLoader
                    color="#fff"
                    size={40}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  formatNumber(data.totalBills)
                )}
              </h2>
              <span className="text-white d-block">Total Bills this Month</span>
              <i className="fas fa-file-invoice-dollar f-70 text-white"></i>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={4}>
          <Card className="theme-bg2 bitcoin-wallet">
            <Card.Body>
              <h5 className="text-white mb-2">Collected Bill</h5>
              <h2 className="text-white mb-3 f-w-300">
                {isLoading ? (
                  <ClipLoader
                    color="#fff"
                    size={40}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  formatNumber(data.totalReceipts)
                )}
              </h2>
              <span className="text-white d-block">
                Total Collected Bill this Year
              </span>
              <i className="fas fa-receipt f-70 text-white" />
            </Card.Body>
          </Card>
        </Col>
        <Col md={12} xl={4}>
          <Card className="bg-c-blue bitcoin-wallet">
            <Card.Body>
              <h5 className="text-white mb-2">Expenses</h5>
              <h2 className="text-white mb-3 f-w-300">
                {isLoading ? (
                  <ClipLoader
                    color="#fff"
                    size={40}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  formatNumber(data.totalExpenses)
                )}
              </h2>
              <span className="text-white d-block">
                Total Expenses this Year
              </span>
              <i className="fas fa-money-bill-wave f-70 text-white" />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xl={8}>
          <Card>
            <Card.Body className="border-bottom">
              <h4>Collected Bills This Year</h4>
              <Chart
                {...pieChart2}
                series={[
                  {
                    name: "Collected Bills",
                    data: data.receipts.map((b) => {
                      b.x = new Date(b.x).getTime();

                      return [b.x, b.y];
                    }),
                  },
                ]}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={4}>
          <Row>
            <Col xl={12} lg={12} sm={12} xs={12}>
              <Card>
                <Card.Body>
                  <div className="row align-items-center justify-content-center">
                    <div className="col">
                      <h3 className="text-c-green">
                        {isLoading ? (
                          <ClipLoader
                            size={40}
                            color="#8c9bd4"
                            data-testid="loader"
                            aria-label="Loading Spinner"
                          />
                        ) : (
                          `00${formatNumber(data.totalContracts)}`
                        )}
                      </h3>
                      <h5>Active Contracts</h5>
                    </div>
                    <div className="col text-right">
                      <img
                        src={shape3}
                        style={{ width: "80px" }}
                        alt="activity-user"
                      />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={12} lg={12} sm={12} xs={12}>
              <Card>
                <Card.Body>
                  <h5>Cash Movement This Year</h5>
                  {isLoading ? (
                    <ClipLoader
                      size={40}
                      color="#8c9bd4"
                      data-testid="loader"
                      aria-label="Loading Spinner"
                    />
                  ) : (
                    <Chart
                      {...pieChart1}
                      series={[
                        data.totalReceipts,
                        data.totalBills,
                        data.totalExpenses,
                      ]}
                    />
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;