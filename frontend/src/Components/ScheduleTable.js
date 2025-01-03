import React from "react";
import "../Styles/table.css";
const ScheduleTable = (props) => {
  let clone = (data) => {
    return JSON.parse(JSON.stringify(data));
  };

  let data = [];
  props.data.map((element) => {
    let cl = clone(element);
    delete cl.created_at;
    cl.from_date = cl.from_date.slice(0, 10);
    cl.to_date = cl.to_date.slice(0, 10);
    delete cl.name_id;
    delete cl.trainer_id;
    delete cl.updated_at;
    delete data.push(cl);
  });

  let columnHeaders;
  if (data.length == 0) {
    columnHeaders = ["No Data Available"];
  } else {
    columnHeaders = Object.keys(data[0]);
    columnHeaders.push("Content");
    columnHeaders.push("Attendence");
    columnHeaders.push("Feedback");
  }

  return (
    <div className="needbot">
      <table className="tabl" id="wfull">
        <thead>
          <tr style={{ backgroundColor: "#223343" }}>
            {columnHeaders.map((header) => (
              <th key={header}>{header.toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody style={{ backgroundColor: "white" }}>
          {data.map((element) => {
            let trainingData = element;
            return (
              <tr>
                {columnHeaders.map((header) => (
                  <>
                    <td>
                      {header === "document" ? (
                        <a
                          href={
                            "http://" +
                            window.location.hostname +
                            ":8000/media/" +
                            trainingData[header]
                          }
                        >
                          Click here
                        </a>
                      ) : header === "Content" ? <a target="_blank" href={"http://" + window.location.hostname + ":8001/uploads/"+trainingData["id"]+"f@j"+"Content.pdf"}>Click Me</a> : header === "Attendence" ? <a target="_blank" href={"http://" + window.location.hostname + ":8001/uploads/"+trainingData["id"]+"f@j"+"Attendence.pdf"}>Click Me</a> : header === "Feedback" ? <a  target="_blank" href={"http://" + window.location.hostname + ":8001/uploads/"+trainingData["id"]+"f@j"+"Feedback.pdf"}>Click Me</a> : (
                        trainingData[header]
                      )}
                    </td>
                  </>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
