var ATTACHMENT_COLORS = ["#61bb46","#fdb827", "#f5821f", "#e03a3e", "#963d97", "#009ddc"];

function flatten(arrayOfArrays){
  return [].concat.apply([], arrayOfArrays);
}

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
  const a_id = a.match(regexp)[2];
  const b_id = b.match(regexp)[2];
  return a_id - b_id;
}

function getColor(i){
  const idx = i % ATTACHMENT_COLORS.length;
  return ATTACHMENT_COLORS[idx];
}

function splitGamesByDate(games){
  return games.reduce(function(acc, game){
    const key = game["game_date"].toLocaleString('Asia/Tokyo');
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
      "title": game.id.toString(),
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

function getCurrentSeasonMasterSheetId(master_sheet){
  const currentSeason = master_sheet.getSheetByName('Current Season/Round').getRange('C2').getValue();
  const arr = master_sheet.getSheetByName('MasterSheetID').getDataRange().getValues();
  const target_row = arr.filter(function(row){ return row[0] === currentSeason });
  return target_row[0][1];
}