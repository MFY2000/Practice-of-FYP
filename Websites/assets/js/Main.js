
function  nextQuestion() {
 
var Questionslimit = getDataFromFB("Questions/Total/details/"); //("38");
var LanguagesLimit = getDataFromFB("Languages/Total/details/"); //("10");

var randomQuestion = ReturnInt(Math.random() * Questionslimit);
var randomLanguage = ReturnInt(Math.random() * LanguagesLimit);

var Question = getDataFromFB("Questions/" + randomQuestion + "/details/");
var Language = getDataFromFB("Languages/" + randomLanguage + "/");

var hardQA = ReturnInt(Question.Time)
var hardLn = ReturnInt(Language.Time)

var TotalDays = hardQA + hardLn;
const deadLine = new Date(new Date().setDate(new Date().getDate() + TotalDays));

initializeClock('clockdiv', deadLine);

var Running = {"Task":(Question.Heading),"detail":(Question.detail),"Language":(Language.details), "deadLine": deadLine}
writeData("Running/",Running)

}

function ReturnInt(value){
  return (parseInt(value))
}

function setScreen(){
  var data = getDataFromFB("Running/");
  getUserList();

  data = data["details"];

  document.getElementById("Task").value = data["Task"];
  document.getElementById("Language").value = data["Language"];
  document.getElementById("Paragraph").value = data["detail"];

  initializeClock('clockdiv', data["deadLine"]);
  CheckTask(deadLine);
}

function CheckTask(deadline){
  const taskDeadline = new Date(deadline);
  
  if(taskDeadline < (new Date()))
    nextQuestion();
}
// CheckTask()


setScreen();
