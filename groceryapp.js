
const express = require('express')
const app = express()
let models = require('./models')
//var session = require('express-session')
const promise = require('bluebird') //provides a promose-pg architecture

let options =
{
  promiseLib: promise
} //specifies that bluebird is used as promise library

let pgp = require('pg-promise')(options)
let connectionString = 'postgres://localhost:5432/grocery'
let db = pgp(connectionString)


console.log(db)

//variables
//let groceries = []

// setting up middleware to use the session
//app.use(session({
  //secret: 'guest',
  //resave: true,
 // saveUninitialized: true
//}))

// body parser for parsing JSON
var bodyParser = require('body-parser')
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//

// this means localhost:3000/site.css will work
app.use(express.static('styles'))


var mustacheExpress = require('mustache-express');

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress())

app.set('view engine', 'mustache')

app.set('views', './views')

//Calling homepage

app.get('/home',function(req,res){
  res.render('home')
})

//Posting to shoplist route

app.post('/shoplist',function(req,res){

  const shoppinglist = models.ShoppingList.build({

    shoppinglist: req.body.shoppinglist,
})

shoppinglist.save().then(function(newShop){
  res.redirect('/shoplist')
  console.log(newShop)
  })
  })

//Calling shoplist route

app.get('/shoplist', function(req, res){

  let shoppingListId = req.params.shoppingListId

  res.render('addItem', {shoppingListId : shoppingListId})
})

//Calling shoplist/:id route

app.get('/shoplist/:shoppingListId', function(req, res){

  let shoppingListId = req.params.shoppingListId

  models.shoppinglist.findOne({
    where: {
    shoppingListId: req.params.shoppingListId
    }
  }).then(function(listid){
    res.json(listid)
  })

  res.render('addItem' , {shoppingListId : shoppingListId})
})


//Posting groceryitems route

app.post('/groceryitems',function(req,res){

  const groceryitem = models.GroceryItem.build({

        item: req.body.item,
        quantity: req.body.quantity,
        price: req.body.price,
        shoppingListId: parseInt(req.body.shoppingListId)
    
})
  groceryitem.save().then(function(newItem){
  
    // redirect to the home page
  res.redirect(`/groceryitems/${shoppingListId}`)
  console.log(newItem)
  })
})

//Calling groceryitem route

app.get('/groceryitems', function(req, res){

  models.groceryitems.findAll({
    where: {
    shoppinglist: req.params.shoppinglist
    }
  }).then(function(grocery){
    res.json(grocery)
  })

  res.render('home' , {shoppinglist : shoppinglist, groceryitem})
})


app.listen(3000, () => console.log('Example app listening on port 3000!'))




