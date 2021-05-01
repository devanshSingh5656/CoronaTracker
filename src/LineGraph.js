import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import {  useSelector } from "react-redux";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[date];
  }
  return chartData;
};

function LineGraph({ selectedCountry }) {
  const [data, setData] = useState([]);
  const [check, setcheck] = useState([]);
  const ArchiveLineData = useSelector((state) => state.LineData);

  useEffect(() => {
    for (var i = 0; i < ArchiveLineData.length; i++) {
      {
        ArchiveLineData[i]["Country/Region"] === selectedCountry &&
          setcheck(ArchiveLineData[i]);
      }
    }
  }, [selectedCountry]);

  useEffect(() => {
    let chartData = buildChartData(check);

    setData(chartData.slice(chartData.length - 31, -1));
  }, [selectedCountry]);

  return (
    <div>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                label: `Cases`,
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;
