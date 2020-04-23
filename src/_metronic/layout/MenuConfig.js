export default {
  header: {
    self: {},
    items: [
      {
        title: "Dashboards",
        root: true,
        alignment: "left",
        page: "dashboard",
        translate: "MENU.DASHBOARD"
      },
      {
        title: "Deposit",
        root: true,
        alignment: "left",
        toggle: "click",
        page: "deposit"
      },
      {
        title: "Withdrawl",
        root: true,
        alignment: "left",
        toggle: "click",
        page: "withdrawl"
      },
      {
        title: "Account",
        root: true,
        alignment: "left",
        toggle: "click",
        page: "account"
      }
    ]
  },
  aside: {
    self: {},
    items: [
      {
        title: "Dashboard",
        root: true,
        icon: "flaticon2-architecture-and-city",
        page: "dashboard",
        translate: "MENU.DASHBOARD",
        bullet: "dot"
      },
      {
        title: "Deposit",
        root: true,
        icon: "flaticon2-expand",
        page: "deposit"
      },
      {
        title: "Withdrawl",
        root: true,
        icon: "flaticon2-expand",
        page: "withdrawl"
      },
      {
        title: "Account",
        root: true,
        icon: "flaticon2-expand",
        page: "account"
      }
    ]
  }
};
