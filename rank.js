((
  /** @type {string} */ streamUptimeString,
  /** @type {string} */ streamStartDateString,
  /** @type {string} */ urlEncodedGetMmrHistoryResponseJson,
  /** @type {string} */ playerName,
) => {

  const getMmrHistoryResponseJson = decodeURIComponent(urlEncodedGetMmrHistoryResponseJson);
  if (/^Error Connecting To Remote Server\b/i.test(getMmrHistoryResponseJson)) {
    return 'API is down, try again later';
  }

  try {
    const response = JSON.parse(getMmrHistoryResponseJson);
    const data = response['data'];

    let rank = `${data['currenttierpatched']} ${data['ranking_in_tier']} RR`;

    return `${playerName} is ${rank}`;
  } catch (e) {
    return 'something went wrong with the API oop';
  }
  
})
