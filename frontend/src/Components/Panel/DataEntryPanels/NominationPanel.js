import { useState } from "react";
import FormContainer from "../../form/FormContainer";
import DataOptionPanel from "./DataOptionPanel";
import SingleOptionInput from "../../form/inputs/SingleOptionInput";
import MultiFieldSelect from "../../form/inputs/MultiFieldSelect";
import TextInputHint from "../../form/inputs/TextInputHint";

const NominationPanel = (props) => {
  let [employeeHint, setEmployeeHint] = useState("");
  let [currentEdit, setCurrentEdit] = useState(props.data.schedule[0]);
  let [currentTraining, setCurrentTraining] = useState(
    props.data.schedule.length == 0
      ? 0
      : props.data.training.filter(
          (ele) => ele.id == props.data.schedule[0].name_id
        )[0]
  );
  let scheduleMap = [];
  let value = [];
  let option = [];
  if (props.data.schedule.length != 0) {
    scheduleMap = props.data.schedule.map((ele) => {
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
    option = [];
    if (props.data.links[currentTraining.id]) {
      props.data.links[currentTraining.id].map((ele) => {
        if (props.data.employeebyDept[ele])
          option = [...option, ...props.data.employeebyDept[ele]];
      });
    }
    value = [];
    props.data.nominationtable.forEach((ele) => {
      // console.log(ele.training_id, currentEdit);
      if (ele.training_id == currentEdit.id) value.push(ele.employee_id);
    });
  }
  option = option.filter((ele)=>{  
    return ele.name.toLowerCase().indexOf(employeeHint.toLowerCase()) !==
    -1
  }
)
  return (
    <DataOptionPanel dataLabel="Training Nomination" childCount={1}>
      {props.data.schedule.length != 0 ? (
        <FormContainer
          dataHandler={props.dataHandler}
          action="addNomination"
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
          <TextInputHint
            label="Employee Name (Hint)"
            setHint={setEmployeeHint}
            value={employeeHint}
          ></TextInputHint>
          <MultiFieldSelect
            name="name_id"
            options={option}
            value={value}
          ></MultiFieldSelect>
        </FormContainer>
      ) : (
        <h2>No Schedule Present to Nominate</h2>
      )}
      <div></div>
    </DataOptionPanel>
  );
};
export default NominationPanel;
