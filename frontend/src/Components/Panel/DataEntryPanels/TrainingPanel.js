import { useState } from "react";
import FormContainer from "../../form/FormContainer";
import MultiOptionInput from "../../form/inputs/MultiOptionInput";
import SingleOptionInput from "../../form/inputs/SingleOptionInput";
import TextInput from "../../form/inputs/TextInput";
import DataOptionPanel from "./DataOptionPanel";

const TrainingPanel = (props) => {
  let [currentEdit, setCurrentEdit] = useState(props.data.training[0]);
  console.log(props.data.links, currentEdit);
  return (
    <DataOptionPanel dataLabel="Training">
      <FormContainer
        dataHandler={props.dataHandler}
        action="addTraining"
        key={Math.floor(Math.random() * 10000)}
      >
        <TextInput label="Training Name" name="name"></TextInput>
        <TextInput label="Training Description" name="description"></TextInput>
        <MultiOptionInput
          label="Departments"
          name="depts"
          options={props.data.department.map((ele) => {
            let dt = {
              id: ele.id,
              name: ele.name,
            };
            return dt;
          })}
        ></MultiOptionInput>
      </FormContainer>
      <FormContainer
        dataHandler={props.dataHandler}
        action="editTraining"
        key={Math.floor(Math.random() * 10000)}
        additionalData={[{ name: "id", value: currentEdit.id }]}
      >
        <SingleOptionInput
          label="Training"
          name="training"
          options={props.data.training}
          selected={currentEdit.id}
          editChange={setCurrentEdit}
        ></SingleOptionInput>
        <TextInput
          label="Training Name"
          value={currentEdit.name}
          name="name"
        ></TextInput>
        <TextInput
          label="Training Description"
          value={currentEdit.description}
          name="description"
        ></TextInput>
        <MultiOptionInput
          label="Departments"
          name="depts"
          options={props.data.department.map((ele) => {
            let dt = {
              id: ele.id,
              name: ele.name,
            };
            return dt;
          })}
          value={props.data.links[currentEdit.id]}
        ></MultiOptionInput>
      </FormContainer>
      <FormContainer
        dataHandler={props.dataHandler}
        action="delTraining"
        key={Math.floor(Math.random() * 10000)}
        additionalData={[{ name: "id", value: currentEdit.id }]}
        checkLen={props.data.training.length}
      >
        <SingleOptionInput
          label="Training"
          name="training"
          options={props.data.training}
          selected={currentEdit.id}
          editChange={setCurrentEdit}
        ></SingleOptionInput>
        <div></div>
      </FormContainer>
    </DataOptionPanel>
  );
};
export default TrainingPanel;
