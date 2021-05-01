import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import "./App.css";
import Archivedata from "./coronadetails.json";
import React, { useState, useEffect } from "react";
import InfoBox from "./InfoBox";
import numeral from "numeral";
import { sortData } from "./util";
import Table from "./Table";
import LineGraph from "./LineGraph";
import FinalData from "./LineGraphData.json";

import { useDispatch, useSelector } from "react-redux";
import Charttest from "./Charttest";

function App() {
  const [CountryDropDown, setCountryDropDown] = useState([]);
  const [selectedCountry, setselectedCountry] = useState("India");
  const [MainCountryData, setMainCountry] = useState();
  const [casesType, setCasesType] = useState("cases");
  const [states, setstates] = useState();

  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();
  dispatch({ type: "LineData", item: FinalData });

  const handelCountry = (e) => {
    setselectedCountry(e.target.value);
  };

  dispatch({ type: "ADD", item: Archivedata });

  useEffect(() => {
    let Datafind = [
      ...new Map(
        data.map((item) => {
          return [item.Country_Region, item];
        })
      ).values(),
    ];
    setCountryDropDown(Datafind.map((res) => res.Country_Region));
  }, []);

  useEffect(() => {
    var toDeaths = 0;
    var totconfirm = 0;
    var toRecovered = 0;
    var filterdata = data.filter(
      (res) => res.Country_Region === selectedCountry
    );
    filterdata.map((res) => {
      totconfirm = res.Confirmed + totconfirm;
      toRecovered = res.Recovered + toRecovered;
      toDeaths = res.Deaths + toDeaths;
    });
    var sta = filterdata.map((res) => ({
      name: res.Province_State,
      value: res.Confirmed,
    }));
    var sorted = sortData(sta);
    setstates(sorted);
    setMainCountry({ totconfirm, toRecovered, toDeaths });
  }, [selectedCountry]);
  console.log(casesType)

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 Tracker</h1>
          <FormControl className={`${casesType}`} >
            <Select
              variant="outlined"
              value={selectedCountry}
              onChange={handelCountry}
            >
              {CountryDropDown.map((res, idx) => (
                <MenuItem key={idx} value={res}>
                  {res}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            isRed
            active={casesType === "cases"}
            cases={numeral(MainCountryData?.totconfirm).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            cases={numeral(MainCountryData?.toRecovered).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={numeral(MainCountryData?.toDeaths).format("0.0a")}
          />
        </div>
        <Charttest
          casesType={casesType}
          selectedCountry={selectedCountry}
          MainCountryData={MainCountryData}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Live Cases by Country</h3>
            <Table countries={states} selectedCountry={selectedCountry} />

            <h3>Worldwide new {casesType}</h3>
            <LineGraph selectedCountry={selectedCountry} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
