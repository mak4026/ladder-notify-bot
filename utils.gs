const ATTACHMENT_COLORS = ["#61bb46","#fdb827", "#f5821f", "#e03a3e", "#963d97", "#009ddc"];

/**
 * 時間差を日単位で返す
 *
 * @param {Date}
 * @param {Date}
 * @return {number} y - x
 */
function diffDay(x,y){
  const SECOND_MILLISECOND = 1000,
      MINUTE_MILLISECOND = 60 * SECOND_MILLISECOND,
      HOUR_MILLISECOND = 60 * MINUTE_MILLISECOND,
      DAY_MILLISECOND = 24 * HOUR_MILLISECOND,
      WEEK_MILLISECOND = 7 * DAY_MILLISECOND;
  return (y.getTime() - x.getTime()) / DAY_MILLISECOND;
}

function idCompare(a, b){
  const regexp = /\[(\d+)-(\d+)\]/;
  
  const b_tier_id = b["tier"];
  const b_game_id = b["id"].match(regexp)[2];
  const a_tier_id = a["tier"];
  const a_game_id = a["id"].match(regexp)[2];
  
  if(a_tier_id === b_tier_id){
    return a_game_id - b_game_id;
  } else {
    return a_tier_id - b_tier_id;
  }
}

function getTierFromSheetName(sheet){
  const sheet_name = sheet.getName();
  for(let [id, name] of tier_name.entries()){
    if(sheet_name.includes(name)){
      return id;
    }
  }
  throw new Error("invalid sheet");
}

function getColor(i){
  const idx = i % ATTACHMENT_COLORS.length;
  return ATTACHMENT_COLORS[idx];
}

function splitGamesByDate(games){
  return games.reduce(function(acc, game){
    const key = game["game_date"].toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
    if(!acc[key]){
      acc[key] = [];
    }
    acc[key].push(game);
    return acc;
  }, {});
}

function createAttachments(games){
  const splited_games = splitGamesByDate(games);
  const keys = Object.keys(splited_games).sort();
  return keys.map(function(key, idx){
    const target_games = splited_games[key];
    return createAttachment(idx, key, target_games);
  });
}

function createAttachment(idx, date, games){
  const color = getColor(idx);
  
  const attach_fields = games.map(function(game){
    return {
      "title": tier_name[game.tier] + ": " + game.id.toString(),
      "value": game.title,
      "short": false,
    };
  });
  
  const attachment = {
    "fallback": "本日のお品書き",
    "pretext": "",
    "color": color,
    "title": date + " より",
    "fields": attach_fields,
  };
  
  return attachment;
}