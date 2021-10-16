
function  nextQuestion() {
  var getvalue = firebase.database().ref("/");
      getvalue.on('value', function(snapshot) {
        const data = snapshot.val();

        
  var Questionslimit = data["Questions"]["Total"]["details"];
  var LanguagesLimit = data["Languages"]["Total"]["details"];
  
  var randomQuestion = ReturnInt(Math.random() * Questionslimit);
  var randomLanguage = ReturnInt(Math.random() * LanguagesLimit);
  
  var Question = data["Questions"][randomQuestion]["details"], 
  Language = data["Languages"][randomLanguage];

  var hardQA = ReturnInt(Question.Time)
  var hardLn = ReturnInt(Language.Time)
  
  const deadLine = new Date(new Date().setDate(new Date().getDate() + (hardQA + hardLn)));

  console.log(deadLine);
  
  initializeClock('clockdiv', deadLine);

  var Running = {"Task":(Question.Heading),"detail":(Question.detail),"Language":(Language.details), "deadLine": deadLine}
  writeData("Running/",Running)


  setScreen({"details":data});
  });
}

function ReturnInt(value){
  return (parseInt(value))
}




CheckTask()


