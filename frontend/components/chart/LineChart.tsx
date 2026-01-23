"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ChartData = {
  name: string;
  value: number;
};

type props = {
  data: ChartData[];
};

export default function LineChartComponent({ data }: props) {
  return (
    <div className="w-full h-83">
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis width={30} />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#000b58" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
