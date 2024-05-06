const fetchData = async (limit=10, offset=0) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      limit: limit,
      offset: offset,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    const response = await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    ).then((response) => response.json())
    return response;
  } catch(error) {
    console.error(error)
  }
}
export {fetchData};