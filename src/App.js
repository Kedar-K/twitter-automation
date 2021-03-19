import Tweet from "./tweet";
import "./App.css";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.API_KEY);

function App() {
  return (
    <div className="App">
      <Tweet />
    </div>
  );
}

export default App;
