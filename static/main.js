//single source of truth-MODEL
//Cleaning up model functions. Not calling them immediately
//Checklist
//delete end points will need id's
//for post I need information of what I am creating. It does need the object/thing to create
//PUT needs (combo of POST/DELETE) Need ID and object that I am modifying
const state = {
  //local copy of API objects
  orders: [], //will download the data from server
  cuts: [],
  users: [],
  currentPage: "welcome"
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

// const postOrders = () => {
//   return fetch("/orders", {
//     method: "POST"
//   })
//     .then(res => {
//       return res.json();
//     })
//     .then(orders => {
//       console.log(orders);
//       state.orders = orders;
//     });
// };
// postOrders();

// const postCuts = () => {
//   return fetch("/cuts", {
//     method: "POST"
//   })
//     .then(res => {
//       return res.json();
//     })
//     .then(cuts => {
//       console.log(cuts);
//       state.cuts = cuts;
//     });
// };
// postCuts();

// const postUsers = () => {
//   return fetch("/users", {
//     method: "POST"
//   })
//     .then(res => {
//       return res.json();
//     })
//     .then(users => {
//       console.log(users);
//       state.users = users;
//     });
// };
// postUsers();

// const putOrders = () => {
//   return fetch("/orders", {
//     method: "PUT"
//   })
//     .then(res => {
//       return res.json();
//     })
//     .then(orders => {
//       console.log(orders);
//       state.orders = orders;
//     });
// };
// putOrders();

// const putCuts = () => {
//   return fetch("/cuts", {
//     method: "PUT"
//   })
//     .then(res => {
//       return res.json();
//     })
//     .then(cuts => {
//       console.log(cuts);
//       state.cuts = cuts;
//     });
// };
// putCuts();

// const putUsers = () => {
//   return fetch("/users", {
//     method: "PUT"
//   })
//     .then(res => {
//       return res.json();
//     })
//     .then(users => {
//       console.log(users);
//       state.users = users;
//     });
// };
// putUsers();

// const deleteOrders = () => {
//   return fetch("/orders", {
//     method: "DELETE"
//   })
//     .then(res => {
//       return res.json();
//     })
//     .then(orders => {
//       console.log(orders);
//       state.orders = orders;
//     });
// };
// deleteOrders();

// const deleteCut = () => {
//   return fetch("/cut", {
//     method: "DELETE"
//   })
//     .then(res => {
//       return res.json();
//     })
//     .then(cut => {
//       console.log(cut);
//       state.cut = cut;
//     });
// };
// deleteCut();

// const deleteUser = () => {
//   return fetch("/users", {
//     method: "DELETE"
//   })
//     .then(res => {
//       return res.json();
//     })
//     .then(users => {
//       console.log(users);
//       state.users = users;
//     });
// };
// deleteUser();

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

//Rendering-VIEW//focus on the main Render function
//Checklist
//Render info per page
//Set up page pick to show/hide current page
//
const render = () => {
  $("section").css("display", "none");
  $("." + state.currentPage).css("display", "block");
};
//build out the getCuts function, have data at state.cuts

//ACTIONS: CONTROLER Things users can do.
//User story
//As user of Beef USA I want to log in with my email/password
//Once I log in, greeting top of page
//As user I want to create and order
//As user I want to review past orders
//As user I want to update current order
//As an administrator I want to add price
//As an administrator I want to add/delete cuts
//As an administrator I want to grant/revoke access

$(function() {
  getCuts();
  getOrders();
  getUsers();
  render();
});
$(".log-in").on("click", function() {
  state.currentPage = "order-form";
  render();
});

//create second landing page-Users
//create third landing page-Administrators
