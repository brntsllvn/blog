import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ViableStartupCalculator from "./components/ViableStartupCalculator";
import Home from "./components/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/is-my-startup-viable-calculator"
          element={<ViableStartupCalculator />}
        />
      </Routes>
    </Router>
  );
};

export default App;
