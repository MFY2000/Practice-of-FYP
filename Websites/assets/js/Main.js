
function  nextQuestion() {
 
var Questionslimit = ("38");
var LanguagesLimit = ("10");

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




CheckTask()


