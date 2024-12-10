import React from "react";
import "../../Styles/Main.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from "recharts";

export default function DoubleBar(props) {
  let data = [];
  let valdesc = props.desc;
  props.data.map((dat) => {
    let k = JSON.parse(JSON.stringify(dat));
    console.log(k.nominated, k.attended);
    k.nominated = k.nominated - k.attended;
    data.push(k);
  });
  const CustomTooltip = ({ active, payload, label }) => {
    let k = data.filter((ele) => ele.name == label)[0];
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p
            className="label"
            style={{ color: "black", padding: "10px" }}
          >{`${label} : ${
            k.attended + " / " + (k.nominated + k.attended)
          } ${valdesc}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <BarChart width={props.width} height={props.height} data={data}>
      <CartesianGrid />
      <XAxis dataKey="name" tick={false}>
        <Label value="Trainings" position="bottom" />
      </XAxis>

      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Legend />

      <Bar dataKey="attended" stackId="a" fill="#82ca9d" />
      <Bar dataKey="nominated" stackId="a" fill="#8884d8" />
    </BarChart>
  );
}
