function TestPostSlackMessage(){
  PostSlackMessage("hoge");
}

function TestIdCompare(){
  Logger.log(idCompare("[1-02]","[1-12]"));
}

function TestPostGameSchedule(){
  const current_time = new Date(2019, 5, 13, 15);
  PostGameSchedule(current_time, true);
}