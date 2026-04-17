//DECLARING VARIABLE HOLDING LIBRARIES

const express=require("express");
const cors=require("cors");


const mysql=require("mysql2");
const app=express();

// CONFIGURING DOTENV LIBRARY
const dotenv=require("dotenv");
const PORT=3000;
dotenv.config();

//CONNECTION CREATION

const db=mysql.createConnection({
    host:process.env.D_HOST,
    user:process.env.D_USER,
    password:process.env.D_PASSWORD,
    database:process.env.D_DB
})

//CONNECTION TESTING
db.connect((err)=>{
    if(err){
        console.log("faile to connect");
    }else{
        console.log("success");
    }
});

//ALLOWING BACKEND TO USE CORS AND JSON FORMAT

app.use(cors());
app.use(express.json());


//ADD/CREATE USER

app.post("/add", ( req, res )=>{
    const {Name , Password} =req.body;
    const sql="INSERT INTO `users` VALUES ('',?,?)";
    db.query(sql,[Name , Password ], (err,result) =>{

        if(err){
            console.log("failed to insert user");
        
        }else{
            console.log("insert succeed");
            res.json(result);
        }
    })
}) ;

//READ USERS
app.get("/all" , ( req ,res)=> {
    const sql="SELECT * FROM users";
    db.query(sql,(err,result)=>{
     if(err){
        console.log("failed to fetch");
     }else{
        console.log(result);
         res.json(result); 
     }
    });
});

//UPDATE USER
app.put("/update/:id", (req, res) => {
    const { name, password } = req.body;
    const { id } = req.params;

    const sql = "UPDATE users SET Name=?, Password=? WHERE id=?";

    db.query(sql, [name, password, id], (err, result) => {
        if (err) {
            console.log("failed to update:", err);
            res.status(500).json("failed");
        } else {
            console.log("updated:", id);
            res.json(result);
        }
    });
});
//DELETE USER
app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM users WHERE id=?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log("failed to delete:", err);
            res.status(500).json("failed");
        } else {
            console.log("deleted:", id);
            res.json(result);
        }
    });
});


//SERVER STARTING PORT
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});

//END OF PROGRMM BACKEND
