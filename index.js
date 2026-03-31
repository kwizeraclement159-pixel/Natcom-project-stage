// const express=require("express");
// const app=express();
// const dotenv=require("dotenv");
// dotenv.config();
// const cors=require("cors");
// const PORT=process.env.PORT;
// const mysql=require("mysql2");
// app.use(cors());
// app.use(express.json());

// const db=mysql.createConnection({
//     host:process.env.DB_HOST,
//     user:process.env.DB_USER,
//     password:process.env.DB_PASSWORD,
//     database:process.env.DB_NAME
// });

// db.connect((err)=>{                     
//     if(err){
//         console.log("Database connection failed:", err);
//     }else{
//         console.log(" Connected to MySQL database (user)");
//     }   
// }) ;

// const name="kwizera";
// app.post("/add",(req,res)=>{    
// const {name}=req.body.name;
// console.log(name);
// })


// app.get("/",(req,res) => {
//     res.send("Welcome to the backend server!");
// })


// app.listen(PORT, ()=>{
//     console.log(`Server is running on port ${PORT}`);
// })





const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv")
dotenv.config();
const mysql=require("mysql2")
const PORT=process.env.PORT
const app=express();
const db=mysql.createConnection({
    host:process.env.D_HOST,
    user:process.env.D_USER,
    password:process.env.D_PASSWORD,
    database:process.env.D_DB
})

db.connect((err)=>{
    if(err){
        console.log("faile to connect");
    }else{
        console.log("success");
    }
});


app.use(cors());
app.use(express.json());





app.post("/add", ( req, res )=>{
    const {Name , Password} =req.body;
    const sql="INSERT INTO `users` VALUES ('',?,?)";
    db.query(sql,[Name , Password ], (err) =>{

        if(err){
            // console.log("failed to insert user");
            throw err
        }else{
            console.log("insert succeed");
        }
    })
}) ;

app.get("/" , ( req ,res)=> {
    const  {Name,Password}=req.body;
    const {id}=req.params;
    const sql="SELECT * FROM users";
    db.query(sql,[id,name,password],(err,result)=>{
     if(err){
        console.log("failed to fetch");
     }else{
        console.log(result);
     }
    });
});

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});


