((
  /** @type {string} */ streamStartDateString,
  /** @type {string} */ urlEncodedGetMmrHistoryResponseJson,
) => {

  const getMmrHistoryResponseJson = decodeURIComponent(urlEncodedGetMmrHistoryResponseJson);
  
  try {
    const response = JSON.parse(getMmrHistoryResponseJson);
    const data = response['data'];

    var i=wins=losses=rr=draws=0; 
    var date = new Date(); 
    var status = '';
    
    for (i=0; i<=20; i++) {
      var cur_date = new Date(data[i]['date']); 
      cur_date.setHours(cur_date.getHours() - 7); 
      
      if (date.getDate() != cur_date.getDate()) break;
      
      var mmr_change = data[i]['mmr_change_to_last_game']; 
      rr += mmr_change; 
      
      if (mmr_change > 5) {
        wins++;
      } else if (mmr_change < 0) {
        losses++;
      } else {
        draws++;
      } 
    } 
    
    draws = draws==1? '1 draw':`${draws} draws`; 
    if (rr < 0) {
      status = 'Lost';
      rr = -rr;
    } else {
      status = 'Gained';
    }
    
    return `${wins}W, ${losses}L, ${draws} (${status} ${rr} RR today)`;
  } catch (e) {
    return 'something went wrong with the API oop';
  }

})
