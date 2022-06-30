var $today = $("#today");
var $timeBlocks = $(".time-block");
var $scheduleArea = $(".schedule");
var toDoItems = [];
var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");

function initializeSchedule(){

  //Time Blocks
  $timeBlocks.each(function(){
    var $thisBlock = $(this);
    var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

    var todoObj = {
      //connects the data-hour to todo hour
      hour: thisBlockHr,
      //converts to string
      text: "",
    }
    //adds to toDoItems array
    toDoItems.push(todoObj);
  });

  // save array to local storage after stringifying
    localStorage.setItem("todos", JSON.stringify(toDoItems));
    
}

//This section sets the blocks of time to display a colour according to time of day
function setUpTimeBlocks(){
    $timeBlocks.each(function(){
      var $thisBlock = $(this);
      var thisBlockHr = parseInt($thisBlock.attr("data-hour"));

      //This should colour the time blocks according to whether or not the time is 'present' or in the past.
      if (thisBlockHr == currentHour) {
        $thisBlock.addClass("present").removeClass("past future");
      }
      if (thisBlockHr < currentHour) {
        $thisBlock.addClass("past").removeClass("present future");
      }
      if (thisBlockHr > currentHour) {
        $thisBlock.addClass("future").removeClass("past present");
      }
    });
}

function renderSchedule(){
  //what am I doing wrong?
  toDoItems = localStorage.getItem("todos");
  toDoItems = JSON.parse(toDoItems);

  //For loop to assign text to hour block
  //creates a new variable where [data-hour={hour}] then insert into $('[data-hour={hour}')
  for (var i = 0; i < toDoItems.length; i++){
    var itemHour = toDoItems[i].hour;
    var itemText = toDoItems[i].text; 
   
    $("[data-hour=" + itemHour + "]").children("textarea").val(itemText);
  }

  console.log(toDoItems);
}

function saveHandler(){
  var $thisBlock = $(this).parent();

  var hourToUpdate = $(this).parent().attr("data-hour");
  var itemToAdd = (($(this).parent()).children("textarea")).val();

  //checks which button was clicked to coincide with which hour to update
  for (var j = 0; j < toDoItems.length; j++){
    if (toDoItems[j].hour == hourToUpdate){
      // this is where the text area stores the text
      toDoItems[j].text = itemToAdd;
    }
  }
  localStorage.setItem("todos", JSON.stringify(toDoItems));
  renderSchedule();
}

// document startup
$(document).ready(function(){

  //set up the timeblocks according to time
  setUpTimeBlocks();
  //check local storage for saved input
  if(!localStorage.getItem("todos")){
    //pull stored items
    initializeSchedule();
  }

   //Retrieve schedule from local storage
  renderSchedule();
  
  //when input is entered and save button clicked, text remains
  $scheduleArea.on("click", "button", saveHandler);

  $today.text(currentDate);
  
});