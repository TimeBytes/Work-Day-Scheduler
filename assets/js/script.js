//dayjs plugin for advanced format
dayjs.extend(window.dayjs_plugin_advancedFormat);
//localstorage empty object
var localStorageObject = {};
$(function () {
  //add onclick event to the save button, targets the information in the text area and stores it to the local
  //storage by creating event key based on the id of parent of the targeted element
  $(".saveBtn").on("click", function (event) {
    var btnClicked = $(this).parent().children("textarea").val();
    var idOfBtnClicked = $(this).parent().attr("id");
    localStorageObject[idOfBtnClicked] = btnClicked;
    localStorage.setItem("DaySchedule", JSON.stringify(localStorageObject));
  });
  // loops through the containers using id as the selector checking from 9am - 5pm in 24hr clock and sets the background color
  for (let i = 9; i < 18; i++) {
    if (dayjs().format("HH") > i) {
      $("#hour-" + i).addClass("past");
    } else if (dayjs().format("HH") == i) {
      $("#hour-" + i).addClass("present");
    } else {
      $("#hour-" + i).addClass("future");
    }
  }
  //validates that there is data stored in local storage then loops though the object using it's key
  //as the selector and changes the value of text area
  localStorageObject = JSON.parse(localStorage.getItem("DaySchedule"));
  if (localStorageObject == null) {
    localStorageObject = {};
  } else {
    Object.keys(localStorageObject).forEach(function (key) {
      $("#" + key)
        .children("textarea")
        .val(localStorageObject[key]);
    });
  }
  // displays the date
  $("#currentDay").text(dayjs().format("dddd, MMMM, Do"));
});
