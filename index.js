import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"
dotenv.config()

import { db } from "./util/FirebaseInit.js";
import { collection, getDocs, orderBy, query, limit, addDoc } from "firebase/firestore"

const app = express()
const port = 8080;

app.use(express.json())
app.use(
	cors({
		origin: "http://localhost:3000"
	})
)
app.use(bodyParser.urlencoded({ extended: false }))

// Create a route at http://localhost:8080/testRoute. You can try it with your browser!
app.get("/", async (req, res) => {
	res.send("Hello World!");
});

app.get("/high-scores", async (req, res) => {
	const scoresRef = collection(db, "math-scores");
	const q = query(scoresRef, orderBy("Score", "desc"), limit(10));
	const top10 = await getDocs(q)
	let docs = []
	top10.forEach( (doc) => {
		docs.push(doc.data())
	})
	res.send(docs)
})

app.get("/get-rank", async (req, res) => {
	if (!req.query.score) {
		res.send({
			
		})
	}
	const scoresRef = collection(db, "math-scores");
	const q = query(scoresRef, orderBy("Score", "desc"));
	const docs = await getDocs(q)
	let docList = []
	docs.forEach( (doc) => {
		docList.push(doc.data().Score)
	})
	for (let i = 0; i < docList.length; i++) {
		if (req.query.score == docList[i]) {
			res.send({
				rank: i+1
			})
			return
		}
	}
	res.send({
		error: "Score not found"
	})
})

app.post("/submit-score", async (req, res) => {
	if (!req.query.score) {
		res.send({
			error: "Score was not specified"
		})
		return
	}
	const scoresRef = collection(db, "math-scores");
	const date = new Date()
	const id = await addDoc(scoresRef, {
		Date: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`,
		Score: Number(req.query.score)
	})
	res.send(id)
})

app.post("/test", async (req, res) => {
	res.send("worked")
})

function start() {
	app.listen(port, () => {
		console.log(`Started listening on http://localhost:${port}. Try clicking on this link!`)
	})
}

start()
