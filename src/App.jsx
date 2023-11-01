import { BrowserRouter, Routes, Route } from "react-router-dom";
import JobList from "./../src/pages/JobList";
import AddJob from "./../src/pages/AddJob";
import Header from "./components/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/add-job" element={<AddJob />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
