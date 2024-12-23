import React, { useState, useEffect } from "react";
import "./challenges.css";

import queryString from "query-string";

const Challenges = ({ location }) => {
  const { code } = queryString.parse(location.search);
  const [challengesData, setChallengesData] = useState("none");

  useEffect(() => {
    fetch(`http://localhost:3000/challenges?code=${code}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    })
    .then(res => res.json())
    .then(res => setChallengesData(JSON.stringify(res)))
  }, [code]);

  return (
    <div className="Challenges-body">
      <h3>Challenges</h3>
      <h5 className="Content">{challengesData}</h5>
    </div>
  );
};

export default Challenges;