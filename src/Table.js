import React from "react";
import "./Table.css";
import numeral from "numeral";

function Table({ countries, selectedCountry }) {
  return (
    <div className="table">
      {countries?.map((country, idx) => {
        if (country.name === "") {
          return (
            <tr key={idx}>
              <td>{selectedCountry}</td>
              <td>
                <strong>{numeral(country.value).format("0,0")}</strong>
              </td>
            </tr>
          );
        } else {
          return (
            <tr key={idx}>
              <td>{country.name}</td>
              <td>
                <strong>{numeral(country.value).format("0,0")}</strong>
              </td>
            </tr>
          );
        }
      })}
    </div>
  );
}

export default Table;
