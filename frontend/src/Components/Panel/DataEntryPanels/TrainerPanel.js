import { useState } from "react";
import FormContainer from "../../form/FormContainer";
import SingleOptionInput from "../../form/inputs/SingleOptionInput";
import TextInput from "../../form/inputs/TextInput";
import DataOptionPanel from "./DataOptionPanel";
import TextInputHint from "../../form/inputs/TextInputHint";

const TrainerPanel = (props) => {
  let [trainerHint, setTrainerHint] = useState("");
  let [currentEdit, setCurrentEdit] = useState(props.data.trainer[0]);
  return (
    <DataOptionPanel dataLabel="Trainer">
      <FormContainer
        dataHandler={props.dataHandler}
        action="addTrainer"
        key={Math.floor(Math.random() * 10000)}
      >
        <TextInput label="Trainer Name" name="name"></TextInput>
        <TextInput label="Trainer Category" name="category"></TextInput>
        <TextInput label="Trainer Expertise" name="expertise"></TextInput>
        <SingleOptionInput
          label="Designation"
          name="designation_id"
          value={props.data.designation[0].id}
          options={props.data.designation}
        ></SingleOptionInput>
      </FormContainer>
      <FormContainer
        dataHandler={props.dataHandler}
        action="editTrainer"
        key={Math.floor(Math.random() * 10000)}
        additionalData={[{ name: "id", value: currentEdit.id }]}
      >
        <TextInputHint
          label="Trainer Name (Hint)"
          setHint={setTrainerHint}
          value={trainerHint}
        ></TextInputHint>
        <SingleOptionInput
          label="Select Trainer"
          name="oname"
          options={
            props.data.trainer.filter((ele) => {
              return (
                ele.name.toLowerCase().indexOf(trainerHint.toLowerCase()) !== -1
              );
            }).length == 0
              ? props.data.trainer
              : props.data.trainer.filter((ele) => {
                  return (
                    ele.name
                      .toLowerCase()
                      .indexOf(trainerHint.toLowerCase()) !== -1
                  );
                })
          }
          selected={currentEdit.id}
          editChange={setCurrentEdit}
        ></SingleOptionInput>
        <TextInput
          label="Trainer Name"
          name="name"
          value={currentEdit.name}
        ></TextInput>
        <TextInput
          label="Trainer Category"
          name="category"
          value={currentEdit.category}
        ></TextInput>
        <TextInput
          label="Trainer Expertise"
          name="expertise"
          value={currentEdit.expertise}
        ></TextInput>
        <SingleOptionInput
          label="Designation"
          name="designation_id"
          selected={currentEdit.designation_id}
          options={props.data.designation}
          value={currentEdit.designation_id}
        ></SingleOptionInput>
      </FormContainer>
      <FormContainer
        dataHandler={props.dataHandler}
        action="delTrainer"
        key={Math.floor(Math.random() * 10000)}
        additionalData={[{ name: "id", value: currentEdit.id }]}
        checkLen={props.data.trainer.length}
      >
        <TextInputHint
          label="Trainer Name (Hint)"
          setHint={setTrainerHint}
          value={trainerHint}
        ></TextInputHint>
        <SingleOptionInput
          label="Select Trainer"
          name="oname"
          options={
            props.data.trainer.filter((ele) => {
              return (
                ele.name.toLowerCase().indexOf(trainerHint.toLowerCase()) !== -1
              );
            }).length == 0
              ? props.data.trainer
              : props.data.trainer.filter((ele) => {
                  return (
                    ele.name
                      .toLowerCase()
                      .indexOf(trainerHint.toLowerCase()) !== -1
                  );
                })
          }
          selected={currentEdit.id}
          editChange={setCurrentEdit}
        ></SingleOptionInput>
        <div></div>
      </FormContainer>
    </DataOptionPanel>
  );
};
export default TrainerPanel;
