import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Legend,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const PieChartComponent = (props) => {
  const clone = (data) => {
    return JSON.parse(JSON.stringify(data));
  };
  let data = clone(props.data);
  let colors = [
    "#2C3E50", // Dark Blue-Gray
    "#2980B9", // Bright Blue
    "#8E44AD", // Purple
    "#16A085", // Teal
    "#27AE60", // Green
    "#F39C12", // Orange
    "#D35400", // Dark Orange
    "#C0392B", // Red
    "#7F8C8D", // Gray
    "#34495E", // Dark Gray-Blue
    "#1F3A93", // Midnight Blue
    "#22313F", // Steel Blue
    "#96281B", // Dark Red
    "#1C2833", // Charcoal
    "#6C3483", // Dark Purple
  ];
  let co = 0;
  for (let da in data) {
    //data[da]["color"] = colors[co];
    co = (co + 1) % colors.length;
  }

  let valdesc = props.desc;
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.1;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <>
        {percent != 0 ? (
          <text
            x={x}
            y={y}
            fill="grey"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
          >
            {`${(percent * 100).toFixed(0)}%`}
          </text>
        ) : (
          <></>
        )}
      </>
    );
  };
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p
            className="label"
            style={{ color: "black", padding: "10px" }}
          >{`${payload[0].name} : ${payload[0].value} ${valdesc}`}</p>
        </div>
      );
    }

    return null;
  };

  const pieClick = (e) => {
    if (props.tablefunc) props.tablefunc(e.id);
  };
  return (
    <>
      <div style={{ width: "100%" }}>
        <div className="row d-flex justify-content-center text-center">
          <div className="col-md-8">
            <ResponsiveContainer
              width="100%"
              height={props.height}
              className="text-center"
            >
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={"80%"}
                  fill="#8884d8"
                  dataKey="value"
                  onClick={pieClick}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={data[index].fill} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />

                {/* <Legend  layout="horizontal" className="position-legend" verticalAlign="top" align="center" /> */}
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};
export default PieChartComponent;
