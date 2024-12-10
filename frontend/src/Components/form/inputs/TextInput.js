const TextInput = (props) => {
  const handleChange = (e) => {
    let datae = JSON.parse(JSON.stringify(props.data));
    let data = datae[props.index];
    data.name = props.name;
    data.value = e.target.value;
    if (props.setValue) props.setValue(e.target.value);
    props.setDataState(datae);
  };
  return (
    <div className="text-input">
      <div className="text-input-label">{props.label + " :"}</div>
      <input
        className="text-input-box"
        type={props.type ? props.type : "text"}
        value={props.data[props.index].value}
        disabled={props.disabled}
        onChange={handleChange}
      ></input>
    </div>
  );
};
TextInput.displayName = "TextInput";
export default TextInput;
