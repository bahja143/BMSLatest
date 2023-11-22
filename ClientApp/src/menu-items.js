import jwt from "jwt-decode";

const user = localStorage["token"] ? jwt(localStorage["token"]) : {};

const adminItems = {
  items: [
    {
      id: "navigation",
      title: "Home",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "dashboard",
          title: "Dashboard",
          type: "item",
          icon: "feather icon-home",
          url: "/",
        },
      ],
    },
    {
      id: "Setup",
      title: "Setup",
      type: "group",
      icon: "icon-ui",
      children: [
        {
          id: "Registration",
          title: "List",
          type: "collapse",
          icon: "feather icon-box",
          children: [
            {
              id: "Tenants",
              title: "Tenants",
              type: "item",
              url: "/setup/tenants",
            },
            {
              id: "Buildings",
              title: "Buildings",
              type: "item",
              url: "/setup/buildings",
            },
            {
              id: "Rooms",
              title: "Rooms",
              type: "item",
              url: "/setup/rooms",
            },
            {
              id: "Expense Categories",
              title: "Expense Categories",
              type: "item",
              url: "/setup/expensecategories",
            },
            {
              id: "User",
              title: "Users",
              type: "item",
              url: "/setup/users",
            },
          ],
        },
      ],
    },
    {
      id: "Contracts",
      title: "Contracts",
      type: "group",
      icon: "icon-group",
      children: [
        {
          id: "Contract Form",
          title: "New Contract",
          type: "item",
          icon: "feather icon-check-square",
          url: "/contract/contractform",
        },
        {
          id: "Contracts",
          title: "Contracts",
          type: "item",
          icon: "feather icon-file",
          url: "/contract/contracts",
        },
      ],
    },
    {
      id: "Bills & Receipts",
      title: "Bills & Receipts",
      type: "group",
      icon: "icon-table",
      children: [
        {
          id: "Bills",
          title: "Bills",
          type: "item",
          icon: "feather icon-repeat",
          url: "/bill/bills",
        },
        {
          id: "Receipt",
          title: "Receipt",
          type: "item",
          icon: "feather icon-server",
          url: "/receipt/form",
        },
        {
          id: "Expense",
          title: "New Expense",
          type: "item",
          icon: "feather icon-credit-card",
          url: "/expense/form",
        },
      ],
    },
    {
      id: "Reports",
      title: "Reports",
      type: "group",
      icon: "icon-table",
      children: [
        {
          id: "All Contracts",
          title: "All Contracts",
          type: "item",
          icon: "feather  icon-clipboard",
          url: "/reports/contracts",
        },
        {
          id: "All Receipts",
          title: "Payments",
          type: "item",
          icon: "feather icon-bar-chart-2",
          url: "/reports/receipts",
        },
        {
          id: "All Expenses",
          title: "Expenses",
          type: "item",
          icon: "feather icon-activity",
          url: "/reports/expenses",
        },
      ],
    },
  ],
};

const userItems = {
  items: [
    {
      id: "navigation",
      title: "Home",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "dashboard",
          title: "Dashboard",
          type: "item",
          icon: "feather icon-home",
          url: "/",
        },
      ],
    },
    {
      id: "Setup",
      title: "Setup",
      type: "group",
      icon: "icon-ui",
      children: [
        {
          id: "Registration",
          title: "List",
          type: "collapse",
          icon: "feather icon-box",
          children: [
            {
              id: "Tenants",
              title: "Tenants",
              type: "item",
              url: "/setup/tenants",
            },
            {
              id: "Buildings",
              title: "Buildings",
              type: "item",
              url: "/setup/buildings",
            },
            {
              id: "Rooms",
              title: "Rooms",
              type: "item",
              url: "/setup/rooms",
            },
            {
              id: "Expense Categories",
              title: "Expense Categories",
              type: "item",
              url: "/setup/expensecategories",
            },
          ],
        },
      ],
    },
    {
      id: "Contracts",
      title: "Contracts",
      type: "group",
      icon: "icon-group",
      children: [
        {
          id: "Contract Form",
          title: "New Contract",
          type: "item",
          icon: "feather icon-check-square",
          url: "/contract/contractform",
        },
        {
          id: "Contracts",
          title: "Contracts",
          type: "item",
          icon: "feather icon-file",
          url: "/contract/contracts",
        },
      ],
    },
    {
      id: "Bills & Receipts",
      title: "Bills & Receipts",
      type: "group",
      icon: "icon-table",
      children: [
        {
          id: "Bills",
          title: "Bills",
          type: "item",
          icon: "feather icon-repeat",
          url: "/bill/bills",
        },
        {
          id: "Receipt",
          title: "Receipt",
          type: "item",
          icon: "feather icon-server",
          url: "/receipt/form",
        },
      ],
    },
    {
      id: "Reports",
      title: "Reports",
      type: "group",
      icon: "icon-table",
      children: [
        {
          id: "All Contracts",
          title: "All Contracts",
          type: "item",
          icon: "feather  icon-clipboard",
          url: "/reports/contracts",
        },
        {
          id: "All Receipts",
          title: "Payments",
          type: "item",
          icon: "feather icon-bar-chart-2",
          url: "/reports/receipts",
        },
        {
          id: "All Expenses",
          title: "Expenses",
          type: "item",
          icon: "feather icon-activity",
          url: "/reports/expenses",
        },
      ],
    },
  ],
};

const menuItems = user.role === "admin" ? { ...adminItems } : { ...userItems };

export default menuItems;
