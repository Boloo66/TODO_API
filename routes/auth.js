let router = require('express').Router();
let Todo = require("../models/todo");
let { validateData, validateLogin } = require('../validate');
let query = require('../querydb');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let dotenv = require('dotenv');
let verifyToken = require('../verifytoken');
const User = require('../models/user');
const { where } = require('sequelize');
let createUser = require('../controllers/createuser').createUser;
let createTodo = require('../controllers/create_update_delete_todo').CreateTodo;
let updateTodo = require('../controllers/create_update_delete_todo').updateTodo;
let deleteTodo = require('../controllers/create_update_delete_todo').deleteTodo;
const {filterByDate} =  require('../controllers/filter_by_date')

dotenv.config();

//set query functions
//let createTodo = query.createTodo;
// let queryTodo = query.queryTodo;
// let queryTodos = query.queryTodos;
// let deleteTodo =query.deleteTodo;


//middle ware
router.post("/signup", async (req, res) => {
    // check for req body content and validate it against expected key-value pairs
    let { error } = validateData(req.body);
    if(error) {
        res.status(400).send(`${error.details[0].message}: ` + "check your entries again");
        return;
    }

    // create user since the entries are valid and hash password
    await createUser(req, res);

})

router.post("/login", async(req, res) => {
    // authenticate the request body
    // return res.send(req.body);
    let { error } = await validateLogin(req.body);
    if(error) return res.status(403).send(`${error.details[0].message}: incorrect login details`);


    // check for email
    let userEmail = await User.findOne({where:{email: req.body.email}});
    if(!userEmail) return res.status(402).send("Email or password is incorrect");
    // if email is valid, compare password using bcrypt
    let validPassword = await bcrypt.compare(req.body.password, userEmail.password);
    if(!validPassword) return res.status(401).send("Email or password is incorrect");
    // create jwt token for authentication of user
    try{
        let findId = await User.findOne({where: {
            userid: userEmail.userid
        }});
        await console.log(findId);
        let token = await jwt.sign({id: findId.userid}, process.env.SECRET_KEY);
        //req.header('Access-Control-Expose-Headers', 'auth-token').header('auth-token', token);
        res.header('auth-token', token).status(200).send(`${token}`);
    } catch(error) {
        res.status(401).send("Access denied ", error.message);
    }
     
})

router.post('/todos', verifyToken, (req, res, next) => {
    // return res.send(req.body);
    //res.json({id: `${req.user.id} ${req.body.todo} ${req.body.status}`});
    createTodo(req.user.id, req.body.todo, req.body.status, req, res);


})

router.get("/todos", verifyToken, async(req, res, next) => {
    // get the req queries and convert to integers
    let convertedPage = parseInt(req.query.page);
    let convertedSize = parseInt(req.query.size);

    let defaultSize = 10;
    let defaultPage = 0;
    if(!isNaN(convertedPage) && convertedPage > 0){
        defaultPage = convertedPage;
    }

    if(!isNaN(convertedSize) && convertedSize > 0 && convertedSize < 5){
        defaultSize = convertedSize;
    }

    let currentUser = await User.findOne({where:{userid:req.user.id}});
    let userid = await currentUser.userid;
    // res.send(userid);

    try{
        let userTodos = await Todo.findAndCountAll( {where:{ userid },
            limit: defaultSize, 
            offset: defaultPage * defaultSize
        } 
        );

        const pageContent = {content:userTodos.rows, pageCount : Math.ceil(userTodos.count / defaultSize)}
        res.json(pageContent);
    }
    catch(err){
        res.status(404).send("Cant find Todos for this current user");
    }
    //TODO: Validate req body
    
    //TODO: GET the email from the req.user.email param

    //TODO: query DB to get the todo items

    //TODO: check if the first item is null. if true, replace null with todo item, else just push the todo item

    //TODO: return the todo item that has been added
    
})



//TO EDIT A SINGLE TODO ITEM

router.patch('/todos/:id', verifyToken, async (req, res) => {
    let currentUser = await User.findOne({where:{userid:req.user.id}});
    let userid = currentUser.userid;
    let id = req.params.id;

    updateTodo(id, userid, req.body.todo, req.body.status, req, res);
});

router.delete('/todos/:id', verifyToken, (req, res) => {
    //res.send("deleting");
    let id = req.params.id;
    let userid = req.user.id;
    deleteTodo(id, userid, res);
});  

router.get('/todos/filter', verifyToken, async(req, res) => {
    let date = new Date();
    let defaultDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    // res.send("YOO");
    let userid = req.user.id;
    let startDate = req.query.startDate;
    let endDate = req.query.endDate || defaultDate;
    if(startDate && endDate){
       const items = await filterByDate(userid, startDate, endDate);
       return res.json(items)
    } 
   return  res.status(500).send('Enter start and end date query');
    
})

//TO GET A SINGLE TODO ITEM USING THE TODO ITEM ID FROM PARAMS

router.get('/todos/:id', verifyToken, async (req, res) => {
    let todoid = req.params.id;
    let currentUser = await User.findOne({where:{userid:req.user.id}});
    let userid = currentUser.userid;
    console.log(todoid);
    if(todoid){
        try{
            let todo = await Todo.findOne({where:{id: todoid, userid:userid}});
            res.status(200).send(todo);
        } catch (err){
            res.status(404).send(`${err}: `+"Item not found");
        }
    }

})

module.exports = router;