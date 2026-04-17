const db = require("../config/db");

// GET SCHOOL FEE
exports.getSchoolFee = (req, res) => {
  db.query("SELECT school_fee FROM settings LIMIT 1", (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data[0]);
  });
};

// UPDATE SCHOOL FEE (ADMIN)
exports.updateSchoolFee = (req, res) => {
  const { school_fee } = req.body;

  db.query(
    "UPDATE settings SET school_fee=? WHERE id=1",
    [school_fee],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "School fee updated" });
    }
  );
};