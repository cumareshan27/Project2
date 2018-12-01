    function populateQuestion(selectQuestion) {
    var listOption = $("<option>");
    listOption.attr("value", question.id);
    listOption.text(question.prompt);
    return listOption;
  }
