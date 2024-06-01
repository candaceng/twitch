((
  /** @type {string} */ streamStartDateString,
  /** @type {string} */ urlEncodedGetMmrHistoryResponseJson,
) => {

  const getMmrHistoryResponseJson = decodeURIComponent(urlEncodedGetMmrHistoryResponseJson);
  errorMsg = 'API is down, try again later';
  
  try {
    const response = JSON.parse(getMmrHistoryResponseJson);
    if (response['status'] != 200) return errorMsg;
    const data = response['data'];

    return `${data['currenttierpatched']} (${data['ranking_in_tier']} RR)`;
  } catch (e) {
    return errorMsg;
  }

})
