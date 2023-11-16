"use client";

import { Bar, BarChart } from "recharts";

const data = [
  { name: "12 Jan", art: 32, fashion: 37 },
  { name: "13 Jan", art: 38, fashion: 61 },
  { name: "14 Jan", art: 45, fashion: 38 },
  { name: "15 Jan", art: 58, fashion: 47 },
];

export default function GrowthBarChart() {
  return (
    <div>
      <BarChart width={220} height={100} data={data}>
        <Bar dataKey="art" barSize={15} fill="#101828" />
        <Bar dataKey="fashion" barSize={15} fill="#71717A" />
      </BarChart>
    </div>
  );
}
