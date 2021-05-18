const express = require('express')
const faker = require('faker')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const sql = require('mssql')


// Configuração
const app = express()
const port = process.env.PORT || 5000
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'))
app.listen(port, () => {
  console.log(`Node Web Server is running.. 
  http://localhost:${port}`)
})

// Configuração de banco de dados
const configBD = {
  user: 'filipeluiz',
  password: '@patofeio20',
  server: 'filipeluiz.database.windows.net',
  database: 'Banco de dados 2'
}

// Rotas
app.get('/', (req, res) => {
  res.render('home')
})

app.get('/clientes-visualizacao', (req, res) => {

  sql.connect(configBD, err => {
    if(err) console.log('Error: ' + err)
  
    let sqlRequest = new sql.Request()
  
    let sqlQuery = 'SELECT * FROM Customers'
  
    sqlRequest.query(sqlQuery, (err, data) => {
      let customers = data.recordset
      res.render('clientes/view', { customers })
      sql.close()
    })
  })   
})

app.get('/clientes-insercao', (req, res) => {
  res.render('clientes/insert')
})

app.post('/clientes-info', (req, res) => { 
  let info = {
    id: req.body.CustomerID, 
    companyName: req.body.CompanyName, 
    contactName: req.body.ContactName, 
    contactTitle: req.body.ContactTitle, 
    address: req.body.Address, 
    city: req.body.City, 
    region: req.body.Region,
    postalCode: req.body.PostalCode, 
    country: req.body.Country, 
    phone: req.body.Phone, 
    fax: req.body.Fax 
  }

  sql.connect(configBD, err => {
    if(err) console.log('Error: ' + err)
  
    let sqlRequest = new sql.Request()
  
    let sqlQuery = `INSERT INTO Customers ( CustomerID, CompanyName, ContactName, ContactTitle, Address, City, Region, PostalCode, Country, Phone, Fax )
                    VALUES('${info.id}', '${info.companyName}', '${info.contactName}', '${info.contactTitle}', '${info.address}', '${info.city}', '${info.region}', '${info.postalCode}', '${info.country}', '${info.phone}', '${info.fax}')`
  
   
    sqlRequest.query(sqlQuery, (err, data) => {
      if(err) {
        res.render('clientes/info', { msg: err })
      } 
      else {    
        res.render('clientes/info', { msg: 'Cadastro com sucesso' })
      }
    })
  })   
})

app.get('/clientes-delete', (req, res) => {
  res.render('clientes/delete')
})

app.post('/clientes-delete', (req, res) => {

  sql.connect(configBD, err => {

    if(err) console.log('Error: ' + err)
  
    let sqlRequest = new sql.Request()

    let sqlQuery = `DELETE FROM Customers WHERE CustomerID = '${req.body.id}'` 

    sqlRequest.query(sqlQuery, (err, data) => {
      if(err) {
        res.render('clientes/info', { msg: err })
      } 
      else {
        res.render('clientes/info', { msg: 'Deletou com sucesso' })
      }
      sql.close()
    })
  })     
})

// Faltou atualizar os clientes

app.get('/compras-visualizacao', (req, res) => {
  sql.connect(configBD, err => {
    if(err) console.log('Error: ' + err)
  
    let sqlRequest = new sql.Request()
  
    let sqlQuery = 'SELECT * FROM [Order Details]'
  
    sqlRequest.query(sqlQuery, (err, data) => {
      let orders = data.recordset
      res.render('compras/view', { orders })
      sql.close()
    })
  })   
})
