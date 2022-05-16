const ejs = require("ejs");
let path = require("path");
let pdf = require("html-pdf");

const Users = require("../models/user");
const Client = require("../models/client");
const ClientProject = require("../models/client_project");
const Course = require("../models/course");
const CourseAttendence = require("../models/course_attendence");

exports.createAdmin = (req, res) => {
    if (req.body.App_Secret_Key == process.env.SECRET_KEY) {
        Users.create(req.body).then((resp) => {
            res.json({ message: "Admin created successfully" });
        }).catch((err) => {
            res.json({ message: "cannot create admin" });
        });
    }
    else {
        res.json({ message: "Authentication failed!" });
    }

};

exports.addClient = (req, res) => {
    Client.create(req.body).then((resp) => {
        //res.json({ message : "Client created successfully"});
        req.flash('success', 'New client added successfully!!');
        res.redirect('/dashboard/add-client');
    }).catch((err) => {
        console.log(err);
        res.json({ message: "cannot create Client" });
    });
};

exports.addClientView = (req, res) => {
    Client.find({}).then((clients) => {
        res.render("addclient", { clients: clients });
    }).catch((err) => {
        res.json({ message: "error occures" });
    });
}


exports.addProjectView = (req, res) => {
    ClientProject.find({ client: req.params.id }).then((clientprojects) => {
        Client.findById(req.params.id).then((client) => {
            res.render("addProject", { projects: clientprojects, client: client });
        });
    }).catch((err) => {
        res.json({ massge: "error occured" });
    });
};

exports.addProject = async (req, res) => {
    let { title, description, notes, requried_times, bill, paid, date } = req.body;
    try {
        let project = new ClientProject({
            title: title,
            description: description,
            notes: notes,
            requried_times: requried_times,
            bill: bill,
            paid: paid,
            date: date,
            client: req.params.id
        });

        let addProject = await project.save();
        //res.json(addProject);
        await Client.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { 'projects': addProject._id } }
        );
        req.flash('success', 'Project added successfully!!');
        res.redirect("/dashboard/add-project/" + req.params.id);
    } catch (err) {
        console.log(err);
    }
};

exports.getClient = (req, res) => {
    console.log(req.params);
    Client.findOne({ _id: req.params.id }).populate('projects').then((client) => {
        res.json(client);
    }).catch((err) => {
        res.json(err);
    });
};

exports.setPaid = async (req, res) => {
    ClientProject.findOneAndUpdate({ _id: req.params.id }, { paid: true }).then((clientproject) => {
        console.log(clientproject);
        res.redirect("/dashboard/add-project/" + clientproject.client);
    }).catch((err) => {
        console.log(err);
        res.json({ message: "error occurs" });
    });
};

exports.createInvoice = async (req, res) => {
    let client_project, client, total = 0;
    try {
        client_project = await ClientProject.find({ client: req.params.id, paid: false });
        client = await Client.findById(req.params.id);
        client_project.forEach((project) => {
            total = total + project.bill;
        });

    } catch (error) {
        console.log(error);
    }


    let ts = Date.now();
    let months = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth();
    let year = date_ob.getFullYear();
    let today_date = date + " " + months[month] + ", " + year;

    let invoice_no = Math.floor(Math.random() * 100000);

    ejs.renderFile(path.join(__dirname, '../views/', "invoicetemplate.ejs"), { projects: client_project, client: client, total_bill: total, today : today_date, invoice_no : invoice_no }, (err, data) => {
        if (err) {
            console.log(err);
            res.json({ message: "error occured to open template." });
        } else {
            let options = {
                "height": "11.25in",
                "width": "8.5in",
                "header": {
                    "height": "20mm"
                },
                "footer": {
                    "height": "20mm",
                },
            };
            pdf.create(data, options).toFile("invoices/invoice.pdf", function (err, data) {
                if (err) {
                    console.log(err);
                    res.json({ message: "error occured to create invoice." });
                } else {
                    //res.send("File created successfully");
                    res.redirect("/invoices/invoice.pdf");
                }
            });
        }
    });
};


exports.addCourseView = (req, res)=>{
    Course.find({}).then((courses)=>{
        res.render("addcourse", {"courses" : courses});
    });
};

exports.addCourse = (req, res)=>{
    Course.create(req.body).then((course)=>{
        req.flash('success', 'Course added successfully!!');
        res.redirect("/dashboard/course-list");
    });
};


exports.countAttendenceView = async (req, res)=>{
    let course = await Course.findOne({_id : req.params.id});
    //console.log(course.title);
    let courseattendence = await CourseAttendence.find({course : req.params.id});
    res.render("countattendence", {"countattencences" : courseattendence, "course_title" : course.title, "course_id" : req.params.id});
};


exports.updateAttendence = async (req, res)=>{
    let {date, is_present, notes} = req.body;
    let attendence = {
        date : date,
        is_present : is_present,
        notes : notes,
        course : req.params.id
    };
    
    try {
        let att = await CourseAttendence.create(attendence);
        await Course.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { 'attendence': att._id } }
        );
        req.flash('success', 'Attendence added successfully!!');
        res.redirect("/dashboard/count-attendence/"+req.params.id);
    } catch (error) {
        console.log(error);
    }
};