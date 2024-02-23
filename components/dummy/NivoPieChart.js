"use client";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "@mui/material";

import CardTitleIcon from "../ui/CardTitleIcon";
import { ResponsivePie } from "@nivo/pie";
import { pieChartData } from "./data";
import { useRouter } from "next/navigation";

export default function NivoPieChart() {
  const router = useRouter();
  return (
    <Card>
      <CardHeader
        title="Earning Trends"
        subheader="Total earning trend in the past day"
        avatar={<CardTitleIcon icon="icon-[solar--money-bag-line-duotone]" />}
      />
      <CardContent className="h-[20rem]">
        <ResponsivePie
          animate
          motionConfig="wobbly"
          data={pieChartData}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          //   fill={[
          //     { match: { id: "ruby" }, id: "dots" },
          //     { match: { id: "c" }, id: "dots" },
          //     { match: { id: "go" }, id: "dots" },
          //     { match: { id: "python" }, id: "dots" },
          //     { match: { id: "scala" }, id: "lines" },
          //     { match: { id: "lisp" }, id: "lines" },
          //     { match: { id: "elixir" }, id: "lines" },
          //     { match: { id: "javascript" }, id: "lines" },
          //   ]}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: "#999",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                  },
                },
              ],
            },
          ]}
        />
      </CardContent>
      <CardActions>
        <Button
          onClick={() => router.push("/reports")}
          className="group"
          endIcon={
            <span className="icon-[solar--arrow-right-line-duotone] group-hover:translate-x-2 ease-in-out transition-all duration-200" />
          }
        >
          See all reports
        </Button>
      </CardActions>
    </Card>
  );
}
