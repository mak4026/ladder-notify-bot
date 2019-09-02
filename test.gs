function TestPostSlackMessage(){
  PostSlackMessage("hoge", null, true);
}

function TestIdCompare(){
  Logger.log(idCompare("[I-1-02]","[I-1-12]"));
  Logger.log(idCompare("[II-1-02]","[I-1-12]"));
}

function TestPostGameSchedule(){
  const current_time = new Date(2019, 8, 2, 15);
  PostGameSchedule(current_time, true);
}

function TestSplitGamesByDate(){
  const current_time = new Date(2019, 8, 2, 15);
  const games = GetComingUpGames(current_time);
  const splited_games = splitGamesByDate(games);
  Logger.log(splited_games);
}

function TestCreateAttachments(){
  const current_time = new Date(2019, 5, 13, 15);
  const games = GetComingUpGames(current_time);
  const attachments = createAttachments(games);
  Logger.log(attachments);
}

function TestIsChallengeSheet(){
  const regexp = /^対戦表.*/;
  const sheet_name1 = "対戦表 - tier1";
  const sheet_name2 = "対戦表 - tier2";
  const wrong_sheet = "順位表 - tier1";
  Logger.log(regexp.test(sheet_name1));
  Logger.log(regexp.test(sheet_name2));
  Logger.log(regexp.test(wrong_sheet));
}