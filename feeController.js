exports.payFee = (req, res) => {
  const { student_id, amount } = req.body;

  // 1. Save transaction
  db.query(
    "INSERT INTO transactions (student_id, amount) VALUES (?, ?)",
    [student_id, amount],
    (err) => {
      if (err) return res.status(500).json(err);

      // 2. UPDATE student fee
      db.query(
        "UPDATE students SET fee_paid = fee_paid + ? WHERE id = ?",
        [amount, student_id],
        (err2) => {
          if (err2) return res.status(500).json(err2);

          res.json({ message: "Payment successful" });
        }
      );
    }
  );
};

exports.getSchoolSummary = (req, res) => {
  const schoolFee = 10000; // or from settings table

  db.query(
    "SELECT SUM(fee_paid) AS total_paid FROM students",
    (err, data) => {
      if (err) return res.status(500).json(err);

      const totalPaid = data[0].total_paid || 0;
      const remaining = schoolFee - totalPaid;

      res.json({
        schoolFee,
        totalPaid,
        remaining,
      });
    }
  );
};



exports.getTransactions = (req, res) => {
  db.query("SELECT * FROM transactions", (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};