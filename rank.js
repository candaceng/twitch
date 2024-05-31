((
  /** @type {string} */ urlEncodedGetMmrHistoryResponseJson,
) => {

  const getMmrHistoryResponseJson = decodeURIComponent(urlEncodedGetMmrHistoryResponseJson);
  if (/^Error Connecting To Remote Server\b/i.test(getMmrHistoryResponseJson)) {
    return 'API is down, try again later';
  }

  try {
    const response = JSON.parse(getMmrHistoryResponseJson);
    const data = response['data'];
    
    return `${data['currenttierpatched']} (${data['ranking_in_tier']} RR)`;
  } catch (e) {
    return 'something went wrong with the API oop';
  }
  
})
