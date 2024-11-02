import React from "react";

const Searchbar = ({ onInputChange, onSearch, onAddStudent }) => {
  return (
    <div className="d-flex flex-end w-100 justify-content-between my-5">
      <button onClick={onAddStudent} className="btn btn-primary btn-sm">
        Add Student
      </button>
      <div className="input-group w-50">
        <input
          type="text"
          className="form-control"
          id="search"
          name="search"
          onChange={onInputChange}
        />
        <button className="btn btn-primary" onClick={onSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
