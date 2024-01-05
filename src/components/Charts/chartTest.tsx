import React from "react";
import Chart from "react-apexcharts";
import { title } from 'process';

const ChartTest = () => {
  const options = {
    
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: ['December', 'January', 'Feb', 1995, 1996, 1997, 1998],
    },
  };

  const series = [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ];

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart options={options} series={series} type="bar" width="500" title={'Title'} />
        </div>
      </div>
    </div>
  );
};

export default ChartTest;
