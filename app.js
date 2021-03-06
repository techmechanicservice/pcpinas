const path = require("path")
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
// const expressValidator = require("express-validator");
const { getCollection } = require("./src/collections/mongo")
const collectionNames = require("./src/collections/names")

app.use(bodyParser.json())
// app.use(expressValidator());
app.use(cors())

app.use("/api", require("./src/routes/auth")) //auth router
// app.use("/api", require("./src/routes/user")); //user router
app.use("/api", require("./src/routes/categories")) //category router
app.use("/api", require("./src/routes/products")) //category router
// app.use("/api", require("./src/routes/product")); //product router

// if (process.env.NODE_ENV === "production") {
// 	console.log("production")
// 	app.use(express.static("client/build"))
// } else {
// 	console.log("development")
// }
app.use(express.static(path.join(__dirname, "client", "build")))

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})

//initialize all app collections
const collectionPromises = collectionNames.map(collectionName => {
	return getCollection(collectionName)
})

Promise.all(collectionPromises)
	.then(() => {
		const port = process.env.PORT || 8000

		app.listen(port, () => {
			console.log("--------------------------------------------------------")
			console.log(`server is running on port ${port}`)
		})
	})
	.catch(error => console.log("**ERROR**", error))

//init collections
