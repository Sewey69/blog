import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";import cors from 'cors';


const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 3000; 

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

app.get("/", (req,res) =>{
    res.render("index.ejs",{
        blogs : blogEntries,
    });
});

app.get("/about", (req,res) =>{
    res.render(__dirname + "/views/partials/about.ejs");
});

app.get("/contact", (req,res) =>{
    res.render(__dirname + "/views/partials/contact.ejs");
});

app.listen(port , ()=>{
    console.log("server is working!");
})

//start of the complexed stuff
let blogEntries = [];

app.post("/publish", (req,res) =>{

    const newBlog = req.body["blog"];
    blogEntries.push(newBlog);

    res.redirect("/");
});

app.delete("/delete", (req,res) =>{
    const blogToDelete = req.body.blog;
    blogEntries = blogEntries.filter(blog => blog !== blogToDelete);
    res.status(200).send(); 
    console.log("Remaining blogs:", blogEntries);
});

app.patch("/patch", (req, res) => {
    const { oldBlog, newBlog } = req.body;
    const index = blogEntries.indexOf(oldBlog);

    if (newBlog) {
        console.log(newBlog);
        blogEntries[index] = newBlog; 
        console.log(blogEntries);
        res.redirect("/");
    } else {
        res.status(400).send('Blog entry not found or new content not provided'); 
    }
});