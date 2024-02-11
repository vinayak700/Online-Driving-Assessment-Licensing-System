import axios from "axios";

export function attempts_Number(result) {
  return result.filter((r) => r !== undefined).length;
}

export function earnScore_Number(result, answers, point) {
  return result
    .map((element, i) => answers[i] === element)
    .filter((i) => i)
    .map((i) => point)
    .reduce((prev, curr) => prev + curr, 0);
}

export function flagResult(totalPoints, earnPoints) {
  return (totalPoints * 50) / 100 < earnPoints;
}

/** get server data */
export async function getServerData(url, authToken, callback) {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    const data = response.data;
    return callback ? callback(data) : data;
  } catch (error) {
    // Handle error
    console.error("Error fetching server data:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

/** post server data */
export async function postServerData(url, authToken, result, callback) {
  try {
    const response = await axios.post(url, result, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = response.data;
    return callback ? callback(data) : data;
  } catch (error) {
    console.error("Error posting server data:", error);
    throw error;
  }
}
