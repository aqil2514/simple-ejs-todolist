const fs = require("fs");

if (!fs.existsSync("./data")) {
  fs.mkdirSync("./data");
}

if (!fs.existsSync("./data/tdl.json")) {
  fs.writeFileSync("./data/tdl.json", "[]", "utf-8");
}

const loadFile = () => {
  const fileBuffer = fs.readFileSync("./data/tdl.json");
  const data = JSON.parse(fileBuffer);

  return data;
};

const saveTask = (task) => {
  fs.writeFileSync("./data/tdl.json", JSON.stringify(task));
};

const deleteTask = (data) => {
  const taskes = loadFile();
  const newtask = taskes.filter((t) => t.task !== data);

  saveTask(newtask);
};

const addFile = (req) => {
  const task = loadFile();

  task.push(req);
  saveTask(task);
};

module.exports = { loadFile, addFile, deleteTask };
