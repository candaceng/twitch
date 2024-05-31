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
    
    while (1) {
      var cur_date = new Date(data[i]['date']); 
      cur_date.setHours(cur_date.getHours() - 7); 
      
      if (date.getDate() != cur_date.getDate()) break;
      
      var mmr_change = data[i]['last_mmr_change']; 
      rr += mmr_change; 
      
      if (mmr_change > 5) {
        wins++;
      } else if (mmr_change < 0) {
        losses++;
      } else {
        draws++;
      } 
      
      i++;
    } 
    
    draws = draws==1? '1 draw':`${draws} draws`; 
    if (rr < 0) {
      s = 'Lost';
      rr = -rr;
    } else {
      s = 'Gained';
    }
    
    return `${wins}W, ${losses}L, ${draws} (${s} ${rr} RR today)`;
  } catch (e) {
    return 'something went wrong with the API oop';
  }

})
