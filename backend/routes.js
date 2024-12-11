var express = require("express");
const { DBActionC } = require("./db.js");
const e = require("express");
const multer = require("multer");
const path = require("path");

var router = express.Router();
// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    console.log(100)
    cb(null, (req.filename || "default") + path.extname(file.originalname)); // Rename file with timestamp
  },
});

const upload = multer({ storage });

// Create 'uploads' folder if it doesn't exist
const fs = require("fs");
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}



let DBAction = new DBActionC();
router.get("/", async (req, res) => {
  res.status(200);
  employees = await DBAction.getTableData("training_employee");
  designation = await DBAction.getTableData("training_designation");
  department = await DBAction.getTableData("training_department");

  trainingType = await DBAction.getTableData("training_trainingtype");
  nomination = await DBAction.getTableData("training_trainingnomination");
  trainingDepartment = await DBAction.getTableData(
    "training_trainingtype_department"
  );

  trainer = await DBAction.getTableData("training_trainer");
  attendees = await DBAction.getTableData("training_trainingattendance");

  attendence = await DBAction.getTableData("training_trainingattendance");
  schedule = await DBAction.getTableData("training_trainingschedule");

  data = {
    training: trainingType,
    department: department,
    links: {},
    revlinks: {},
    linkWemp: {},
    trainingCount: {},
    departmentCount: {},
    departmentCount2: {},
    employeebyTraining: {},
    employeebyDept: {},
    trainer: trainer,
    schedule: schedule,
    employees: employees,
    designation: designation,
    nominationtable: nomination,
    empunderTrain: 0,
    trainingBySchedules: {},
    trainingAttendenceEmp: {},
    trainingDeptAttendence: {},
    deptSpecificAttendence: {},
    DbarGF: {},
    DbarGF2: {},
    filter: {
      training: trainingType,
      department: department,
    },
  };
  trainingDepartment.forEach((element) => {
    if (data.links[element.trainingtype_id]) {
      data.links[element.trainingtype_id].push(element.department_id);
    } else {
      data.links[element.trainingtype_id] = [element.department_id];
    }
  });
  trainingDepartment.forEach((element) => {
    if (data.revlinks[element.department_id]) {
      data.revlinks[element.department_id].push(element.trainingtype_id);
    } else {
      data.revlinks[element.department_id] = [element.trainingtype_id];
    }
  });

  nomination.forEach((element) => {
    if (data.trainingCount[element.training_id]) {
      data.trainingCount[element.training_id] += 1;
    } else {
      data.trainingCount[element.training_id] = 1;
    }
  });
  employees.forEach(element => {
    if (data.departmentCount2[element.department_id]) {
      data.departmentCount2[element.department_id] += 1;
    }
    else {
      data.departmentCount2[element.department_id] = 1
    }
  });

  nomination.forEach((element) => {
    if (data.linkWemp[element.trainingtype_id]) {
      data.linkWemp[element.trainingtype_id].push(element.employee_id);
    } else {
      data.linkWemp[element.trainingtype_id] = [element.employee_id];
    }
  });

  employees.forEach((element) => {
    if (data.employeebyDept[element.department_id]) {
      let k = DBAction.clone(element);
      k.training = [];
      delete k["created_at"];
      delete k["updated_at"];
      k["department_name"] = DBAction.getDataById(
        department,
        element.department_id
      ).name;
      delete k["department_id"];
      k["designation_name"] = DBAction.getDataById(
        designation,
        k["designation_id"]
      ).name;
      delete k["designation_id"];
      data.employeebyDept[element.department_id].push(k);
    } else {
      let k = DBAction.clone(element);
      k.training = [];
      delete k["created_at"];
      delete k["updated_at"];
      k["department_name"] = DBAction.getDataById(
        department,
        element.department_id
      ).name;
      delete k["department_id"];
      k["designation_name"] = DBAction.getDataById(
        designation,
        k["designation_id"]
      ).name;
      delete k["designation_id"];
      data.employeebyDept[element.department_id] = [k];
    }
  });

  nomination.forEach((element) => {
    let trainingId = schedule.filter((ele) => ele.id == element.training_id)[0]
      .name_id;
    if (data.employeebyTraining[element.training_id] != null) {
      let k = DBAction.getDataById(employees, element.employee_id);

      data.employeebyDept[k.department_id]
        .filter((ele) => ele.id == k.id)[0]
        .training.push(trainingId);
      data.employeebyTraining[element.training_id].push(k);
    } else {
      let k = DBAction.getDataById(employees, element.employee_id);
      data.employeebyDept[k.department_id]
        .filter((ele) => ele.id == k.id)[0]
        .training.push(trainingId);
      data.employeebyTraining[element.training_id] = [k];
    }
  });
  Object.keys(data.employeebyDept).forEach((key) => {
    data.employeebyDept[key].forEach((ele) => {
      if (ele.training.length != 0) {
        data.empunderTrain += 1;
        if (data.departmentCount[key] != null) {
          data.departmentCount[key] += 1;
        } else {
          data.departmentCount[key] = 1;
        }
      }
    });
  });

  trainingType.forEach((element) => {
    data.trainingBySchedules[element.id] = [];
  });

  schedule.forEach((element) => {
    let ele = DBAction.clone(element);
    delete ele["name_id"];
    delete ele["created_at"];
    delete ele["updated_at"];
    delete ele["name_id"];
    ele.TrainerName = DBAction.getDataById(trainer, ele["trainer_id"]).name;
    delete ele["trainer_id"];

    data.trainingBySchedules[element.name_id].push(ele);
  });

  schedule.forEach((element) => {
    let nominated = nomination.filter((ele) => ele.training_id == element.id);
    let out = [];
    nominated.forEach((nomin) => {
      let el = DBAction.clone(nomin);
      if (
        attendees.filter(
          (ele) =>
            ele.training_id == element.id &&
            ele.employee_id == nomin.employee_id
        ).length == 0
      ) {
        el.attended = false;
      } else {
        el.attended = true;
      }
      out.push(el);
    });
    data.trainingAttendenceEmp[element.id] = out;
  });

  trainingType.forEach((training) => {
    data.DbarGF[training.id] = { value: training.name };
    let su = 0;
    schedule.forEach((sch) => {
      if (sch.name_id == training.id) {
        su += sch.duration;
      }
    });
    data.DbarGF[training.id].total = su;
    data.DbarGF[training.id].emp = [];
  });

  trainingType.forEach((training) => {
    data.DbarGF2[training.id] = { value: training.name };
    let l = [];
    let currSchedules = schedule.filter((ele) => ele.name_id == training.id);
    let schId = currSchedules.map((ele) => ele.id);
    if (data.links[training.id])
      data.links[training.id].forEach((dept_id) => {
        let empDept = employees.filter((emp) => emp.department_id == dept_id);
        empDept.forEach((emp) => {
          let nomFil = nomination.filter(
            (nom) =>
              nom.employee_id == emp.id && schId.includes(nom.training_id)
          );
          let su1 = 0;
          nomFil.forEach((sch_i) => {
            let ddsch = currSchedules
              .filter((ele) => ele.id == sch_i.training_id)
              .map((ele) => ele.duration)
              .reduce((a, b) => a + b, 0);
            su1 += ddsch;
          });
          let attFil = attendence.filter(
            (nom) =>
              nom.employee_id == emp.id && schId.includes(nom.training_id)
          );
          let su2 = 0;
          attFil.forEach((sch_i) => {
            su2 += sch_i.attended_days;
          });
          if (su1 != 0) l.push(su2 / su1);
        });
      });

    data.DbarGF2[training.id].total = l.length;
    data.DbarGF2[training.id].emp = l;
  });

  trainingDepartment.forEach((element) => {
    let empl = employees.filter(
      (ele) => ele.department_id == element.department_id
    );
    let out = [];
    let schedul = schedule.filter(
      (ele) => ele.name_id == element.trainingtype_id
    );
    let schedules = [];
    schedul.forEach((ele) => {
      schedules.push(ele.id);
    });
    empl.forEach((emply) => {
      let k2 = attendees.filter((ele) => schedules.includes(ele.training_id));
      let k = attendees.filter(
        (ele) =>
          schedules.includes(ele.training_id) && ele.employee_id == emply.id
      );
      let su = 0;
      k.forEach((atd) => {
        su += atd.attended_days;
      });
      k = DBAction.clone(emply);
      k.attendedDays = su;
      out.push(k);
      data.DbarGF[element.trainingtype_id].emp.push(su);
    });
    if (data.trainingDeptAttendence[element.trainingtype_id]) {
      data.trainingDeptAttendence[element.trainingtype_id].push({
        dpt: element.department_id,
        emp: out,
      });
    } else {
      data.trainingDeptAttendence[element.trainingtype_id] = [
        { dpt: element.department_id, emp: out },
      ];
    }
  });
  department.forEach((dept) => {
    let empl = employees.filter((ele) => ele.department_id == dept.id);
    let trainings = data.revlinks[dept.id];
    let schedules = [];
    if (trainings)
      trainings.forEach((training_id) => {
        schedules.push(schedule.filter((ele) => ele.name_id == training_id));
      });

    let out = [];
    empl.forEach((emp) => {
      if (trainings) {
        let smallout = [];
        schedules.forEach((schedul, index) => {
          let su = 0;
          schedul.forEach((ele) => {
            let k = attendees.filter(
              (att) => att.training_id == ele.id && att.employee_id == emp.id
            );
            if (k.length > 0) su += k[0].attended_days;
          });
          smallout.push({ training: trainings[index], attended_days: su });
        });
        out.push({
          emp_id: emp.emp_id,
          emp_name: emp.name,
          attendence_details: smallout,
        });
      } else {
        out.push({
          emp_id: emp.emp_id,
          emp_name: emp.name,
          attendence_details: [],
        });
      }
    });
    data.deptSpecificAttendence[dept.id] = out;
  });
  res.send(data);
  res.end();
});

