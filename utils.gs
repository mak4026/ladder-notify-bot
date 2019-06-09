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