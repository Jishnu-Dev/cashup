"use client";

/* USING APEX CHARTS */

import { Card, CardContent, CardHeader } from "@mui/material";

import CardTitleIcon from "../ui/CardTitleIcon";
import Chart from "react-apexcharts";

const chartData = {
  options: {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
  },
  series: [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ],
};

export default function BarChart() {
  return (
    <Card>
      <CardHeader
        title="Cashback Trends"
        subheader="Total cashback trend in the past day"
        avatar={
          <CardTitleIcon icon="icon-[solar--chat-round-money-line-duotone]" />
        }
      />
      <CardContent>
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
        />
      </CardContent>
    </Card>
  );
}
