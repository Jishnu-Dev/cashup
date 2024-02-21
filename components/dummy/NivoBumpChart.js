"use client";

import { Card, CardContent, CardHeader } from "@mui/material";

import CardTitleIcon from "../ui/CardTitleIcon";
import { ResponsiveBump } from "@nivo/bump";
import { data } from "./data";

export default function NivoBumpChart() {
  return (
    <Card>
      <CardHeader
        title="Expense Trends"
        subheader="Total earning trend in the past day"
        avatar={<CardTitleIcon icon="icon-[solar--money-bag-line-duotone]" />}
      />
      <CardContent className="h-[20rem]">
        <ResponsiveBump
          data={data}
          colors={{ scheme: "set2" }}
          lineWidth={3}
          activeLineWidth={6}
          inactiveLineWidth={3}
          inactiveOpacity={0.15}
          pointSize={20}
          activePointSize={16}
          inactivePointSize={0}
          pointColor={{ theme: "background" }}
          pointBorderWidth={3}
          activePointBorderWidth={3}
          pointBorderColor={{ from: "serie.color" }}
          axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendPosition: "middle",
            legendOffset: -36,
          }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "ranking",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
          axisRight={null}
        />
      </CardContent>
    </Card>
  );
}
