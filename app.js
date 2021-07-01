//jshint esversion:6
const express=require("express");
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
const https=require("https"); 



app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    
})
app.post("/",function(req,res){
    
    const query=req.body.cityName;
    const apiKey="1a1bd9753f4eaa387b87a9232764d4e7";
    const unit="metric";
    const  url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apiKey;
    https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
        const weatherData=JSON.parse(data);
        const temp=weatherData.main.temp;
        const weatherDescription=weatherData.weather[0].description;
        const icon=weatherData.weather[0].icon;
        const img= "http://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.write("<h1>The weather is "+temp+" degree celcius</h1>");
        res.write("<h1>The weather description: " +weatherDescription+"</h1>");
        res.write("<img src="+img+">");
        res.send()
    })
});
})



app.listen(3000,function(){
    console.log("server is running");
})


