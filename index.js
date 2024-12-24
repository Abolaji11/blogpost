import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', './views'); 

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

 let posts = [];
 let id = 1;



app.get('/', (req, res) => {
   //res.render("index.ejs");
   res.render('index', { posts });

});


app.get('/create', (req, res) => {
    res.render("create");
 
 });

 app.post('/create', (req, res) => {
    const post = { id:id++, title: req.body.title, content: req.body.content, author: req.body.author};
    posts.push(post);
    res.redirect("/")
 
 });

 app.get('/edit/:id', (req, res) => {
const post = posts.find(p => p.id === parseInt(req.params.id));
if (post){
res.render('edit', {post});

}else{
    res.status(404).send('post not found');}
 
 });


 app.get('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (post){
    res.render('post', {post});
    
    }else{
        res.status(404).send('post not found');}
     
     });


 app.post('/edit/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (post){
        post.title = req.body.title;
        post.content = req.body.content;
        post.author = req.body.author;
        res.redirect("/")
    
    }else{
        res.status(404).send('post not found');}    
 });

app.post('/delete/:id', function(req, res) {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (post){
        const index = posts.indexOf(post);
        posts.splice(index, 1);
        res.redirect("/")
    }else{
        res.status(404).send('post not found');}
    });


app.listen(port, () => {
    console.log(` app listening at http://localhost:${port}`)
})