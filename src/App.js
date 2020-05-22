import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js";

function App() {
  const countryGraph = useRef();
  const worldGraph = useRef();
  const [data, setData] = useState([]);
  // const [custonizedData, setCustonizedData] = useState();
  useEffect(() => {
    fetch("https://covid-193.p.rapidapi.com/statistics", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": "91f512efcfmshf1c022d7c043b56p1d1c05jsn895bbae2a9f7",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(() => data.response);
        data.response.sort((a, b) => a.cases.total - b.cases.total);

        data.response = data.response.slice(-20, -1);
        let l = [];
        let c = [];
        let d = [];
        let t = [];

        // worldwhile
        let wd = data.response[data.response.length - 1].deaths.total;
        let wr = data.response[data.response.length - 1].cases.recovered;
        let wc = data.response[data.response.length - 1].cases.total;
        data.response.forEach((countryInfo) => {
          l.push(countryInfo.country);
          c.push(countryInfo.cases.total);
          d.push(countryInfo.deaths.total);
          t.push(countryInfo.cases.recovered);
        });
        new Chart(countryGraph.current, {
          type: "line",
          data: {
            labels: l,
            datasets: [
              {
                fill: 1,
                // showLine: true,
                label: "Total cases",
                data: c,
                backgroundColor: "rgba(255, 0, 0, 0.5)",
                borderColor: "rgba(255, 0, 0, 1)",
                borderWidth: 1,
              },
              {
                fill: 2,
                // showLine: true,
                label: "Recovered",
                data: t,
                backgroundColor: "rgba(0, 255, 0, 0.5)",
                borderColor: "rgba(0, 255, 0, 1)",
                borderWidth: 1,
              },
              {
                fill: true,
                // showLine: true,
                label: "Dead",
                data: d,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                borderColor: "rgba(0, 0, 0, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          },
        });

        new Chart(worldGraph.current, {
          type: "bar",
          data: {
            labels: ["Total cases", "Recovered", "Dead"],
            datasets: [
              {
                fill: false,
                label: "World Info",
                data: [wc, wr, wd],
                backgroundColor: [
                  "rgba(255, 0, 0, 0.5)",
                  "rgba(0, 255, 0, 0.5)",
                  "rgba(0, 0, 0, 0.5)",
                ],
                borderColor: [
                  "rgba(255, 0, 0, 1)",
                  "rgba(0, 255, 0, 1)",
                  "rgba(0, 0, 0, 1)",
                ],
                borderWidth: 2,
              },
            ],
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <canvas
        style={{ width: "100%", height: "90vh", display: "block" }}
        ref={countryGraph}
      ></canvas>
      <div style={{ margin: "20px 0" }}>
        <hr></hr>
      </div>
      <canvas
        style={{ width: "100%", height: "60vh", display: "block" }}
        ref={worldGraph}
      ></canvas>

      <table style={{ width: "100vw" }}>
        <caption>
          <h2> COVID 19 DATA TABLE</h2>
        </caption>
        <thead style={{ height: "40px" }}>
          <tr>
            <th>Country</th>
            <th>Total Cases</th>
            <th>Recovered</th>
            <th>Deaths</th>
            <th>Updated time</th>
          </tr>
        </thead>
        {data &&
          data.map((c) => (
            <tbody key={c.country}>
              <tr style={{ textAlign: "center" }}>
                <td>{c.country}</td>
                <td>{c.cases.total}</td>
                <td
                  style={{
                    color: "green",
                  }}
                >
                  {c.cases.recovered}
                </td>
                <td
                  style={{
                    color: "red",
                  }}
                >
                  {c.deaths.total}
                </td>
                <td>{new Date(c.time).toLocaleDateString()}</td>
              </tr>
            </tbody>
          ))}
      </table>
    </div>
  );
}

export default App;