router.post("/addDept", async (req, res) => {
  let status = await DBAction.addToTable("training_department", req.body, [
    "head",
    "name",
  ]);
  res.send(status);
});
router.post("/editDept", async (req, res) => {
  let status = await DBAction.editFromTable("training_department", req.body);
  res.send(status);
});
router.post("/delDept", async (req, res) => {
  let status = await DBAction.deleteFromTable(
    "training_department",
    req.body.id
  );

  res.send(status);
});
router.post("/addTraining", async (req, res) => {
  let depts = JSON.parse(JSON.stringify(req.body.depts));
  delete req.body["depts"];
  let status = await DBAction.addToTable("training_trainingtype", req.body, [
    "description",
    "name",
  ]);
  if (status != "Data Insertion Successfull") {
    res.send(status);
    return;
  }
  let id = await DBAction.getIDbyField(
    "training_trainingtype",
    "name",
    req.body.name
  );
  for (el in depts) {
    status = await DBAction.addToTable(
      "training_trainingtype_department",
      { trainingtype_id: id, department_id: depts[el] },
      ["trainingtype_id", "department_id"]
    );
    if (status != "Data Insertion Successfull") {
      res.send(status);
      return;
    }
  }
  res.send(status);
});

router.post("/editTraining", async (req, res) => {
  let depts = JSON.parse(JSON.stringify(req.body.depts));
  delete req.body["depts"];
  let id = req.body.id;
  let status = await DBAction.editFromTable("training_trainingtype", req.body);
  if (status != "Data Insertion Successfull") {
    res.send(status);
    return;
  }
  status = await DBAction.DeleteDatabyField(
    "training_trainingtype_department",
    "trainingtype_id",
    id
  );
  if (status != "data deleted successfully") {
    res.send("Error Editing Data");
    return;
  }
  for (el in depts) {
    status = await DBAction.addToTable(
      "training_trainingtype_department",
      { trainingtype_id: id, department_id: depts[el] },
      ["trainingtype_id", "department_id"]
    );
    if (status != "Data Insertion Successfull") {
      res.send(status);
      return;
    }
  }
  res.send(status);
});

