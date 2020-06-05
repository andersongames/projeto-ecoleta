const express = require("express")
const server = express()

//importar o db
const db = require("./database/db")

//configurar pasta pública
server.use(express.static("public"))

//utilizando template engines
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurar caminhos  da aplicação
//página inicial
server.get("/", (req, res) => {
    return res.render("index.html")
})

//create-point
server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

//search-results
server.get("/search", (req, res) => {

    //pegar os dados ddo banco de dados
    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        const total = rows.length

        console.log("Aqui estão seus registros: ")
        console.log(rows)
        
        //mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total })
    })
})

//ligar o servidor
server.listen(3000)