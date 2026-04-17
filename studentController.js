const db = require("../config/db");

// GET ALL STUDENTS
exports.getStudents = (req, res) => {
  db.query("SELECT * FROM students", (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};

// ADD STUDENT
exports.addStudent = (req, res) => {
  const { name, class_name, fee_paid, total_fee } = req.body;

  db.query(
    "INSERT INTO students (name,class_name,fee_paid,total_fee) VALUES (?,?,?,?)",
    [name, class_name, fee_paid, total_fee],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Student added" });
    }
  );
};

// UPDATE STUDENT
exports.updateStudent = (req, res) => {
  const { id } = req.params;
  const { name, class_name, total_fee } = req.body;

  db.query(
    "UPDATE students SET name=?, class_name=?, total_fee=? WHERE id=?",
    [name, class_name, total_fee, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Student updated" });
    }
  );
};

// DELETE STUDENT
exports.deleteStudent = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM students WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Student deleted" });
  });
};