router.post("/delTraining", async (req, res) => {
  let id = req.body.id;
  let status = await DBAction.DeleteDatabyField(
    "training_trainingtype_department",
    "trainingtype_id",
    id
  );
  status = await DBAction.deleteFromTable("training_trainingtype", req.body.id);
  res.send(status);
});

router.post("/addDsgn", async (req, res) => {
  let status = await DBAction.addToTable("training_designation", req.body, [
    "name",
  ]);
  res.send(status);
});
router.post("/editDsgn", async (req, res) => {
  let status = await DBAction.editFromTable("training_designation", req.body);
  res.send(status);
});
router.post("/delDsgn", async (req, res) => {
  let status = await DBAction.deleteFromTable(
    "training_designation",
    req.body.id
  );
  res.send(status);
});

router.post("/addTrainer", async (req, res) => {
  let status = await DBAction.addToTable("training_trainer", req.body, [
    "name",
    "expertise",
    "designation_id",
    "category",
  ]);
  res.send(status);
});
router.post("/editTrainer", async (req, res) => {
  let status = await DBAction.editFromTable("training_trainer", req.body);
  res.send(status);
});
router.post("/delTrainer", async (req, res) => {
  let status = await DBAction.deleteFromTable("training_trainer", req.body.id);
  res.send(status);
});

