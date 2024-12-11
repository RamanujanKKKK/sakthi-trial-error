import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Log from "./Log";

const { default: Submit } = require("./inputs/Submit");

let FormContainer = (props) => {
  let [dataState, setDataState] = useState([]);
  let [logText, setLogText] = useState("");
  let [dangerLog, setDangerLog] = useState(false);
  if (dataState.length == 0) {
    let data = [];
    props.children.map((element) => {
      console.log(element.type.displayName)
      if (element.type.displayName == "TextInput") {
        if ("value" in element.props) {
          data.push({ value: element.props.value, name: element.props.name });
        } else {
          data.push({ value: "", name: element.props.name });
        }
      } else if (element.type.displayName == "SingleOptionInput") {
        if ("value" in element.props) {
          data.push({
            value: element.props.value,
            name: element.props.name,
            options: element.props.options,
          });
        } else {
          data.push({
            name: element.props.name,
            options: element.props.options,
            value: element.props.options[0].value,
          });
        }
      } else if (element.type.displayName == "MultiOptionInput") {
        if ("value" in element.props) {
          data.push({
            name: element.props.name,
            value: element.props.value,
            options: element.props.options,
          });
        } else {
          data.push({
            name: element.props.name,
            value: [],
            options: element.props.options,
          });
        }
      } else if (element.type.displayName == "MultiFieldSelect") {
        if ("value" in element.props) {
          data.push({
            name: element.props.name,
            options: element.props.options,
            value: element.props.value,
          });
        } else {
          data.push({
            name: element.props.name,
            options: element.props.options,
            value: [],
          });
        }
      }
      else if (element.type.displayName == "FileUpload") {
        if ("value" in element.props) {
          data.push({ value: element.props.value, name: "f@j"+element.props.name });
        } else {
          data.push({ value: "", name: "f@j" + element.props.name });
        }
      }
      else {
        data.push([]);
      }
    });
    setDataState(data);
  }

  const submit = async (e) => {
    let data = {};
    if (props.checkLen)
      if (props.checkLen == 1) {
        alert("only one data present! create other data to delete this");
        return;
      }
      console.log(dataState)
    for (let el in dataState) {
      let ele = dataState[el];
      console.log(ele.value)
      if(!("value" in ele)){
        continue
      }

      console.log(dataState)

      if (!("options" in ele)) {
        if (ele.value == "") {
          setDangerLog(true);
          setLogText("Field cannot be empty");
          alert("Fields cannot be empty");
        } else {
          setLogText("");
        }
      }
      data[ele.name] = ele.value;
    }
    for (let el in props.additionalData) {
      let ele = props.additionalData[el];
      data[ele.name] = ele.value;
    }
    if (data["depts"]) {
      if (Array.isArray(data["depts"])) {
        if (data["depts"].length == 0) {
          alert("select atleast one department");
          return;
        }
      }
    }



    // console.log(data);
    axios
      .post(
        "http://" + window.location.hostname + ":8001/" + props.action,
        data
      )
      .then(async function (response) {
        if (response.status == "success") {
          setDangerLog(false);
          alert("Data Entry Success");
        } else setDangerLog(true);
        setLogText(response.result);
        alert(response.data);
        await props.dataHandler.updateData();
      })
      .catch(function (error) {
        // console.log(error);
      });
  };

  const action = props.action;
  let indexELement;
  if (props.children[0].type.displayName == "TextInputHint") indexELement = 0;
  else indexELement = 0;
  return (
    <div className="form-container">
      {dataState.length != 0
        ? props.children.map((element) => {
          indexELement += 1;
          return React.cloneElement(element, {
            data: dataState,
            setDataState: setDataState,
            index: indexELement - 1,
          });
        })
        : null}
      <Submit sendData={submit}></Submit>
      <br></br>
      <Log text={logText} danger={dangerLog}></Log>
    </div>
  );
};

export default FormContainer;
