const TextInputHint = (props) => {
  const handleChange = (e) => {
    props.setHint(e.target.value);
  };
  return (
    <div className="text-input">
      <div className="text-input-label">{props.label + " :"}</div>
      <input
        className="text-input-box"
        type={props.type ? props.type : "text"}
        value={props.value}
        disabled={props.disabled}
        onChange={handleChange}
        autoFocus
      ></input>
    </div>
  );
};
TextInputHint.displayName = "TextInputHint";
export default TextInputHint;
