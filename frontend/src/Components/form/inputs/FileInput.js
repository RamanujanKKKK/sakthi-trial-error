import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

const FileInput = (props) => {
  const [data, setData] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      // Assuming you want the first sheet
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convert sheet to JSON without headers
      const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // `header: 1` gets all rows as arrays
      const headers = sheetData[0]; // First row as headers
      const rows = sheetData.slice(1); // Data rows without headers
      // Convert rows into JSON objects
      const jsonData = rows.map((row) => {
        const rowData = {};
        headers.forEach((header, index) => {
          rowData[header] = row[index] || null; // Assign data to header keys, defaulting to null
        });
        return rowData;
      });

      setData(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleSendData = async () => {
    setUploadStatus("Sending...");

    try {
      // Send each row individually
      for (const row of data) {
        let dat = {};
        dat["emp_id"] = row["emp_id"];
        dat["name"] = row["name"];
        dat["department_id"] = props.department.filter((ele) => {
          return ele.name == row["department"];
        })[0].id;
        dat["designation_id"] = props.designation.filter(
          (ele) => ele.name == row["designation"]
        )[0].id;
        console.log(dat);
        if (!dat["name"]) continue;
        await axios.post(
          "http://" + window.location.hostname + ":8001/" + "addEmployee",
          dat
        );
      }
      await props.dataHandler.updateData();
      setUploadStatus("All data sent successfully!");
    } catch (error) {
      setUploadStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <div style={{ color: "white", fontSize: "30px" }}>Upload Excel File</div>
      <div style={{ color: "white", fontSize: "20px" }}>
        must have the following columns : emp_id,name,department,designation
      </div>
      <div style={{ color: "red", fontSize: "15px" }}>
        Clicking "Upload Excel" is enough to add Data
      </div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <button onClick={handleSendData} disabled={!data.length}>
        Upload Excel
      </button>
      {uploadStatus && <p>{uploadStatus}</p>}
      <br></br>
    </div>
  );
};
FileInput.displayName = "FileInput";
export default FileInput;
