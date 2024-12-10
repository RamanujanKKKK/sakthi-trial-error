import { useState } from "react";
import FormContainer from "../../form/FormContainer";
import DataOptionPanel from "./DataOptionPanel";
import SingleOptionInput from "../../form/inputs/SingleOptionInput";
import MultiFieldSelect from "../../form/inputs/MultiFieldSelect";
import TextInput from "../../form/inputs/TextInput";

const AttendancePanel = (props) => {
  let [currentEdit, setCurrentEdit] = useState(props.data.schedule[0]);
  let [currentTraining, setCurrentTraining] = useState(
    props.data.training.filter(
      (ele) => ele.id == props.data.schedule[0].name_id
    )[0]
  );
  let scheduleMap = props.data.schedule.map((ele) => {
    let k = JSON.parse(JSON.stringify(ele));
    k["name"] = k["tp_code"];
    return k;
  });
  if (currentEdit.name_id != currentTraining.id) {
    let data = scheduleMap.filter((ele) => {
      return ele.name_id == currentTraining.id;
    });
    if (data.length == 0)
      setCurrentTraining(
        props.data.training.filter((ele) => ele.id == currentEdit.name_id)[0]
      );
    else setCurrentEdit(data[0]);
  }
  let option = [];
  props.data.nominationtable.forEach((ele) => {
    if (ele.training_id == currentEdit.id) {
      let data = JSON.parse(
        JSON.stringify(
          props.data.employees.filter((el) => el.id == ele.employee_id)[0]
        )
      );
      data["department_name"] = props.data.department.filter(
        (el) => data["department_id"] == el.id
      )[0].name;
      console.log(data);
      option.push(data);
    }
  });
  return (
    <DataOptionPanel dataLabel="Training Nomination" childCount={1}>
      <FormContainer
        dataHandler={props.dataHandler}
        action="addAttendance"
        key={Math.floor(Math.random() * 10000)}
        additionalData={[{ name: "id", value: currentEdit.id }]}
      >
        <SingleOptionInput
          label="Training"
          name="name_id"
          options={props.data.training}
          editChange={setCurrentTraining}
          value={currentTraining.id}
          selected={currentTraining.id}
        ></SingleOptionInput>
        <SingleOptionInput
          label="Training Code"
          name="tp_code"
          options={scheduleMap.filter((ele) => {
            return ele.name_id == currentTraining.id;
          })}
          selected={currentEdit.id}
          value={currentEdit.id}
          editChange={setCurrentEdit}
        ></SingleOptionInput>
        <TextInput
          type="number"
          label="No of days attended"
          value={0}
          name="attended_days"
        ></TextInput>
        <MultiFieldSelect name="name_id" options={option}></MultiFieldSelect>
      </FormContainer>
      <div></div>
    </DataOptionPanel>
  );
};
export default AttendancePanel;
