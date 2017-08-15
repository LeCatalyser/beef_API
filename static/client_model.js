window.Beef = {};

/* global Beef */

Beef.state = {
  //local copy of API objects
  orders: [], //will download the data from server
  cuts: [],
  users: [],
  currentPage: "welcome",
  currentUser: null
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

Beef.createCuts = newCut => {
  return fetch("/cuts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      style: newCut.style,
      weight: newCut.weight
    })
  })
    .then(res => {
      return res.json();
    })
    .then(cut => {
      console.log(`I just created a cut with id ${cut.id}`);
    });
};

Beef.createOrder = newOrder => {
  return fetch("/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json" //explanation
    },
    body: JSON.stringify({
      delivery: newOrder.delivery, //do we need to config this?
      price: newOrder.price,
      cutId: newOrder.cutId,
      quantity: newOrder.quantity,
      userId: "placeholder until we have a userId"
    })
  })
    .then(res => {
      return res.json();
    })
    .then(order => {
      console.log(`I just created a cut with id ${order.id}`);
      return order;
    });
};

Beef.putOrder = modifyOrder => {
  return fetch("orders/:id", {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      delivery: modifyOrder.delivery,
      quantity: modifyOrder.quantity
    })
  })
    .then(res => {
      return res.json();
    })
    .then(order => {
      console.log(`Order has been modified with id ${order.id}`);
      return order;
    });
};

// DELETE /orders/5unpqiweunfiq/Remember delete doesn't have a body bc working with specific id
Beef.deleteOrder = orderId => {
  return fetch(`/orders/${orderId}`, {
    method: "DELETE"
  });
};
