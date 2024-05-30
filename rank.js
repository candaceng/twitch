((
  urlEncodedResponseJson,
  playerName,
) => {

  const responseJson = decodeURIComponent(urlEncodedResponseJson);
  if (/^Error Connecting To Remote Server\b/i.test(responseJson)) {
    return 'API is down, try again later';
  }

  try {
    const response = JSON.parse(responseJson);
    const data = response['data'];
    
    let rank = `${data['currenttierpatched']} ${data['ranking_in_tier']} RR`;

    return `${playerName} is ${rank}`;
  } catch (e) {
    return 'something went wrong with the API oop';
  }
})
