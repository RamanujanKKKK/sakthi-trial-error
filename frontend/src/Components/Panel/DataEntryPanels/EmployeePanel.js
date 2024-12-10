import { useState } from "react";
import FormContainer from "../../form/FormContainer";
import SingleOptionInput from "../../form/inputs/SingleOptionInput";
import TextInput from "../../form/inputs/TextInput";
import DataOptionPanel from "./DataOptionPanel";
import TextInputHint from "../../form/inputs/TextInputHint";

const EmployeePanel = (props) => {
  let [employeeHint, setEmployeeHint] = useState("");
  let [currentEdit, setCurrentEdit] = useState(props.data.employees[0]);
  return (
    <DataOptionPanel dataLabel="Employee">
      <FormContainer
        dataHandler={props.dataHandler}
        action="addEmployee"
        key={Math.floor(Math.random() * 10000)}
      >
        <TextInput label="Employee ID" name="emp_id"></TextInput>
        <TextInput label="Employee Name" name="name"></TextInput>
        <SingleOptionInput
          label="Department"
          name="department_id"
          value={props.data.department[0].id}
          options={props.data.department}
        ></SingleOptionInput>
        <SingleOptionInput
          label="Designation"
          name="designation_id"
          value={props.data.designation[0].id}
          options={props.data.designation}
        ></SingleOptionInput>
      </FormContainer>
      {props.data.employees.length != 0 ? (
        <FormContainer
          dataHandler={props.dataHandler}
          action="editEmployee"
          key={Math.floor(Math.random() * 10000)}
          additionalData={[{ name: "id", value: currentEdit.id }]}
        >
          <TextInputHint
            label="Trainer Name (Hint)"
            setHint={setEmployeeHint}
            value={employeeHint}
          ></TextInputHint>
          <SingleOptionInput
            label="Select Employee"
            name="cname"
            options={
              props.data.employees.filter((ele) => {
                return (
                  ele.name.toLowerCase().indexOf(employeeHint.toLowerCase()) !==
                  -1
                );
              }).length == 0
                ? props.data.employees
                : props.data.employees.filter((ele) => {
                    return (
                      ele.name
                        .toLowerCase()
                        .indexOf(employeeHint.toLowerCase()) !== -1
                    );
                  })
            }
            selected={currentEdit.id}
            editChange={setCurrentEdit}
          ></SingleOptionInput>
          <TextInput
            label="New Employee ID"
            name="emp_id"
            value={currentEdit.emp_id}
          ></TextInput>
          <TextInput
            label="New Employee Name"
            value={currentEdit.name}
            name="name"
          ></TextInput>
          <SingleOptionInput
            label="New Department"
            name="department_id"
            options={props.data.department}
            selected={currentEdit.department_id}
            value={currentEdit.department_id}
          ></SingleOptionInput>
          <SingleOptionInput
            label="New Designation"
            name="designation_id"
            selected={currentEdit.designation_id}
            options={props.data.designation}
            value={currentEdit.designation_id}
          ></SingleOptionInput>
        </FormContainer>
      ) : (
        <h1>no data present</h1>
      )}
      {props.data.employees.length != 0 ? (
        <FormContainer
          dataHandler={props.dataHandler}
          action="delEmployee"
          key={Math.floor(Math.random() * 10000)}
          additionalData={[{ name: "id", value: currentEdit.id }]}
        >
          <TextInputHint
            label="Trainer Name (Hint)"
            setHint={setEmployeeHint}
            value={employeeHint}
          ></TextInputHint>
          <SingleOptionInput
            label="Select Employee"
            name="cname"
            options={
              props.data.employees.filter((ele) => {
                return (
                  ele.name.toLowerCase().indexOf(employeeHint.toLowerCase()) !==
                  -1
                );
              }).length == 0
                ? props.data.employees
                : props.data.employees.filter((ele) => {
                    return (
                      ele.name
                        .toLowerCase()
                        .indexOf(employeeHint.toLowerCase()) !== -1
                    );
                  })
            }
            selected={currentEdit.id}
            editChange={setCurrentEdit}
          ></SingleOptionInput>
          <SingleOptionInput
            label="Department"
            name="ndept"
            disabled={true}
            options={props.data.department}
            selected={currentEdit.department_id}
            value={currentEdit.department_id}
          ></SingleOptionInput>
          <TextInput
            label="Employee ID"
            name="emp_id"
            value={currentEdit.emp_id}
            disabled={true}
          ></TextInput>
        </FormContainer>
      ) : (
        <h1>no data present</h1>
      )}
    </DataOptionPanel>
  );
};
export default EmployeePanel;
