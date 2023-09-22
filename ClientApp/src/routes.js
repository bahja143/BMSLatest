import React, { Suspense, Fragment, lazy } from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import Loader from "./components/Loader/Loader";
import AdminLayout from "./layouts/AdminLayout";

import AuthGuard from "./components/Auth/AuthGuard";

import { BASE_URL } from "./config/constant";

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes ? (
                    renderRoutes(route.routes)
                  ) : (
                    <Component {...props} />
                  )}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes = [
  {
    exact: true,
    path: "/auth/signin",
    component: lazy(() => import("./views/auth/SignIn5")),
  },
  {
    exact: true,
    path: "/auth/changePassword",
    component: lazy(() => import("./views/auth/ChangePassword")),
  },
  {
    path: "*",
    layout: AdminLayout,
    guard: AuthGuard,
    routes: [
      {
        exact: true,
        path: "/",
        component: lazy(() => import("./views/Dashboard/Dashboard")),
      },
      {
        exact: true,
        path: "/setup/tenants",
        component: lazy(() => import("./views/Tenant/Tenants")),
      },
      {
        exact: true,
        path: "/setup/rooms",
        component: lazy(() => import("./views/Room/Rooms")),
      },
      {
        exact: true,
        path: "/setup/buildings",
        component: lazy(() => import("./views/Building/Buildings")),
      },
      {
        exact: true,
        path: "/setup/expensecategories",
        component: lazy(() =>
          import("./views/ExpenseCategory/ExpenseCategories")
        ),
      },
      {
        exact: true,
        path: "/contract/contractform",
        component: lazy(() => import("./views/Contract/ContractForm")),
      },
      {
        exact: true,
        path: "/contract/contractform/edit/:id",
        component: lazy(() => import("./views/Contract/ContractForm")),
      },
      {
        exact: true,
        path: "/contract/contracts",
        component: lazy(() => import("./views/Contract/Contracts")),
      },
      {
        exact: true,
        path: "/receipt/form",
        component: lazy(() => import("./views/Receipt/ReceiptForm")),
      },
      {
        exact: true,
        path: "/receipt/form/:id",
        component: lazy(() => import("./views/Receipt/ReceiptForm")),
      },
      {
        exact: true,
        path: "/bill/bills",
        component: lazy(() => import("./views/Bill/Bills")),
      },
      {
        exact: true,
        path: "/reports/contracts",
        component: lazy(() => import("./views/Contract/Report")),
      },
      {
        exact: true,
        path: "/reports/contracts",
        component: lazy(() => import("./views/Contract/Report")),
      },
      {
        exact: true,
        path: "/reports/receipts",
        component: lazy(() => import("./views/Receipt/Report")),
      },
      {
        exact: true,
        path: "/setup/users",
        component: lazy(() => import("./views/User/Users")),
      },
      {
        exact: true,
        path: "/user/profile",
        component: lazy(() => import("./views/User/Profile")),
      },
      {
        exact: true,
        path: "/message/newMessage",
        component: lazy(() => import("./views/Message/MessageForm")),
      },
      {
        exact: true,
        path: "/message/messages",
        component: lazy(() => import("./views/Message/Messages")),
      },
      {
        exact: true,
        path: "/expense/form",
        component: lazy(() => import("./views/Expense/ExpenseForm")),
      },
      {
        exact: true,
        path: "/reports/expenses",
        component: lazy(() => import("./views/Expense/Report")),
      },
      {
        path: "*",
        exact: true,
        component: () => <Redirect to={BASE_URL} />,
      },
    ],
  },
];

export default routes;
