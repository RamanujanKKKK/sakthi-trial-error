const { Client } = require("pg");

class DBAction {
  constructor() {
    this.createConn();
  }
  async createConn() {
    this.client = new Client({
      user: "postgres",
      host: "localhost",
      database: "sakthi_project_db2",
      password: "root",
      port: 5432,
    });
    this.client.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
    });
    this.client.on("error", (e) => {
      console.error("Database error", e);
      this.client = new Client({
        user: "sakthi_project",
        host: "154.49.243.165",
        database: "sakthi_project_db",
        password: "password",
        port: 5432,
      });
      this.client.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
      });
    });
  }
  async showTable() {
    let q = await this.client.query("SELECT * FROM pg_catalog.pg_tables");
    let l = [];
    q.rows.forEach(function (row) {
      console.log(row.tablename);
    });
    return l;
  }

  async getTableData(tablename) {
    let q = await this.client.query("SELECT * FROM " + tablename);
    let l = [];
    q.rows.forEach(function (row) {
      l.push(row);
    });
    return l;
  }
  getDataById(arr, id) {
    let out;
    arr.forEach((element) => {
      if (element.id == id) out = element;
    });
    return out;
  }
  getDataByTrainId(arr, id) {
    let out;
    arr.forEach((element) => {
      console.log(element);
      if (element.training_id == id) out = element;
    });
    return out;
  }
  clone(data) {
    return JSON.parse(JSON.stringify(data));
  }
  validateJsonKeys(jsonData, keyList) {
    for (const key of keyList) {
      if (!(key in jsonData)) return false;
      if (typeof jsonData[key] === "string" && jsonData[key].trim() === "")
        return false;
    }
    return true;
  }
  async addToTable(tableName, jsonData, requiredList) {
    try {
      const keys = Object.keys(jsonData);
      let datamissing = this.validateJsonKeys(jsonData, requiredList);
      if (!datamissing) {
        return "Data missing";
      }
      const values = Object.values(jsonData);
      const query = `
              INSERT INTO ${tableName} (${keys.join(", ")})
              VALUES (${keys.map((_, i) => `$${i + 1}`).join(", ")})
              RETURNING *;
          `;
      const result = await this.client.query(query, values);
      return "Data Insertion Successfull";
    } catch (err) {
      console.log(err);
      return "Error Inserting Data";
    }
  }
  async editFromTable(tableName, updateData) {
    try {
      const keys = Object.keys(updateData);
      const values = Object.values(updateData);
      let ID = updateData.id;
      delete updateData["id"];
      const setQuery = keys
        .map((key, index) => `${key} = $${index + 1}`)
        .join(", ");
      const query = `
            UPDATE ${tableName}
            SET ${setQuery}
            WHERE id=${ID}
            RETURNING *;
        `;
      const result = await this.client.query(query, values);
      return "Data Insertion Successfull";
    } catch (err) {
      console.log(err);
      return "Error Editing Data";
    }
  }
  async deleteFromTable(tableName, id) {
    try {
      console.log(id);
      const query = `
            DELETE FROM ${tableName}
            WHERE id = ${id};
        `;

      const result = await this.client.query(query);
      console.log(result);
      return "Data Deletion Successfull";
    } catch (err) {
      console.log(err);
      return "Error Deleting Data";
    }
  }
  async getIDbyField(tableName, fieldName, value) {
    try {
      const query = `
            SELECT id FROM ${tableName}
            WHERE ${fieldName} = $1;
        `;

      const result = await this.client.query(query, [value]);

      if (result.rows.length === 0) {
        return "No record found with the given field and value";
      }
      return result.rows[0].id;
    } catch (err) {
      return "Error inserting data";
    }
  }
  async DeleteDatabyField(tableName, fieldName, value) {
    try {
      const query = `
            DELETE FROM ${tableName}
            WHERE ${fieldName} = ${value}
            RETURNING *;
        `;

      const result = await this.client.query(query);

      if (result.rows.length === 0) {
        return "No record found with the given field and value";
      }
      return "data deleted successfully";
    } catch (err) {
      console.log(err);
      return "Error inserting data";
    }
  }
  async DeleteDatabyFields(tableName, fieldName1, value1, fieldName2, value2) {
    try {
      const query = `
            DELETE FROM ${tableName}
            WHERE ${fieldName1} = ${value1}
            and ${fieldName2} = ${value2}
            RETURNING *;
        `;

      const result = await this.client.query(query);

      if (result.rows.length === 0) {
        return "No record found with the given field and value";
      }
      return "data deleted successfully";
    } catch (err) {
      console.log(err);
      return "Error inserting data";
    }
  }
  async UpdateDatabyField(tableName, fieldName, value, setField, setValue) {
    try {
      const query = `
            UPDATE ${tableName}
            SET
            ${setField} = ${setValue}
            WHERE ${fieldName} = ${value}
            RETURNING *;
        `;

      const result = await this.client.query(query);

      if (result.rows.length === 0) {
        return "No record found with the given field and value";
      }
      return "data deleted successfully";
    } catch (err) {
      console.log(err);
      return "Error inserting data";
    }
  }
}

module.exports = { DBActionC: DBAction };
