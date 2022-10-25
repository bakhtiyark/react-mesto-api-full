function toggleList() {
  const list = document.getElementById("header__bar");
  const button = document.getElementById("navbar-toggle");
  if (list.style.display === "flex") {
    list.style.display = "none"
    button.classList.remove("header__bar_mobile-button_pressed");
  } else {
    list.style.display = "flex";
    button.classList.add("header__bar_mobile-button_pressed");
  }
}
export default toggleList;