function TestPostSlackMessage(){
  PostSlackMessage("hoge", null, true);
}

function TestIdCompare(){
  const a1 = {"id": "[1-02]", "tier": 1};
  const b1 = {"id": "[1-12]", "tier": 1};
  Logger.log(idCompare(a1, b1));
  const a2 = {"id": "[1-02]", "tier": 2};
  const b2 = {"id": "[1-12]", "tier": 1};
  Logger.log(idCompare(a2, b2));
  const a3 = {"id": "[3-02]", "tier": 2};
  const b3 = {"id": "[2-12]", "tier": 3};
  Logger.log(idCompare(a3, b3));
  const a4 = {"id": "[ex-02]", "tier": 2};
  const b4 = {"id": "[2-12]", "tier": 2};
  Logger.log(idCompare(a4, b4));
  const a5 = {"id": "[ex-02]", "tier": 1};
  const b5 = {"id": "[2-12]", "tier": 2};
  Logger.log(idCompare(a5, b5));
}

function TestPostGameSchedule(){
  const current_time = new Date(2020, 2, 7, 15);
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