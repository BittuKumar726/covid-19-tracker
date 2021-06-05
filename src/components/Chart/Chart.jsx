import React, { useEffect, useState } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

const Chart = (props) => {
  const { data, country }= props;
  const { confirmed, recovered, deaths } = data;
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dailyData = await fetchDailyData();
      setDailyData(dailyData);
    };
    fetchData();
  }, []);

  const lineChart =( dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null);


  const barChart = (
    confirmed?(
    <Bar 
      data={{
        labels: ['Infected', 'Confirmed', 'Deaths'],
        datasets: [{
          label: 'People',
          backgroundColor: ['rgba(0,0,255,0.5)','rgb(0, 255, 0, 0.5)','rgb(255, 0, 0,  0.5)'],
          data: [confirmed.value, recovered.value, deaths.value]
        }]
      }}
      options={{
        legend: {display: false,},
        title: {display: true, text: `Current state in ${country}`}
      }}
    />
    ) : null
  )

  return (
  <div className={styles.container}>{country ? barChart : lineChart}</div>);
};

export default Chart;
