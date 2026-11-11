// What it does: Makes App, the top of your component tree, show your Standings component and load your CSS file.
// Why: Keeping App tiny makes it just the frame. If you add more later, like a header or a scores section, it slots in here next to Standings.


import "./App.css";
import Standings from "./Standings";

function App() {
  return <Standings />;
}

export default App;