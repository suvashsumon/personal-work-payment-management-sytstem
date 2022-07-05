const express = require("express");
const {addClient, addProject, addClientView, addProjectView, setPaid, createInvoice, addCourseView, addCourse, countAttendenceView, updateAttendence, getFinanceHome, updateFinance, financeDelete} = require("../controllers/admin");
const { getTutionIndex, addStudent, recordDate, postRecordDate } = require("../controllers/tutioncontroler");
const {isAuthenticated} = require("../middlewares/auth");

const adminRoute = express.Router();

adminRoute.get("/", isAuthenticated, (req, res)=>{
    res.render("home");
});


adminRoute.post("/add-client", isAuthenticated, addClient);
adminRoute.get("/add-client", isAuthenticated, addClientView);
adminRoute.post("/add-project/:id", isAuthenticated, addProject);
adminRoute.get("/add-project/:id", isAuthenticated, addProjectView);
adminRoute.get("/set-paid/:id", isAuthenticated, setPaid);
adminRoute.get("/create-invoice/:id", isAuthenticated, createInvoice);
adminRoute.get("/course-list", isAuthenticated, addCourseView);
adminRoute.post("/add-course", isAuthenticated, addCourse);
adminRoute.get("/count-attendence/:id", isAuthenticated, countAttendenceView);
adminRoute.post("/update-attencence/:id", isAuthenticated, updateAttendence);
adminRoute.get("/tution-assistant", isAuthenticated, getTutionIndex);
adminRoute.get("/finance-home", isAuthenticated, getFinanceHome);
adminRoute.post("/finance-update", isAuthenticated, updateFinance);
adminRoute.get("/finance-delete/:id", isAuthenticated, financeDelete);
adminRoute.post("/student-insert", isAuthenticated, addStudent);
adminRoute.get("/date-rec/:id", isAuthenticated, recordDate);
adminRoute.post("/record-date", isAuthenticated, postRecordDate);

module.exports = adminRoute;