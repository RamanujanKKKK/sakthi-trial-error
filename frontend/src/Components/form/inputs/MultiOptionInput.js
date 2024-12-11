const OptionDeselect = (props) => {
  return (
    <div className="selected-option-list-item">
      <span className="selected-option-label">{props.data.name}</span>
      <button className="selected-option-btn" onClick={props.delete}>
        &#x2715;
      </button>
    </div>
  );
};

const MultiOptionInput = (props) => {
  const handleChange = (e) => {
    if (e.target.value == "select") return;
    let datae = JSON.parse(JSON.stringify(props.data));
    let data = datae[props.index];
    data.value.push(e.target.value);
    props.setDataState(datae);
  };
  const deleteOption = (e) => {
    let datae = JSON.parse(JSON.stringify(props.data));
    let data = datae[props.index];
    var index = data.value.indexOf(e);
    if (index !== -1) {
      data.value.splice(index, 1);
    }
    props.setDataState(datae);
  };

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div className="multi-option-input">
        <span className="multi-option-label">{props.label + " :"}</span>
        <select
          className="multi-option-box"
          name={props.name}
          id={props.name}
          onChange={handleChange}
        >
          <option value={"select"}>select option</option>
          {props.options.map((element) => {
            {/* console.log(props.data); */}
            if (
              props.data[props.index].value &&
              props.data[props.index].value.filter((ele) => ele == element.id)
                .length == 0
            ) {
              return <option value={element.id}>{element.name}</option>;
            }
          })}
        </select>
      </div>
      <div className="selected-option-list">
        {props.data[props.index].value
          ? props.data[props.index].value.map((element) => {
              const el = element;
              return (
                <OptionDeselect
                  data={props.options.filter((ele) => ele.id == element)[0]}
                  delete={() => {
                    deleteOption(el);
                  }}
                ></OptionDeselect>
              );
            })
          : null}
      </div>
    </div>
  );
};
MultiOptionInput.displayName = "MultiOptionInput";
export default MultiOptionInput;
