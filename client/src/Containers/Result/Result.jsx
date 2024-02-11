import React, { useEffect } from "react";
import "./Result.css";
import { Link } from "react-router-dom";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import ResultTable from "../../Components/ResultTable";
import { useDispatch, useSelector } from "react-redux";
import {
  attempts_Number,
  earnScore_Number,
  flagResult,
  postServerData,
} from "../../utils";

/** import actions  */
import { resetAllAction } from "../../Redux/Reducers/questionReducer";
import { resetResultAction } from "../../Redux/Reducers/resultReducer";
import { userSelector } from "../../Redux/Reducers/userReducer";
import {
  getLicense,
  issueLicense,
  licenseReducer,
  licenseSelector,
  viewLicense,
} from "../../Redux/Reducers/licenseReducer";

export default function Result() {
  const dispatch = useDispatch();
  const { fileName } = useSelector(licenseSelector);
  const { user, token } = useSelector(userSelector);
  const {
    questionReducer: { queue, answers },
    resultReducer: { result, userId },
  } = useSelector((state) => state);

  const totalPoints = queue.length * 10;
  const attempts = attempts_Number(result);
  const earnPoints = earnScore_Number(result, answers, 10);
  const flag = flagResult(totalPoints, earnPoints);

  useEffect(() => {
    if (flag) {
      dispatch(issueLicense({ userId: user._id, token }));
    }
    // console.log(flag);
  }, [dispatch]);

  /** store user result */
  useEffect(() => {
    const resultData = {
      result,
      username: user.name,
      attempts,
      score: earnPoints,
      achieved: flag ? "Passed" : "Failed",
    };
    const userId = user._id;
    const publishResult = async () => {
      try {
        await postServerData(
          `http://localhost:8080/test/result/${userId}`,
          token,
          resultData,
          (data) => data
        );
      } catch (error) {
        console.log(error);
      }
    };
    publishResult();
  }, []);

  function onRestart() {
    dispatch(resetAllAction());
    dispatch(resetResultAction());
  }

  return (
    <div className="container">
      <h1 className="title text-light">Quiz Application</h1>

      <div className="result flex-center">
        <div className="flex">
          <span>Username : </span>
          <span className="bold">{user.name || ""}</span>
        </div>
        <div className="flex">
          <span>Total Quiz Points : </span>
          <span className="bold">{totalPoints || 0}</span>
        </div>
        <div className="flex">
          <span>Total Questions : </span>
          <span className="bold">{queue.length || 0}</span>
        </div>
        <div className="flex">
          <span>Total Attempts : </span>
          <span className="bold">{attempts || 0}</span>
        </div>
        <div className="flex">
          <span>Total Earn Points : </span>
          <span className="bold">{earnPoints || 0}</span>
        </div>
        <div className="flex">
          <span>Quiz Result</span>
          <span
            style={{ color: `${flag ? "#2aff95" : "#ff2a66"}` }}
            className="bold"
          >
            {flag ? "Passed" : "Failed"}
          </span>
        </div>
      </div>

      <div className="start">
        <Link className="btn" to={"/"} onClick={onRestart}>
          Restart
        </Link>
        <Link
          className="btn"
          to={"/"}
          onClick={() => {
            dispatch(getLicense({ userId: user._id, token }));
          }}
        >
          Download License
        </Link>
        <Link to={`http://localhost:8080/${fileName}`} target="_blank">
          <PictureAsPdfIcon />
        </Link>
      </div>

      <div className="container">
        {/* result table */}
        <ResultTable></ResultTable>
      </div>
    </div>
  );
}
