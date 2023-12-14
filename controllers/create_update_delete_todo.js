const { func } = require('joi');
let Todo = require('../models/todo');
let validateTodo = require('../validate').validateTodo;

module.exports.CreateTodo =  async function(userid, todo, status, req, res) {
    let data = {userid, todo, status};
    // res.json(data);
    let { error } = await validateTodo(data);
    if (error) return res.status(401).send(error.details[0].message);
    try{
        await Todo.create({userid, todo, status}).then(() => {res.send(data)}).catch((err) => {res.send(`${err}: `+"can't create a todo item")})
    }catch(err){
        console.log("CREATION FAILED");
        res.status(400);
    }
    
};

module.exports.updateTodo = async function(id, userid, todo, status, req, res) {
    const updatedValue = {todo, status};
    let data = {userid, todo, status}
    let {error} = await validateTodo(data);
    

    if (error) return res.status(401).send(error.details[0].message);
    try{
        await Todo.update(updatedValue, {where:{
                id:id, userid:userid
        }}
    ).then(() =>  res.send(updatedValue)).catch((err) => (res.send("update failed")))} catch(err){
        res.send(`${err}: Could not update item`);
    }

    
}

module.exports.deleteTodo = async function(id, userid, res) {

    try{
        await Todo.destroy( {where:{
                id:id, userid:userid
        }}
    ).then(() =>  res.send("delection successful...")).catch((err) => (res.send("deletion failed..")))} 
    catch(err){
        res.send(`${err}: Could not delete item`);
    }

    
}