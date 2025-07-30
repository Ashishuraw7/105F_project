const { blogs } = require("../../model")

exports.renderHome = async(req,res)=>{
// blogs table bata data(row) nikalnw paryo ani home page lai pass grnu paryo
    const blogsTableBlogs = await blogs.findAll()

    res.render("home",{blogs : blogsTableBlogs})
}


exports.renderAbout = (req,res)=>{
    res.render("about")
}

exports.renderAddBlog = (req,res)=>{
    res.render("addBlog")
}

exports.renderAddBlogs = async(req,res)=>{
    const {userId} = req

    const {title,subTitle,description} = req.body
    if(!title || !subTitle || !description){
        return res.send("please provide the details")
    }
   

    // inserting into blogs table
     await blogs.create({
        title : title,
        subTitle : subTitle,
        description : description,
        image : process.env.backendUrl + req.file.filename,
        userId : userId
    })

    res.redirect("./")
}

exports.renderSingleBlog = async(req,res)=>{
    const id = req.params.id
    // const foundData =  await blogs.findByPk(id)  returns object
    const foundData = await blogs.findAll({
        where : {
            id : id
        }
    })

    console.log(foundData)
    res.render("singleBlog",{blog : foundData})
}

exports.renderDelete = async(req,res)=>{
    const id = req.params.id
    await blogs.destroy({
        where : {
            id : id
        }
    })
    res.redirect("/")
}

exports.renderUpdateBlog = async(req,res)=>{
    const id = req.params.id
    const blog = await blogs.findByPk(id)
    res.render("updateBlog",{id ,blog})
}

exports.renderUpdate = async(req,res)=>{
    const {id} = req.params
    const{title,subTitle,description} = req.body
     await blogs.update({
        title : title,
        subTitle : subTitle,
        description : description
    },{
        where : {
            id : id
        }
    })
   res.redirect("/blog/" + id)

}