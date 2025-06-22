const express = require('express');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend')));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend/views'));

// Load CSV Data
let studentData = [];
fs.createReadStream(path.join(__dirname, 'student_result_data.csv'))
  .pipe(csv())
  .on('data', (data) => studentData.push(data))
  .on('end', () => {
    console.log('✅ CSV data loaded');
  });

// Home Page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/result.html'));
});

// Result Page
app.post('/result', (req, res) => {
  const roll = req.body.roll_num;
  const dob = req.body.dob;

  const student = studentData.find(
    (s) => s.roll_num === roll && s.dob === dob
  );

  if (!student) {
    return res.send('❌ Result not found. Please check Roll Number and DOB.');
  }

  const total = [
    parseInt(student.marks_1),
    parseInt(student.marks_2),
    parseInt(student.marks_3),
    parseInt(student.marks_4),
    parseInt(student.marks_5)
  ].reduce((a, b) => a + b, 0);

  const percentage = (total / 5).toFixed(2);
  const result = percentage >= 33 ? 'Pass' : 'Fail';

  res.render('StudentResult', {
    name: student.name,
    roll_num: student.roll_num,
    dob: student.dob,
    father_name: student.father_name,
    student,
    total_marks: total,
    percentage,
    result
  });
});

app.listen(PORT,"0.0.0.0", () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
