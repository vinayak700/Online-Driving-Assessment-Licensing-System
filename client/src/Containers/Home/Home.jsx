import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserId } from "../../Redux/Reducers/resultReducer";
import { userSelector } from "../../Redux/Reducers/userReducer";

export default function Main() {
  const { user } = useSelector(userSelector);
  const dispatch = useDispatch();

  function startQuiz() {
    if (user) {
      dispatch(setUserId(user));
    }
  }

  return (
    <div className="container">
      <h1 className="title text-light">Online Driving Assessment Test</h1>

      <ol>
        <li>You will be asked 15 questions one after another.</li>
        <li>10 points is awarded for each correct answer.</li>
        <li>
          Each question has three options. You can choose only one options.
        </li>
        <li>You can review and change answers before the test finish.</li>
        <li>The result will be declared at the end of the quiz.</li>
        <li>
          You can later download the license upon successfully passing the Test.
        </li>
      </ol>

      <div className="start">
        <Link className="btn" to={"/assessment"} onClick={startQuiz}>
          Start Quiz
        </Link>
      </div>
    </div>
  );
}
