import { useState, useEffect } from "react";


// These two types are only a checklist of sorts. They dont create anything
// They are the description of the objects I will receive from the API
// Someone else makes the actual object (here, the MLB's API sends it)
// The type only lets typescript check: "does this object have the right fields?"
type TeamRecord = {
  team: { id: number; name: string };
  wins: number;
  losses: number;
  winningPercentage: string;
  gamesBack: string;
};

type DivisionRecord = {
  division: { id: number };
  teamRecords: TeamRecord[];
};

// A lookup object mapping ids to names like a dict in Python
// Needed because the standings response only includes each divisions id, and I need names for the headings
// MLB determines the IDs
const DIVISION_NAMES: { [id: number]: string } = {
  201: "AL East",
  202: "AL Central",
  200: "AL West",
  204: "NL East",
  205: "NL Central",
  203: "NL West",
};

type DivisionProps = {
  record: DivisionRecord;
};

// Division displays one division, which it recieves as a prop called "record"
function Division({ record }: DivisionProps) {
  return (
    <div>
      <h2>{DIVISION_NAMES[record.division.id]}</h2>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>W</th>
            <th>L</th>
            <th>PCT</th>
            <th>GB</th>
          </tr>
        </thead>
        <tbody>
          {record.teamRecords.map((teamRecord) => ( // builds one <tr> (table row) per team with .map (turns array of data into an array of rows), using each teams id as its key
            <tr key={teamRecord.team.id}> 
              <td>
                <img
                    src={`https://www.mlbstatic.com/team-logos/team-cap-on-dark/${teamRecord.team.id}.svg`} // builds the URL with a template literal
                    alt={teamRecord.team.name} // text that describes the image
                    className="team-logo" // className is a label for styling
                />
                {teamRecord.team.name}
             </td>
              <td>{teamRecord.wins}</td>
              <td>{teamRecord.losses}</td>
              <td>{teamRecord.winningPercentage}</td>
              <td>{teamRecord.gamesBack}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


// Fetches and owns the data in state
function Standings() {
  const [records, setRecords] = useState<DivisionRecord[]>([]);
  const [loading, setLoading] = useState(true);

  
  // useEffect with [] fetches onces when the page opens. 
  // "loading" decides whether you see "Loading standings..." or the tables
  // Why: fetching is a side effect, something other than drawing the page
  // The empty array [] means "run once, after the first draw"
  // Without it, the fetch would run after every redraw and since saving data
  // causes a redraw, it would loop forever. The loading state covers the gap
  // between "request sent" and "data arrived"
  useEffect(() => {
    fetch("/mlb/api/v1/standings?leagueId=103,104&season=2026")
      .then((response) => response.json())
      .then((data) => {
        setRecords(data.records);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading standings...</p>;
  }

  return (
    <div>
      <h1>MLB Standings 2026</h1>
      {records.map((record) => (
        <Division key={record.division.id} record={record} />
      ))}
    </div>
  );
}

export default Standings;