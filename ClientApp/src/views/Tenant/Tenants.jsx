import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { MDBDataTableV5 } from "mdbreact";
import FontAwesome from "react-fontawesome";
import * as Yup from "yup";
import jwt from "jwt-decode";

import CustomLoader from "../../components/Loader/CustomLoader";
import ViewTenant from "../Tenant/ViewTenant";
import NewTenantModal from "./NewTenantModal";
import tenantsApi from "../../api/tenantsApi";

const schema = Yup.object({
  id: Yup.number(),
  name: Yup.string().min(5).max(50).required().label("Name"),
  photo: Yup.string().label("Photo"),
  telephone: Yup.string().required().label("Telephone"),
  identityDocument: Yup.string().label("Identity document"),
  messageChannel: Yup.string().label("Message channel"),
  address: Yup.string().label("Address"),
});

const Tenants = () => {
  const [tableHeaders] = useState([
    { label: "Name", field: "name" },
    { label: "Telephone", field: "telephone" },
    { label: "Address", field: "address" },
    { label: "", field: "edit" },
  ]);
  const [show, setShow] = useState(false);
  const [tenants, setTenants] = useState([]);
  const [tenant, setTenant] = useState({
    id: 0,
    name: "",
    photo: "",
    telephone: "",
    identityDocument: "",
    messageChannel: "SMS",
    address: "",
  });
  const [showTenant, setShowTenant] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const user = jwt(localStorage["token"]);

  const handleLoad = async () => {
    setIsLoading(true);
    const { status, data } = await tenantsApi.getAll();
    setIsLoading(false);

    if (status !== 200) return toast.error("Network Error");

    setTenants([...data]);
  };
  const handleSubmit = async (tenant, { resetForm }) => {
    resetForm();
    setShow(false);
    setIsLoading(true);

    if (tenant.id === 0) {
      const response = await tenantsApi.add({
        ...tenant,
      });
      setIsLoading(false);

      if (response.ok) {
        toast.info("Successful Registered.");
        setShow(false);
        return setTenants([response.data, ...tenants]);
      }

      if (response.status === 400)
        return toast.error("This tenant is already exist!");

      toast.error("Something went wrong");
    } else {
      const response = await tenantsApi.update(tenant.id, tenant);
      setIsLoading(false);

      if (response.ok) {
        toast.info("Successful Updates.");
        setShow(false);
        return setTenants([
          response.data,
          ...tenants.filter((c) => c.id !== tenant.id),
        ]);
      }
      toast.error("Something went wrong");
    }
  };
  const handleShow = () => {
    setShow(true);
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
  const handleEdit = (custom) => {
    const cust = { ...custom };
    delete cust.edit;
    setTenant(cust);
    setShow(true);
  };
  const handleShowTenant = (tenant) => {
    setTenant({ ...tenant });
    setShowTenant(true);
  };
  const handleCloseTenant = () => {
    setShowTenant(false);
  };

  useEffect(() => {
    handleLoad();
  }, [tenant]);

  return (
    <>
      <ViewTenant
        tenant={tenant}
        show={showTenant}
        setShow={setShowTenant}
        handleCloseTenant={handleCloseTenant}
      />
      <NewTenantModal
        show={show}
        setShow={setShow}
        tenant={tenant}
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
              <FontAwesome name="fas fa-plus-circle" />{" "}
              {isLoading ? "Creating Tenant" : "New Tenant"}
            </Button>
          ) : null}
          <Card.Title>Tenants</Card.Title>
        </Card.Header>
        <Card.Body>
          <CustomLoader isLoading={isLoading}>
            <MDBDataTableV5
              data={{
                columns: tableHeaders,
                rows: tenants.map((custom) => {
                  custom.edit = (
                    <>
                      <Button
                        onClick={() => handleShowTenant(custom)}
                        className="btn-light btn-sm"
                      >
                        <FontAwesome
                          className="fas fa-eye text-secondary"
                          style={{ fontSize: 17 }}
                          name="eye"
                        />
                      </Button>

                      {user.role === "admin" ? (
                        <Button
                          onClick={() => handleEdit(custom)}
                          className="btn-light btn-sm ml-4"
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
                  return custom;
                }),
              }}
              hover
              pagingTop
              searchTop
              entries={10}
              fullPagination
              pagesAmount={10}
              searchBottom={false}
              entriesOptions={[10, 25, 50, 100, 250, 500, 1000]}
            />
          </CustomLoader>
        </Card.Body>
      </Card>
    </>
  );
};

export default Tenants;
