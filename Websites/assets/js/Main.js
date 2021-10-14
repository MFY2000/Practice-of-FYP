
function  nextQuestion() {
 
var Questionslimit = ReturnInt("38");
var LanguagesLimit = ReturnInt("10");

var randomQuestion = ReturnInt(Math.random() * Questionslimit);
var randomLanguage = ReturnInt(Math.random() * LanguagesLimit);

var Question = getDataFromFB("Questions/" + randomQuestion + "/details/");
var Language = getDataFromFB("Languages/" + randomLanguage + "/");

var hardQA = ReturnInt(Question.Time)
var hardLn = ReturnInt(Language.Time)

var TotalDays = hardQA + hardLn;
const deadLine = new Date(new Date().setDate(new Date().getDate() + 1));

var Running = {"Task":(Question.Heading),"detail":(Question.detail),"Language":(Language.details), "deadLine": deadLine}
writeData("Running/",Running)

}

function ReturnInt(value){
  return (parseInt(value))
}


function CheckTask(){
  const taskDeadline = new Date("Thu Oct 14 2021 16:34:15 GMT+0500 (Pakistan Standard Time)");
  
  if(taskDeadline < (new Date()))
    nextQuestion();
  else{
    alert("sd")
    getTask();
  }
}
// CheckTask()


getUserList();
