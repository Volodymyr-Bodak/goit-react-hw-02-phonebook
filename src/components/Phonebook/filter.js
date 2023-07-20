import React from "react";

const Filter = ({ filter, handleChangeFilter }) => {
  return (
    <label>
      Find contacts by name
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={handleChangeFilter}
      />
    </label>
  );
};

export default Filter;
