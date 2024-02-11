import React, { useEffect, useState } from "react";
import { getServerData } from "../utils";
import { useSelector } from "react-redux";
import { userSelector } from "../Redux/Reducers/userReducer";

export default function ResultTable() {
  const { user, token } = useSelector(userSelector);
  const [data, setData] = useState([]);

  useEffect(() => {
    getServerData(
      `http://localhost:8080/test/result/${user._id}`,
      token,
      (res) => {
        console.log(res);
        setData(res);
      }
    );
  }, []);

  return (
    <div>
      <table>
        <thead className="table-header">
          <tr className="table-row">
            <td>Name</td>
            <td>Attempts</td>
            <td>Earn Points</td>
            <td>Result</td>
          </tr>
        </thead>
        <tbody>
          {data !== [] ?? <div>No Data Found </div>}
          {console.log(data)}
          {data.map((v, i) => (
            <tr className="table-body" key={i}>
              <td>{v?.username || ""}</td>
              <td>{v?.attempts || 0}</td>
              <td>{v?.score || 0}</td>
              <td>{v?.achieved || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
