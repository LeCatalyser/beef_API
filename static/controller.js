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
  //need beef.log in to very credentials.
  const email = $(".log-in-email").val();
  const password = $(".log-in-password").val();
  Beef.logIn(email, password)
    .then(() => {
      return Beef.getUsers();
    })
    .then(users => {
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
        $(".log-in-email").val("");
        $(".log-in-password").val("");
      } else {
        alert("User doesn't exist");
      }
    })
    .catch(err => {
      alert(err.message);
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
    cutId: $(".select-cut").val(),
    quantity: $(".quantity").val()
  })
    .then(order => {
      Beef.state.currentPage = order;
      Beef.state.currentPage = "my-orders";
      return Beef.getOrders(); //I'm guessing I can't see this until my databese is working?
    })
    .then(() => {
      Beef.render(); //be asyncronous
    });
});

$(".create-order").on("click", function(e) {
  console.log("invalid?");
  $(e.currentTarget).parent().addClass("submit");
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

$(".log-out-link").on("click", function() {
  Beef.state.currentPage = "welcome";
  Beef.state.currentUser = null;
  Beef.render();
});

$(".new-order-link").on("click", function() {
  Beef.state.currentPage = "order-form";
  Beef.render();
});

$(".landing-page-link").on("click", function() {
  Beef.state.currentPage = "welcome";
  Beef.render();
});
//need event delegation
$("body").on("click", "button.delete-order", function(e) {
  const orderId = $(e.currentTarget).attr("order-id");
  Beef.state.currentOrder = "order-form";
  Beef.deleteOrder(orderId)
    .then(function() {
      return Beef.getOrders(); //promise chain
      //when it gets back to me render results to page
    })
    .then(function() {
      Beef.render();
    });
});

$(".password-help-link").on("click", function() {
  Beef.state.currentPage = "forgotten-password";
  Beef.render();
});

$(".password-help").on("click", function() {
  Beef.state.currentPage = "check-email";
  Beef.render();
});

$(".home-page-link").on("click", function() {
  Beef.state.currentPage = "landing-page";
  Beef.render();
});
