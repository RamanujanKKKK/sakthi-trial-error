import { useState } from "react";
import React from "react";
import "../../../Styles/DataOption.css";

const DataOptionPanel = (props) => {
  const [panelType, setPanelType] = useState(0);
  const handlePanelChange = (e) => {
    setPanelType(e.target.value);
    // console.log(e.target.value);
  };
  return (
    <div className="data-option-panel">
      <div className="data-option-head-cont">
        <div className="data-option-panel-label">{props.dataLabel}</div>
        {!props.childCount && (
          <select
            name={props.name}
            className="select-panel"
            onChange={handlePanelChange}
            value={panelType}
          >
            <option value={0}>Add</option>
            <option value={1}>Edit</option>
            <option value={2}>Delete</option>
          </select>
        )}
      </div>
      {React.cloneElement(props.children[panelType], {
        key: Math.floor(Math.random() * 10000),
      })}
    </div>
  );
};
export default DataOptionPanel;
