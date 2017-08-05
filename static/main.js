//single source of truth-MODEL

const state = {
  //local copy of API objects
  orders: [], //will download the data from server

  cuts: [],

  users: []
};

const getOrders = () => {
  //make one of these per endpoint
  return fetch("/orders", {
    method: "GET"
  })
    .then(res => {
      return res.json();
    })
    .then(orders => {
      console.log(orders);
      state.orders = orders;
    });
};
getOrders();

const getCuts = () => {
  return fetch("/cuts", {
    method: "GET"
  })
    .then(res => {
      return res.json();
    })
    .then(cuts => {
      console.log(cuts);
      state.cuts = cuts;
    });
};
getCuts();

const getUsers = () => {
  return fetch("/users", {
    method: "GET"
  })
    .then(res => {
      return res.json();
    })
    .then(users => {
      console.log(users);
      state.users = users;
    });
};
getUsers();

const postOrders = () => {
  return fetch("/orders", {
    method: "POST"
  })
    .then(res => {
      return res.json();
    })
    .then(orders => {
      console.log(orders);
      state.orders = orders;
    });
};
postOrders();

const postCuts = () => {
  return fetch("/cuts", {
    method: "POST"
  })
    .then(res => {
      return res.json();
    })
    .then(cuts => {
      console.log(cuts);
      state.cuts = cuts;
    });
};
postCuts();

const postUsers = () => {
  return fetch("/users", {
    method: "POST"
  })
    .then(res => {
      return res.json();
    })
    .then(users => {
      console.log(users);
      state.users = users;
    });
};
postUsers();

const putOrders = () => {
  return fetch("/orders", {
    method: "PUT"
  })
    .then(res => {
      return res.json();
    })
    .then(orders => {
      console.log(orders);
      state.orders = orders;
    });
};
putOrders();

const putCuts = () => {
  return fetch("/cuts", {
    method: "PUT"
  })
    .then(res => {
      return res.json();
    })
    .then(cuts => {
      console.log(cuts);
      state.cuts = cuts;
    });
};
putCuts();

const putUsers = () => {
  return fetch("/users", {
    method: "PUT"
  })
    .then(res => {
      return res.json();
    })
    .then(users => {
      console.log(users);
      state.users = users;
    });
};
putUsers();

const deleteOrders = () => {
  return fetch("/orders", {
    method: "DELETE"
  })
    .then(res => {
      return res.json();
    })
    .then(orders => {
      console.log(orders);
      state.orders = orders;
    });
};
deleteOrders();

/* global $ */
//will help with making posts
// $(".make-cut").on("click", e => {
//   fetch("/cuts", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       style: "Flank",
//       weight: 5000
//     })
//   })
//     .then(res => {
//       return res.json();
//     })
//     .then(cut => {
//       console.log(`I just created a cut with id ${cut.id}`);
//     });
// });

//Rendering-VIEW
const render = state => {};
//build out the getCuts function, have data at state.cuts
//ACTIONS: CONTROLER Things users can do.
