const buttons = document.querySelectorAll(".primaryBtn");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // remove class
    buttons.forEach((b) => {
      b.classList.remove("bg-blue-700", "text-white");
      b.classList.add("bg-white");
      
    });

    //add class
    btn.classList.remove("bg-white");
    btn.classList.add("bg-blue-700", "text-white");
    console.log(btn)
  });

});

