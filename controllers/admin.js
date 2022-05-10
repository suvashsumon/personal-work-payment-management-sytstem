const Users = require("../models/user");
const Client = require("../models/client");
const ClientProject = require("../models/client_project");

exports.createAdmin = (req, res)=>{
    if(req.body.App_Secret_Key == process.env.SECRET_KEY)
    {
        Users.create(req.body).then((resp)=>{
            res.json({ message : "Admin created successfully"});
        }).catch((err)=>{
            res.json({ message : "cannot create admin"});
        });
    }
    else
    {
        res.json({ message : "Authentication failed!"});
    }
    
};

exports.addClient = (req, res)=>{
    Client.create(req.body).then((resp)=>{
        //res.json({ message : "Client created successfully"});
        req.flash('success', 'Success!!');
        res.redirect('/dashboard/add-client');
    }).catch((err)=>{
        console.log(err);
        res.json({ message : "cannot create Client"});
    });
};

exports.addClientView = (req, res)=>{
    Client.find({}).then((clients)=>{
        res.render("addclient", {clients : clients});
    }).catch((err)=>{
        res.json({ message : "error occures"});
    });
}


exports.addProjectView = (req, res)=>{
    ClientProject.find({client : req.params.id}).then((clientprojects)=>{
        Client.findById(req.params.id).then((client)=>{
            res.render("addProject", { projects : clientprojects, client : client});
        });
    }).catch((err)=>{
        res.json({ massge : "error occured"});
    });
};

exports.addProject = async (req, res)=>{
    let {title, description, notes, requried_times, bill, paid, date} = req.body;
    try{
        let project = new ClientProject({
            title : title,
            description : description,
            notes : notes,
            requried_times : requried_times,
            bill : bill,
            paid : paid,
            date : date,
            client : req.params.id
        });
    
        let addProject = await project.save();
        //res.json(addProject);
        await Client.findOneAndUpdate(
            {_id: req.params.id},
            { $push : { 'projects' : addProject._id}}
        );
        res.redirect("/dashboard/add-project/"+req.params.id);
    } catch(err){
        console.log(err);
    }
};

exports.getClient = (req, res)=>{
    console.log(req.params);
    Client.findOne({_id: req.params.id}).populate('projects').then((client)=>{
        res.json(client);
    }).catch((err)=>{
        res.json(err);
    });
};

exports.setPaid = async (req, res)=>{
    ClientProject.findOneAndUpdate({_id : req.params.id}, { paid : true}).then((clientproject)=>{
        console.log(clientproject);
        res.redirect("/dashboard/add-project/"+clientproject.client);
    }).catch((err)=>{
        console.log(err);
        res.json({ message : "error occurs" });
    });
};