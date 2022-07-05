const ejs = require('ejs')
let path = require('path')
let pdf = require('html-pdf')
const Student = require('../models/student')
const TutionDate = require('../models/tution_date')

exports.getTutionIndex = async (req, res) => {
  try {
    let students = await Student.find({})
    res.render('tution_assistant/index', { students: students })
  } catch (error) {
    console.log(error)
  }
}

exports.addStudent = async (req, res) => {
  let { name, cls, institute, subject, salary } = req.body
  try {
    let student = new Student({
      name: name,
      cls: cls,
      institute: institute,
      subject: subject,
      salary: salary,
    })
    await student.save()
    req.flash('success', 'Student added successfully!!')
    res.redirect('/dashboard/tution-assistant')
  } catch (error) {
    res.json((msg) => 'error')
  }
}

exports.recordDate = async (req, res) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const date = new Date()
  let c_month = months[date.getMonth()]
  let c_year = date.getFullYear();
  try {
    let data = await TutionDate.find({ student: req.params.id, month: c_month, year: c_year })
    let student = await Student.findOne({ _id: req.params.id })
    res.render('tution_assistant/month.ejs', { data: data, student: student })
  } catch (error) {
    console.log(error)
  }
}

exports.postRecordDate = async (req, res) => {
  let { student, date, month, year, note } = req.body
  try {
    let tutionDate = new TutionDate({
      date: date,
      month: month,
      year: year,
      notes: note,
      student: student,
    })
    await tutionDate.save()
    req.flash('success', 'Record added successfully!!')
    res.redirect('/dashboard/date-rec/' + student)
  } catch (error) {
    console.log(error)
  }
}
