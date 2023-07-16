import React from "react";

export const Result = (props) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>index</th>
            <th>Candidate</th>
            <th>Number of votes</th>
          </tr>
        </thead>
        <tbody>
          {props.Candidates.map((candidate, ind) => {
            return (
              <tr key={ind}>
                <td>{ind}</td>
                <td>{candidate.Name}</td>
                <td>{candidate.VoteCount}</td> 
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
