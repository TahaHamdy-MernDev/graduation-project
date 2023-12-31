const router=require("express").Router()
router.use('/auth',require('./authRoute'))
router.use('/books',require('./bookRoutes'))
router.use('/category',require('./categoryRoutes'))
router.use('/courses',require('./courseRoute'))
router.use('/questions',require('./questionRoutes'))
module.exports=router