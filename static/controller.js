/* global Beef */
/* global $ */
//All info in this file is about user clicking the page or submitting information.
$(".make-cut").on("click", e => {});

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
    Beef.state.currentPage = "landing-page";
    Beef.render();
  });
});

$(".new-cut-link").on("click", e => {
  Beef.createCuts({
    style: $(".style").val(),
    weight: $(".weight").val()
  })
    .then(cut => {
      $(".style").val("");
      $(".weight").val("");
      Beef.state.currentCut = cut;
      Beef.render();
      return Beef.getCuts();
    })
    .then(() => {
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
  // Beef.state.currentPage = "landing-page";
  Beef.render();

  Beef.getUsers().then(users => {
    console.log(users);
    //alert("User not found");
    const correctEmail = $(".log-in-email").val(); //how we get user out of input element
    const user = users.find(user => {
      return user.email === correctEmail;
    });
    if (user) {
      Beef.state.currentPage = "landing-page";
      Beef.state.currentUser = user;
      Beef.render();
    } else {
      alert("User doesn't exist");
    }
  });
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
    Beef.state.currentPage = "order-form";
    Beef.render(); //I'm guessing I can't see this until my databese is working?
  });
});

$(".landing-page").on("click", function() {
  Beef.state.currentPage = "my-orders";
  Beef.render();
});

$(".administrator-link").on("click", function() {
  //need a promise
  Beef.state.currentPage = "administrator";
  Beef.render();
});

$(".log-out-link").on("click", function() {
  Beef.state.currentPage = "welcome";
  Beef.render();
});

$(".landing-page").on("click", function() {
  Beef.state.currentPage = "order-form";
  Beef.render();
});
