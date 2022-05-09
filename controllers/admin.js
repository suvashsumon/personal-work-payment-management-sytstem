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
    res.render("addclient");
}

exports.addProject = async (req, res)=>{
    let {title, description, notes, requried_times, bill, paid, client} = req.body;
    try{
        let project = new ClientProject({
            title : title,
            description : description,
            notes : notes,
            requried_times : requried_times,
            bill : bill,
            paid : paid,
            client : client
        });
    
        let addProject = await project.save();
        //res.json(addProject);
        await Client.findOneAndUpdate(
            {_id: client},
            { $push : { 'projects' : addProject._id}}
        );
        res.json({
            message : "Project added Successfully"
        });
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