router.post("/addEmployee", async (req, res) => {
  let status = await DBAction.addToTable("training_employee", req.body, [
    "name",
    "designation_id",
    "department_id",
  ]);
  res.send(status);
});
router.post("/editEmployee", async (req, res) => {
  let status = await DBAction.editFromTable("training_employee", req.body);
  res.send(status);
});
router.post("/delEmployee", async (req, res) => {
  let status = await DBAction.deleteFromTable("training_employee", req.body.id);
  res.send(status);
});

router.post("/addSchedule", async (req, res) => {
  function addDaysToDate(dateStr, days) {
    let date2 = new Date(
      new Date(dateStr).getTime() + days * 24 * 60 * 60 * 1000
    );
    return date2.toISOString().split("T")[0];
  }
  req.body["to_date"] = addDaysToDate(
    req.body.from_date,
    req.body.duration - 1
  );
  let status = await DBAction.addToTable(
    "training_trainingschedule",
    req.body,
    []
  );
  res.send(status);
});
router.post("/editSchedule", async (req, res) => {
  function addDaysToDate(dateStr, days) {
    let date2 = new Date(
      new Date(dateStr).getTime() + days * 24 * 60 * 60 * 1000
    );
    return date2.toISOString().split("T")[0];
  }
  delete req.body["tp_code"];
  req.body["to_date"] = addDaysToDate(
    req.body.from_date,
    req.body.duration - 1
  );
  let status = await DBAction.editFromTable(
    "training_trainingschedule",
    req.body
  );
  res.send(status);
});
router.post("/delSchedule", async (req, res) => {
  let status = await DBAction.deleteFromTable(
    "training_trainingschedule",
    req.body.id
  );
  res.send(status);
});

router.post("/addNomination", async (req, res) => {
  DBAction.DeleteDatabyField(
    "training_trainingnomination",
    "training_id",
    req.body.id
  );
  let status;

  for (let e in req.body.name_id) {
    let ele = req.body.name_id[e];
    let k = {};
    k["employee_id"] = ele;
    k["training_id"] = req.body.id;
    status = await DBAction.addToTable("training_trainingnomination", k, []);
  }
  res.send(status);
});

router.post("/addAttendance", async (req, res) => {
  let status;
  for (let e in req.body.name_id) {
    let ele = req.body.name_id[e];
    DBAction.DeleteDatabyFields(
      "training_trainingattendance",
      "training_id",
      req.body.id,
      "employee_id",
      ele
    );

    let k = {};
    k["employee_id"] = ele;
    k["training_id"] = req.body.id;
    k["attended_days"] = req.body.attended_days;
    status = await DBAction.addToTable("training_trainingattendance", k, []);
  }
  res.send(status);
});


router.post("/file/:name", async (req, res,next) => {
  req.filename = req.params.name
  next()
}, upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.send(`File uploaded as ${req.file.filename}`);
  console.log("recie")
})

module.exports = router;
