import React from "react";

const Searchbar = ({
  onInputChange,
  onSearch,
  onReset,
  onAddStudent,
  query,
}) => {
  return (
    <div className="d-flex flex-end w-100 justify-content-between mb-5 mt-3">
      <button onClick={onAddStudent} className="btn btn-primary btn-sm">
        Add Student
      </button>
      <div className="d-flex gap-2 w-50">
        <input
          type="text"
          className="form-control"
          id="search"
          name="search"
          value={query}
          onChange={onInputChange}
        />
        <button className="btn btn-primary" onClick={onSearch}>
          Search
        </button>

        <button
          type="reset"
          className="btn btn-outline-primary"
          onClick={onReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
