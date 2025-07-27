const { users } = require("../../model")
const bcrypt = require("bcryptjs")

exports.renderRegisterForm = (req,res)=>{
    res.render("register")
}


exports.registerUser = async(req,res)=>{
    console.log(req.body)
    const {username,email,password} = req.body
    await users.create({
        username : username,
        email : email,
        password : bcrypt.hashSync(password,12)
    })
    res.redirect("/login")
}

exports.renderLoginForm = (req,res)=>{
    res.render("login")
}

exports.loginUser = async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.send("please provide email and passwords")
    }

    // check whether the coming email user exist or not
    const user = await users.findAll({
        where : {
            email : email
        }
    })
    if(user.length ==0){
        res.send("No user exist with that email")
    }else{
        // tyo email ko user xa vanney bujyo --> password pni check garney
        const isMatched = await bcrypt.compare(password,user[0].password)
        if (isMatched){
            res.send("login successfully")
        }else{
            res.send("email or passwod is invalid") 
        }
    }

}