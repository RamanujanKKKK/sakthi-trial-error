import { useState } from "react";
import FormContainer from "../../form/FormContainer";
import SingleOptionInput from "../../form/inputs/SingleOptionInput";
import TextInput from "../../form/inputs/TextInput";
import DataOptionPanel from "./DataOptionPanel";

const SchedulePanel = (props) => {
  let [currentEdit, setCurrentEdit] = useState(props.data.schedule[0]);

  let [currentTraining, setCurrentTraining] = useState(
    props.data.schedule.length != 0
      ? props.data.training.filter(
          (ele) => ele.id == props.data.schedule[0].name_id
        )[0]
      : props.data.training[0]
  );
  let scheduleMap = [];
  if (props.data.schedule.length != 0) {
    if (!currentEdit) {
      setCurrentEdit(props.data.schedule[0]);
    }
    if (!currentTraining) {
      setCurrentTraining(
        props.data.training.filter((ele) => ele.id == currentEdit.name_id)[0]
      );
    }
    if (!("name" in currentEdit)) {
      let k = JSON.parse(JSON.stringify(currentEdit));
      k["name"] = k["tp_code"];
      setCurrentEdit(k);
    }
    console.log(props.data.schedule);
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
      console.log(currentTraining);
      console.log(
        scheduleMap.filter((ele) => {
          return ele.name_id == currentTraining.id;
        })
      );
    }
  }
  function addDaysToDate(dateStr, days) {
    let date2 = new Date(
      new Date(dateStr).getTime() + days * 24 * 60 * 60 * 1000
    );
    return date2.toISOString().split("T")[0];
  }
  return (
    <DataOptionPanel dataLabel="Schedule">
      <FormContainer
        dataHandler={props.dataHandler}
        action="addSchedule"
        key={Math.floor(Math.random() * 10000)}
      >
        <TextInput label="Schedule Code" name="tp_code"></TextInput>
        <SingleOptionInput
          label="Training Type"
          name="name_id"
          value={currentTraining.id}
          options={props.data.training}
        ></SingleOptionInput>
        <TextInput type="number" label="Duration" name="duration"></TextInput>
        <TextInput type="date" label="Start Date" name="from_date"></TextInput>
        <TextInput label="Training Ground" name="training_area"></TextInput>
        <SingleOptionInput
          label="Trainer"
          name="trainer_id"
          options={props.data.trainer}
          value={props.data.trainer[0].id}
        ></SingleOptionInput>
      </FormContainer>
      {props.data.schedule.length != 0 ? (
        <FormContainer
          dataHandler={props.dataHandler}
          action="editSchedule"
          key={Math.floor(Math.random() * 10000)}
          additionalData={[{ name: "id", value: currentEdit.id }]}
        >
          <SingleOptionInput
            label="Training Type"
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
            label="Duration"
            value={currentEdit.duration}
            name="duration"
          ></TextInput>
          <TextInput
            type="date"
            label="Start Date"
            value={new Date(currentEdit.from_date).toISOString().split("T")[0]}
            name="from_date"
          ></TextInput>
          <TextInput
            label="Training Ground"
            value={currentEdit.training_area}
            name="training_area"
          ></TextInput>
          <SingleOptionInput
            label="Trainer"
            name="trainer_id"
            value={currentEdit.trainer_id}
            selected={currentEdit.trainer_id}
            options={props.data.trainer}
          ></SingleOptionInput>
        </FormContainer>
      ) : (
        <h1>no data present</h1>
      )}
      {props.data.schedule.length != 0 ? (
        <FormContainer
          dataHandler={props.dataHandler}
          action="delSchedule"
          key={Math.floor(Math.random() * 10000)}
          additionalData={[{ name: "id", value: currentEdit.id }]}
        >
          <SingleOptionInput
            label="Training Type"
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
        </FormContainer>
      ) : (
        <h1>no data present</h1>
      )}
    </DataOptionPanel>
  );
};
export default SchedulePanel;
