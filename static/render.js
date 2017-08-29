/* global Beef */
/* global $ */
//it has downloaded orders and keept them in the State

Beef.render = () => {
  $("section").css("display", "none");
  console.log(Beef.state.currentPage);
  $("." + Beef.state.currentPage).css("display", "block");
  if (Beef.state.currentUser) {
    $(".current-user").html(Beef.state.currentUser.email);
    $(".show-log-out").css("display", "none");
    $(".show-log-in").css("display", "block");
    // hide the "you are logged out" links
    // show the "you are logged in" links
  } else {
    $(".show-log-out").css("display", "block");
    $(".show-log-in").css("display", "none");
    // hide the "you are logged in" links
    // show the "you are logged out" links
  }
  $("log-in").css("display", "none");
  console.log(Beef.state);
  $("." + Beef.state.currentPage).css("display", "block");
  // const bar = () => {
  //   return "foo";
  // }
  // const bar = () => "foo";
  const renderedOrders = Beef.state.orders
    .map(order => {
      //loop
      const cutId = order.cutId;
      let cutStyle; //saves the style
      Beef.state.cuts.forEach(cut => {
        //blockscoped
        if (cutId === cut.id) {
          cutStyle = cut.style;
        }
      });
      return `
        <div>
          Pending Orders
        </div>
        <div>
          ${cutStyle}
        </div>
        <div>
          ${order.price} 
        </div>
        <div>
          ${order.delivery} 
        </div>
        <div>
          <button order-id="${order.id}" class="delete-order">Delete Order</button>
        </div>
      `;
      //add clases or table if wanted
    })
    .join("");
  $(".my-orders").html(`
    <h3>Your Orders</h3>
    ${renderedOrders}
  `);
  //complete how I want the order to look.
  //To be used later on for User Administration Page
  // const renderedUsers = Beef.state.users
  //   .map(
  //     user => `
  //     <div>
  //     ${user.email}
  //     ${user.password}
  //     </div>
  //     `
  //   )
  //   .join("");
  // $(".welcome").html(`
  // <h4>Welcome</h4>
  // ${renderedUsers}
  // `);

  const renderedCuts = Beef.state.cuts
    .map(
      cut => `
    <div>
    ${cut.style}
    ${cut.weight}
    </div>
    `
    )
    .join("");
  $(".administrator-details").html(`
    <h5>Inventory</h5>
    ${renderedCuts}
  `);

  $(".select-cut").html(
    Beef.state.cuts.map(cut => {
      //cut.id info for back end purposes, cut.style for user purposes
      return `
  <option value="${cut.id}">
  ${cut.style}
  </option>
  `;
    })
  );

  // if (renderedOrders){
  //   $//user doesn't input the email or password, it should go red
  // }
  //   $Beef.state.orders);
  // then();

  //const renderCuts = Beef.state.cuts
  //Code 12-19 is per page. A page for orders, cuts, user
  //$(".my-orders").html(JSON.stringify(Beef.state.orders));
};
