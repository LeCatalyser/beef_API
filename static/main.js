console.log("hello world");
fetch("/cuts")
  .then(res => {
    return res.json();
  })
  .then(cuts => {
    console.log(cuts);
  });

$(".make-cut").on("click", e => {
  fetch("/cuts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      style: "Flank",
      weight: 5000
    })
  })
    .then(res => {
      return res.json();
    })
    .then(cut => {
      console.log(`I just created a cut with id ${cut.id}`);
    });
});
