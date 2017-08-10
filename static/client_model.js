window.Beef = {};

/* global Beef */

Beef.state = {
  //local copy of API objects
  orders: [], //will download the data from server
  cuts: [],
  users: [],
  currentPage: "welcome-back"
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
    //sends a lists of users
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      return res.json();
    })
    .then(users => {
      console.log(users);
      Beef.state.users = users;
    });
};

Beef.postUser = newUser => {
  //only sends the single user I just created
  return fetch("/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: newUser.email,
      password: newUser.password
    })
  })
    .then(res => {
      return res.json();
    })
    .then(user => {
      console.log(user);
      return user;
    });
};

// HOW this will be called, in the controller
// Beef.postUser({
//   email: "email@example.com",
//   password: "example-password"
// }).then(user => {
//   console.log(`I just created a user! The id is ${user.id}`);
// });

Beef.createCuts = () => {
  //universal function
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
