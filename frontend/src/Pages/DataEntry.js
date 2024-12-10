import React from "react";
import "../Styles/dataentry.css";
import { useState } from "react";
import FormContainer from "../Components/form/FormContainer";
import TextInput from "../Components/form/inputs/TextInput";
import SingleOptionInput from "../Components/form/inputs/SingleOptionInput";
import MultiOptionInput from "../Components/form/inputs/MultiOptionInput";
import DataOptionPanel from "../Components/Panel/DataEntryPanels/DataOptionPanel";
import DepartmentPanel from "../Components/Panel/DataEntryPanels/DepartmentPanel";
import TrainingPanel from "../Components/Panel/DataEntryPanels/TrainingPanel";
import EmployeePanel from "../Components/Panel/DataEntryPanels/EmployeePanel";
import DesignationPanel from "../Components/Panel/DataEntryPanels/DesignationPanel";
import TrainerPanel from "../Components/Panel/DataEntryPanels/TrainerPanel";
import SchedulePanel from "../Components/Panel/DataEntryPanels/SchedulePanel";
import NominationPanel from "../Components/Panel/DataEntryPanels/NominationPanel";
import AttendancePanel from "../Components/Panel/DataEntryPanels/AttendancePanel";

const DataEntry = (props) => {
  const [tableId, setTableId] = useState(0);
  const TableType = (props) => {
    return (
      <div
        className="choose-table-btn"
        onClick={() => setTableId(props.tableid)}
      >
        {props.name}
      </div>
    );
  };

  let tableList = [
    "Department",
    "Training",
    "Employee",
    "Desgination",
    "Trainer",
    "Schedule",
    "Nominate Training",
    "Attendence",
  ];

  return (
    <div className="maincont">
      <div className="leftcont">
        <ul>
          {tableList.map((value, index) => {
            const i = index;
            return (
              <li className="li" style={{ width: "100%" }} id="li1">
                <TableType tableid={i} name={value}></TableType>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="rightcont">
        {tableId == 0 && (
          <DepartmentPanel
            data={props.data}
            dataHandler={props.dataHandler}
          ></DepartmentPanel>
        )}
        {tableId == 1 && (
          <TrainingPanel
            data={props.data}
            dataHandler={props.dataHandler}
          ></TrainingPanel>
        )}
        {tableId == 2 && (
          <EmployeePanel
            data={props.data}
            dataHandler={props.dataHandler}
          ></EmployeePanel>
        )}
        {tableId == 3 && (
          <DesignationPanel
            data={props.data}
            dataHandler={props.dataHandler}
          ></DesignationPanel>
        )}
        {tableId == 4 && (
          <TrainerPanel
            data={props.data}
            dataHandler={props.dataHandler}
          ></TrainerPanel>
        )}
        {tableId == 5 && (
          <SchedulePanel
            data={props.data}
            dataHandler={props.dataHandler}
          ></SchedulePanel>
        )}
        {tableId == 6 && (
          <NominationPanel
            data={props.data}
            dataHandler={props.dataHandler}
          ></NominationPanel>
        )}
        {tableId == 7 && (
          <AttendancePanel
            data={props.data}
            dataHandler={props.dataHandler}
          ></AttendancePanel>
        )}
      </div>
    </div>
  );
};
export default DataEntry;
