const SingleOptionInput = (props) => {
  const handleChange = (e) => {
    let datae = JSON.parse(JSON.stringify(props.data));
    let data = datae[props.index];
    data.value = e.target.value;
    if (props.editChange) {
      props.editChange(
        props.options.filter((ele) => ele.id == e.target.value)[0]
      );
    }
    props.setDataState(datae);
  };
  return (
    <div className="single-select-input">
      <div className="single-select-label">{props.label + " :"}</div>
      <select
        name={props.name}
        id={props.name}
        onChange={handleChange}
        className="single-select-box"
        disabled={props.disabled}
      >
        {props.options.map((element) => {
          return (
            <option value={element.id} selected={element.id == props.selected}>
              {element.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};
SingleOptionInput.displayName = "SingleOptionInput";
export default SingleOptionInput;
