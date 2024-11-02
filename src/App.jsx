import React from "react";
import StudentListContainer from "./containers/StudentListContainer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="container border rounded mt-5 p-5">
        <StudentListContainer />
      </div>
    </>
  );
}

export default App;
