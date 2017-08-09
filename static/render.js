/* global Beef */
/* global $ */

Beef.render = () => {
  $("section").css("display", "none");
  $("." + Beef.state.currentPage).css("display", "block");
};
