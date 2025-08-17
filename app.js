const express= require("express");
const https= require("https");
const bodypar=require("body-parser")
const date=require(__dirname+"/date.js")

const app= express();
app.set('view engine','ejs');
var items=[" "];
var work=[]


app.use(bodypar.urlencoded({extended : true}));
app.use(express.static("public"))// no public in href of ejs added as already directed
app.get("/",function(req,res){
 
    var day=date.Date()
     res.render("list",{day:day,item:items})
})

app.post("/",function(req,res){
   var item= req.body.item;
   if(req.body.submit==="work"){
    work.push(item);
    res.redirect('/work')
   }
   else{
   items.push(item)
   res.redirect('/') // sara render sath hi krna hota h to ye phle info store krlega fir redirect krega fir poora render hoga 
   }
})

app.get("/work",function(req,res){
    res.render("list",{day:"work",item:work})
})

app.get("/about",function(req,res){
    res.render("about")
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// submit ki value hmne tittle ki equal daldi
