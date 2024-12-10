const Log = (props) => {
  return (
    <span style={{ color: props.danger ? "red" : "green" }}>{props.text}</span>
  );
};
export default Log;
