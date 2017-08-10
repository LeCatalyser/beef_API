/* global Beef */
/* global $ */
//All info in this file is about user clicking the page or submitting information.
$(".make-cut").on("click", e => {
  //user did something is controller logic.
});

//ACTIONS: CONTROLER Things users can do.
//User story
//As user of Beef USA I want to log in with my email/password

//this gets me the form log in, but I haven't told the code
//how to populate the database/confirm log in credentials

//Once I log in, greeting top of page
//As user I want to create and order

$(".make-order").on("click", e => {});

//As user I want to review past orders
//As user I want to update current order
//As an administrator I want to add price
//As an administrator I want to add/delete cuts
//As an administrator I want to grant/revoke access

$(function() {
  Beef.getCuts();
  Beef.getOrders();
  Beef.getUsers();
  Beef.render();
});

$(".sign-up").on("click", function() {
  Beef.state.currentPage = "sign-up";
  Beef.render();
});

$(".log-in").on("click", function() {
  Beef.state.currentPage = "order-form";
  Beef.render();
});
