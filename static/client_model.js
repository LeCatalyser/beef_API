window.Beef = {};

/* global Beef */

Beef.state = {
  //local copy of API objects
  orders: [], //will download the data from server
  cuts: [],
  users: [],
  currentPage: "welcome"
};

Beef.getOrders = () => {
  //make one of these per endpoint
  return fetch("/orders", {
    method: "GET"
  })
    .then(res => {
      return res.json();
    })
    .then(orders => {
      console.log(orders);
      Beef.state.orders = orders;
    });
};

Beef.getCuts = () => {
  return fetch("/cuts", {
    method: "GET"
  })
    .then(res => {
      return res.json();
    })
    .then(cuts => {
      console.log(cuts);
      Beef.state.cuts = cuts;
    });
};

Beef.getUsers = () => {
  return fetch("/users", {
    method: "GET"
  })
    .then(res => {
      return res.json();
    })
    .then(users => {
      console.log(users);
      Beef.state.users = users;
    });
};

Beef.createCuts = () => {
  fetch("/cuts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(
      {
        style: "Flank",
        weight: 5000
      },
      {
        style: "S-Insco",
        weight: 42000
      },
      {
        style: "Rost-biff",
        weight: 42000
      },
      {
        style: "Flap",
        weight: 42000
      },
      {
        style: "Brisket",
        weight: 42000
      },
      {
        style: "Skirt",
        weight: 42000
      },
      {
        style: "Rump-caps",
        weight: 42000
      },
      {
        style: "strip-loin",
        weight: 42000
      }
    )
  })
    .then(res => {
      return res.json();
    })
    .then(cut => {
      console.log(`I just created a cut with id ${cut.id}`);
    });
};

Beef.createOrder = () => {
  fetch("/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json" //explanation
    },
    body: JSON.stringify({
      delivery: Date, //do we need to config this?
      price: Number,
      cutId: "string",
      quantity: Number
    })
  })
    .then(res => {
      return res.json();
    })
    .then(order => {
      console.log(`I just created a cut with id ${order.id}`);
    });
};
