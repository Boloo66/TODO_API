let router = require('express').Router();
let verifyToken = require('../verifytoken')

module.exports = router.get('/', verifyToken, async(req, res) => {
    res.send("YOO");
    // let userid = req.user.id;
    // let startDate = req.query.startDate;
    // let endDate = req.query.endDate;
    // if(startDate && endDate){
    //     await filterByDate(userid, startDate, endDate, res);
    // }
    // res.status(500).send('Enter start and end date query');
    
})
