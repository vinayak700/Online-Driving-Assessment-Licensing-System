import { postServerData } from "../utils";
import * as Action from "../Redux/Reducers/resultReducer";

export const PushAnswer = (result) => async (dispatch) => {
  try {
    await dispatch(Action.pushResultAction(result));
  } catch (error) {
    console.log(error);
  }
};
export const updateResult = (index) => async (dispatch) => {
  try {
    dispatch(Action.updateResultAction(index));
  } catch (error) {
    console.log(error);
  }
};

/** insert user data */
export const usePublishResult = (resultData, token, userId) => {
  const { result, username } = resultData;
  (async () => {
    try {
      if (result.length > 0 && !username)
        throw new Error("Couldn't get Result");
      await postServerData(
        `http://localhost:8080/test/result/${userId}`,
        token,
        resultData,
        (data) => data
      );
    } catch (error) {
      console.log(error);
    }
  })();
};
