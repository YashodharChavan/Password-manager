import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
app.use(cors());
app.use(express.json());

let email, password;

await mongoose.connect("mongodb://localhost:27017/password_manager");

const Schama = mongoose.Schema({
    email: String,
    password: String
})
 
const users = mongoose.model("users", Schama);

app.post("/sign-up", async (req, res) => {
    email = req.body.email;
    password = req.body.password;
    let update = await users.updateOne({ email: "NULL"}, { $set: { email: email, password: password } })

    if(update.matchedCount>0) {
        res.send("Account created successfully")
    }
    else {
        res.send("Sorry only one account can be created");
    }
    
})


app.post("/check-user", async (req, res) => {
    let firstUser = !!(await users.findOne({ email: "NULL", password: "NULL"}))
    if(firstUser) {
        res.send("first user")
    }
    else {
        res.send("not first user")
    }
})


app.post("/logout", async (req, res) => {  
    let update = await users.updateOne({ email: email, password: password}, { $set: { email: "NULL", password: "NULL" } })
    if(update.matchedCount>0) {
        res.send("logged out successfully")
    }
    else {
        res.send("failed to logout");
    }
})


app.post("/get-email", async (req, res) => {
    let user = !!(await users.findOne({ email: email, password: password}))
    if(user) {
        res.send(email)
    }
    else {    
        res.send("Not signed in")
    }
})


app.post("/get-password", (req, res) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',  
        auth: {
          user: "yashodhar.vgency@gmail.com",  
          pass: 'nohewkqvblqfxdlc',   
        },
      });

      let mailOptions = { 
        from: email,   
        to: email,  
        subject: 'Reset your Forget Vault password',   
        html: `Hey, <br><br>Thanks for using the password manager.<br>Your password is: <strong>${password}</strong><br><br>Thanks,<br>Yashodhar<br>yashodhar.vgency@gmail.com`,  
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            res.send("error in sending email")
        }
        else {
            res.send("Email sent successfully")
        }
      });
})

const passSchema = mongoose.Schema({
    webname: String,
    password: String
})

const passwords = mongoose.model("passwords", passSchema);
let webname, webpassword;
app.post("/create-password",async (req, res)=> {
    webname = req.body.webname;
    webpassword = req.body.webpassword;
    let passwordExist = !!(await passwords.findOne({webname: webname}))
    if(passwordExist) {
        res.send("password already exist")
    }
    else {
        let newPass = new passwords({webname: webname, password: webpassword})
        await newPass.save();
        res.send("password created successfully")
    }
})

app.post("/authorize", async (req, res) => {
    let pass = req.body.pass
    let passwordExist = !!(await users.findOne({email: email, password: pass}))
    if(passwordExist && pass===password) {
        res.send("authorized")
    }
    else {
        res.send("unauthorized")
    }
})

app.post("/count-passwords", async (req, res) => {
    let count = await passwords.countDocuments()
    res.send(String(count))
})
let route;
app.post("/get-route", (req, res)  => {
    route = req.body.route
    if(route==="http://localhost:5173/src/assets/fingerprint.png") {
        res.send("fingerprint")
    }
    else if(route==="http://localhost:5173/src/assets/key-chain.png"){
        res.send("key-chain")
    }
})

app.post("/set-route", (req, res) => {
    if(route==="http://localhost:5173/src/assets/fingerprint.png") {
        res.send("see-passwords")
    }
    else if(route==="http://localhost:5173/src/assets/key-chain.png"){
        res.send("manage-passwords")
    }
})

app.post("/update-password", async (req, res) => {
    let {webUpdate, existPass, newPass} = req.body;
    console.log(webUpdate, existPass, newPass)
    let userExist = !!(await passwords.findOne({webname: webUpdate, password: existPass}))
    if(userExist && existPass!==newPass) {
        let update = await passwords.updateOne({webname: webUpdate, password: existPass}, { $set: { password: newPass } })
        res.send("password updated successfully")
    }
    else {
        res.send("some error occured")
    }
})

app.post("/delete-password", async (req, res) => {
    let {webDelete, password} = req.body;
    let userExist = !!(await passwords.findOne({webname: webDelete, password: password}))
    if(userExist) {
        let del = await passwords.deleteOne({webname: webDelete, password: password})
        res.send("password deleted successfully")
    }
    else {
        res.send("some error occured")
    }
})

app.post("/see-data",async (req, res)=> {
    let data = await passwords.find({}, {webname: 1, password: 1, _id: 0})
    res.json(data)
})

app.listen(3000, () => {
    console.log("server is running on port 3000")
})