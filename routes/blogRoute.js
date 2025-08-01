const { renderHome, renderAddBlog, renderAbout, renderAddBlogs, rendersingleBlog, renderDelete, renderUpdateBlog, renderUpdate, renderSingleBlog, renderaddBlogs } = require("../controller/blog/blogController")
const { isAuthenticated } = require("../middleware/isAuthenticated")
const {storage,multer} = require("../middleware/multerConfig")
const router = require("express").Router()

const upload = multer({storage: storage})

router.route('/').get(renderHome)
router.route("/about").get(renderAbout)
router.route("/addblog").get(renderAddBlog).post(upload.single('image'),isAuthenticated, renderAddBlogs)
router.route("/blog/:id").get(renderSingleBlog)
router.route("/delete/:id").get(isAuthenticated, renderDelete)
router.route("/update/:id").get(renderUpdateBlog).post(renderUpdateBlog)





module.exports = router