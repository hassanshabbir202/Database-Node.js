const http = require("http");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname,"formdata.txt");

const server = http.createServer((req,res)=>{
    if(req.url === "/"){
        res.write("Welcome User!");
        res.end();
    }else if(req.url === "/error"){
        res.write("404 Not Found");
        res.end();
    }else if(req.url === "/signupform"){
        res.setHeader("Content-Type" , "text/html");
        res.write("<form action='/submit' method='POST'><label>Username</label><br/><input name='username' autoComplete='off'/><br/><label>Password</label><br/><input name='password' autoComplete='off'/><br/><button>Submit</button></form>")
        res.end();
    }else if(req.url === "/submit"){
        let data = "";
        req.on("data" , (chunk)=>{
            data += chunk
        });
        req.on("end" , ()=>{
            fs.readFile("formdata.txt",'utf-8',(err,oldData)=>{
                const allData = oldData + "\n" + data
                fs.writeFile(filePath,allData,()=>{
                    console.log(allData);
                });
            })
        });
        res.write("Sign Up Successfully!");
        res.end();
    }

});

server.listen(5000);