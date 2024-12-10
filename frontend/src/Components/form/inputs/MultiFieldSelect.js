import { useState } from "react";
import MultiOptionInput from "./MultiOptionInput";
import SingleOptionInput from "./SingleOptionInput";
import TextInput from "./TextInput";

const RowData = (props) => {
  const change = (e) => {
    if (e.currentTarget.checked) {
      props.addId(e.target.dataset.id);
    } else {
      props.removeId(e.target.dataset.id);
    }
  };
  return (
    <div className="row-data">
      <input
        type="checkbox"
        data-id={props.data.id}
        onChange={change}
        name={props.data.id}
        checked={props.checked}
        className="checkbox-select"
      ></input>
      <label for={props.data.id} className="checkbox-name">
        {props.data.name}
      </label>
      <label for={props.data.id} className="checkbox-dept">
        {props.data.department_name + " "}
      </label>
    </div>
  );
};

const MultiFieldSelect = (props) => {
  let options = props.options;
  if (!props.options) options = [];
  console.log(options);
  let [selectState, setSelectState] = useState(true);
  const delValue = (val) => {
    let datae = JSON.parse(JSON.stringify(props.data));
    let data = datae[props.index].value;
    var index = data.indexOf(val);
    if (index >= 0) {
      data.splice(index, 1);
    }
    props.setDataState(datae);
  };
  const addValue = (val) => {
    let datae = JSON.parse(JSON.stringify(props.data));
    let data = datae[props.index].value;
    data.push(val);
    props.setDataState(datae);
  };

  const selectStateEvent = (e) => {
    if (selectState) {
      let datae = JSON.parse(JSON.stringify(props.data));
      datae[props.index].value = [];
      let data = datae[props.index].value;
      options.map((ele) => {
        data.push(ele.id);
      });
      props.setDataState(datae);
      setSelectState(!selectState);
    } else {
      let datae = JSON.parse(JSON.stringify(props.data));
      datae[props.index].value = [];
      props.setDataState(datae);
      setSelectState(!selectState);
    }
  };

  return (
    <div className="multi-field-select">
      <button className="multi-field-selectall" onClick={selectStateEvent}>
        {selectState ? "Select All" : "Deselect All"}
      </button>
      <div className="row-data" style={{ fontSize: "x-large", color: "black" }}>
        <input
          type="checkbox"
          className="checkbox-select"
          style={{ opacity: 0 }}
        ></input>
        <label for={props.data.id} className="checkbox-name">
          NAME
        </label>
        <label for={props.data.id} className="checkbox-dept">
          DEPARTMENT
        </label>
      </div>
      {options.map((ele) => {
        return (
          <RowData
            checked={props.data[props.index].value.includes(ele.id)}
            removeId={delValue}
            addId={addValue}
            data={ele}
          ></RowData>
        );
      })}
    </div>
  );
};
MultiFieldSelect.displayName = "MultiFieldSelect";
export default MultiFieldSelect;
