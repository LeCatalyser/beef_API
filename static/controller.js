/* global Beef */
/* global $ */
//All info in this file is about user clicking the page or submitting information.
$(".make-cut").on("click", e => {
  //user did something is controller logic.
});

$(".make-order").on("click", e => {});

//As user I want to review past orders
//As user I want to update current order
//As an administrator I want to add price
//As an administrator I want to add/delete cuts
//As an administrator I want to grant/revoke access

$(".create-user").on("click", e => {
  Beef.postUser({
    email: $(".email").val(),
    password: $(".password").val()
  }).then(user => {
    Beef.state.currentUser = user;
    Beef.state.currentPage = "order-form";
    Beef.render();
  });
});

$(".administrator").on("click", e => {
  Beef.createCuts({
    style: $(".style").val(),
    weight: $(".weight").val()
  }).then(order => {
    Beef.state.currentCut = order;
    Beef.render();
  });
});

$(function() {
  Beef.getCuts();
  Beef.getOrders();
  Beef.getUsers();
  Beef.render();
});

$(".sign-up-link").on("click", function() {
  Beef.state.currentPage = "sign-up";
  console.log("sign up");
  Beef.render();
});

$(".welcome-link").on("click", function() {
  Beef.state.currentPage = "welcome";
  Beef.render();
});

$(".log-in").on("click", function() {
  Beef.state.currentPage = "log-in";
  Beef.state.currentPage = "order-form";
  Beef.render();
});

$(".order-form-link").on("click", function() {
  Beef.state.currentPage = "order-form";
  Beef.render();
});

$(".new-order").on("submit", function() {
  Beef.createOrder({
    delivery: $(".delivery").val(),
    price: $(".price").val(),
    cutId: $(".cut").val(),
    quantity: $(".quantity").val()
  }).then(order => {
    Beef.state.currentPage = order;
    Beef.state.currentPage = "new-order";
    Beef.render(); //I'm guessing I can't see this until my databese is working?
  });
});

$(".my-orders-link").on("click", function() {
  Beef.state.currentPage = "my-orders";
  Beef.render();
});

$(".administrator-link").on("click", function() {
  //need a promise
  Beef.state.currentPage = "administrator";
  Beef.render();
});
