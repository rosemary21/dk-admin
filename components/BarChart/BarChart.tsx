"use client";
import { Bar, BarChart as Chart, XAxis, YAxis } from "recharts";

const data = [
  { name: "12 Jan", art: 32, fashion: 37 },
  { name: "13 Jan", art: 38, fashion: 61 },
  { name: "14 Jan", art: 45, fashion: 38 },
  { name: "15 Jan", art: 58, fashion: 47 },
  { name: "16 Jan", art: 82, fashion: 27 },
  { name: "17 Jan", art: 87, fashion: 77 },
  { name: "18 Jan", art: 92, fashion: 87 },
];
const BarChart = () => {
  return (
    <div>
      <Chart width={600} height={250} data={data}>
        <Bar dataKey="art" barSize={30} fill="#101828" />
        <Bar dataKey="fashion" barSize={30} fill="#71717A" />
        <XAxis dataKey="name" />
        <YAxis />
      </Chart>
    </div>
  );
};

export default BarChart;
