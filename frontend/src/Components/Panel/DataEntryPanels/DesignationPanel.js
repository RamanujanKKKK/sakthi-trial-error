import { useState } from "react";
import FormContainer from "../../form/FormContainer";
import SingleOptionInput from "../../form/inputs/SingleOptionInput";
import TextInput from "../../form/inputs/TextInput";
import DataOptionPanel from "./DataOptionPanel";

const DesignationPanel = (props) => {
  let [currentEdit, setCurrentEdit] = useState(props.data.designation[0]);
  return (
    <DataOptionPanel dataLabel="Designation">
      <FormContainer
        dataHandler={props.dataHandler}
        action="addDsgn"
        key={Math.floor(Math.random() * 10000)}
      >
        <TextInput label="Designation Name" name="name"></TextInput>
        <div></div>
      </FormContainer>
      <FormContainer
        dataHandler={props.dataHandler}
        action="editDsgn"
        key={Math.floor(Math.random() * 10000)}
        additionalData={[{ name: "id", value: currentEdit.id }]}
      >
        <SingleOptionInput
          label="Designation"
          name="dsgn"
          options={props.data.designation}
          selected={currentEdit.id}
          editChange={setCurrentEdit}
        ></SingleOptionInput>
        <TextInput
          label="New Designation name"
          value={currentEdit.name}
          name="name"
        ></TextInput>
      </FormContainer>
      <FormContainer
        dataHandler={props.dataHandler}
        action="delDsgn"
        key={Math.floor(Math.random() * 10000)}
        additionalData={[{ name: "id", value: currentEdit.id }]}
        checkLen={props.data.designation.length}
      >
        <SingleOptionInput
          label="Designation"
          name="dsgn"
          options={props.data.designation}
          selected={currentEdit.id}
          editChange={setCurrentEdit}
        ></SingleOptionInput>
        <div></div>
      </FormContainer>
    </DataOptionPanel>
  );
};
export default DesignationPanel;
