/* global Beef */
/* global $ */

Beef.render = () => {
  $("section").css("display", "none");
  console.log(Beef.state.currentPage);
  $("." + Beef.state.currentPage).css("display", "block");
  if (Beef.state.currentUser) {
    $(".current-user").html(Beef.state.currentUser.email);
  }
};
