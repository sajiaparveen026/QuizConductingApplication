const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require("bcrypt");
const salt = 10;

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"",
        database:"myquizapp"
    }
)

// Admin work API's

// Admin Signup Api
app.post("/admin_signup",(req,res)=>{
  bcrypt.hash(req.body.admin_password,salt,(err,hash)=>{
    if(err)
    {
      console.log("Error");
    }
    db.query(`INSERT INTO admin(admin_name,admin_email,admin_password) VALUES(?,?,?)`,
    [req.body.admin_name,req.body.admin_email,hash],(err,result)=>{
      if (err) {console.error("MySQL Error:", err); return res.json({ Status: false, Error: "Query Error" });  }
      return res.json({ Status: true }); });
  })
  })


// Admin log in api
app.post('/admin_login', (req, res) => {
  const email = req.body.admin_email;
  const password=req.body.admin_password;

  db.query("SELECT * FROM admin WHERE admin_email = ?", [email], (err, data) => {
    if (err) { console.error("MySQL Error:", err);return res.json({ Status: false, Error: "Query Error" });
    }
    if (data.length > 0) {
      bcrypt.compare(password,data[0].admin_password,(err,response)=>{
        if(err)
        {
          return res.json("Error");
        }
        return res.json({ Status: true});
      })
     
    }
    else {  return res.json({ Status: false, Error: "Invalid credentials" }); }
    });
});

// Post Category to database
app.post('/add_categories', (req, res) => {
    db.query("INSERT INTO category (`category_name`) VALUES (?)", [req.body.category], (err, result) => {
      if (err) { console.error("MySQL Error:", err);
        return res.json({ Status: false, Error: "Query Error" });  }
      return res.json({ Status: true }); }); 
    });

 //  Get Category from database    
app.get('/category',(req,res)=>{
  db.query("SELECT * from category",(err,result)=>{
    if (err) { console.error("MySQL Error:", err);
      return res.json({ Status: false, Error: "Query Error" });  }
    return res.json({ Status: true ,Result:result}); })
})

// Post quiz data to database
app.post("/create_quiz",(req,res)=>{
  db.query(`INSERT INTO quiz(question_name,option1,option2,option3,option4,category_id,correct)
  VALUES(?,?,?,?,?,?,?)`,[req.body.question_name,req.body.option1,req.body.option2,req.body.option3,req.body.option4,req.body.category_id,req.body.correct],(err,result)=>{
    if (err) {console.error("MySQL Error:", err); return res.json({ Status: false, Error: "Query Error" }); 
   }return res.json({ Status: true }); });
})
  
// Get Quiz details from Database
app.get('/getquiz',(req,res)=>{
  db.query("SELECT quiz.*, category.category_name     FROM quiz     LEFT JOIN category ON quiz.category_id = category.category_id     ORDER BY category.category_name",(err,result)=>{
    if (err) {console.error("MySQL Error:", err);return res.json({ Status: false, Error: "Query Error" });
   } return res.json({ Status: true ,Result:result}); })
})

// Get quiz from database with its id
app.get('/getquiz/:id',(req,res)=>{
 const id = req.params.id;
 db.query("SELECT * FROM quiz WHERE question_id = ?",[id],(err,result)=>{
  if (err) {console.error("MySQL Error:", err);return res.json({ Status: false, Error: "Query Error" }); 
 } return res.json({ Status: true ,Result:result});})
})

// update quiz into database
app.put('/edit_quiz/:id', (req, res) => {
const id = req.params.id;
  const Values = [
    req.body.question_name, req.body.option1, req.body.option2, req.body.option3,
    req.body.option4, req.body.correct, id ];

  db.query(
    'UPDATE quiz SET question_name=?, option1=?, option2=?, option3=?, option4=?, correct=? WHERE question_id=?',
    Values,
    (err, result) => {
      if (err) { console.error("MySQL Error:", err); return res.json({ Status: false, Error: "Query Error" });
      }
      return res.json({ Status: true, Result: result }); } );
});


//Delete Quiz into database
app.delete('/delete_quiz/:id',(req,res)=>{
  const id = req.params.id;
  db.query('DELETE FROM quiz WHERE question_id = ?',[id],
  (err,result)=>{
    if (err) {console.error("MySQL Error:", err);return res.json({ Status: false, Error: "Query Error" });
    } return res.json({ Status: true, Result: result }); })
})


//Fetching Student Count
app.get('/student_count',(req,res)=>{
  db.query('SELECT count(student_id) as student from student',
  (err,result)=>{
    if (err) {console.error("MySQL Error:", err);return res.json({ Status: false, Error: "Query Error" });
    } return res.json({ Status: true, Result: result }); })
})

//Fetching admin Count
app.get('/admin_count',(req,res)=>{
  db.query('SELECT count(admin_id) as admin from admin',
  (err,result)=>{
    if (err) {console.error("MySQL Error:", err);return res.json({ Status: false, Error: "Query Error" });
    } return res.json({ Status: true, Result: result });
  })
})

//Fetching quiz Count
app.get('/quiz_count',(req,res)=>{
  db.query('SELECT count(question_id) as quiz from quiz',
  (err,result)=>{
    if (err) { console.error("MySQL Error:", err); return res.json({ Status: false, Error: "Query Error" });
    } return res.json({ Status: true, Result: result }); })
})

// Fetch Admin Records
app.get('/admin_records',(req,res)=>{
  db.query('select * from admin',(err,result)=>{
    if (err) {console.error("MySQL Error:", err);return res.json({ Status: false, Error: "Query Error" });
    } return res.json({ Status: true, Result: result });
  })
})

// Fetch Student Records
app.get('/get_student',(req,res)=>{
  db.query('select * from student',(err,result)=>{
    if (err) {console.error("MySQL Error:", err); return res.json({ Status: false, Error: "Query Error" });
    }return res.json({ Status: true, Result: result });})
})

//Delete student from database
app.delete('/delete_student/:id',(req,res)=>{
  const id = req.params.id;
  db.query('DELETE FROM student WHERE student_id = ?',[id],
  (err,result)=>{
    if (err) {console.error("MySQL Error:", err);return res.json({ Status: false, Error: "Query Error" });
    }return res.json({ Status: true, Result: result }); })
})


// Student API's

// Student sign up api
app.post("/signup",(req,res)=>{
  bcrypt.hash(req.body.student_password,salt,(err,hash)=>{
    if(err)
    {
      console.log("Error");
    }
    db.query(`INSERT INTO student(student_name,student_email,student_password) VALUES(?,?,?)`,
    [req.body.student_name,req.body.student_email,hash],(err,result)=>{
      if (err) {console.error("MySQL Error:", err); return res.json({ Status: false, Error: "Query Error" });  }
      return res.json({ Status: true }); });
  })
  })


// student login Api
app.post('/student_login', (req, res) => {
  const email = req.body.student_email;

  db.query("SELECT * FROM student WHERE student_email = ?", [email], (err, data) => {
    if (err) { console.error("MySQL Error:", err);return res.json({ Status: false, Error: "Query Error" });
    }
    if (data.length > 0) {
      bcrypt.compare(req.body.student_password,data[0].student_password,(err,response)=>{
        if(err)
        {
          return res.json("Error");
        }
        const id = data[0].student_id; 
        return res.json({ Status: true, Result: id });
      })
     
    }
    else {  return res.json({ Status: false, Error: "Invalid credentials" }); }
    });
});

//Fetching category Count
app.get('/category_count',(req,res)=>{
  db.query('SELECT count(category_id) as category from category',
  (err,result)=>{
    if (err) {console.error("MySQL Error:", err);return res.json({ Status: false, Error: "Query Error" });
    }return res.json({ Status: true, Result: result });})
})

//Fetching Attempt Count
app.get('/attempt_count/:id',(req,res)=>{
  const student_id = req.params.id;

  db.query(
    `SELECT COUNT(*) AS attempt_count FROM testreport WHERE student_id = ?`,
    [student_id],
    (err, result) => {
      if (err) {console.error("MySQL Error:", err);return res.json({ Status: false, Error: "Query Error" });
      } return res.json({ Status: true, Result: result[0].attempt_count }); });
})

//Fetching Question Count
app.get('/question_count',(req,res)=>{
  db.query('SELECT count(question_id) as quiz from quiz',
  (err,result)=>{
    if (err) {console.error("MySQL Error:", err);return res.json({ Status: false, Error: "Query Error" });
    }return res.json({ Status: true, Result: result });})
})

// Fetch Student Record
app.get('/student_detail/:id', (req, res) => {
  const {id} = req.params;
 
  db.query('SELECT * FROM student WHERE student_id = ?', [id], (err, result) => {
    if (err) {console.error("MySQL Error:", err);return res.json({ Status: false, Error: "Query Error" });
    }
    if (result.length > 0) {return res.json({ Status: true, Result: result }); }
     else { return res.json({ Status: false, Error: "Student not found" });} });
});

// Get student from database with its id
app.get('/getstudent/:id',(req,res)=>{
  const id = req.params.id;
  db.query("SELECT * FROM student WHERE student_id = ?",[id],(err,result)=>{
   if (err) { console.error("MySQL Error:", err); return res.json({ Status: false, Error: "Query Error" }); 
   }return res.json({ Status: true ,Result:result});})
 })

 // update profile into database
app.put('/edit_profile/:id', (req, res) => {
  const {id} = req.params;
    const Values = [ req.body.student_name, req.body.student_email, id ];
  
    db.query( 'UPDATE student SET student_name=?, student_email=? WHERE student_id=?', Values,
      (err, result) => {
        if (err) { console.error("MySQL Error:", err); return res.json({ Status: false, Error: "Query Error" });
        } return res.json({ Status: true, Result: result });});
  });
  

  // count total question in each category
  app.get('/question_count/:id',(req,res)=>{
    const id = req.params.id;
    db.query(`SELECT category.category_id,category.category_name, COUNT(quiz.question_id) AS question_count FROM category LEFT JOIN quiz ON category.category_id = quiz.category_id WHERE category.category_id = ? GROUP BY category.category_id, category.category_name`,[id],(err,result)=>{
     if (err) {console.error("MySQL Error:", err);return res.json({ Status: false, Error: "Query Error" });
      } return res.json({ Status: true ,Result:result});})
   })

   //get Questions from database
  app.get('/get_question/:id',(req,res)=>{
    const id = req.params.id;
    db.query(`SELECT * from quiz where category_id=?`,[id],(err,result)=>{
     if (err) {console.error("MySQL Error:", err);return res.json({ Status: false, Error: "Query Error" }); 
     }return res.json({ Status: true ,Result:result});})
   })

   // store result to database
   app.post('/save_result',(req,res)=>{
    db.query(`INSERT INTO testreport(student_id,category_id,total_correct,total_questions,percentage)
    VALUES(?,?,?,?,?)`,[req.body.student_id,req.body.category_id,req.body.total_correct,req.body.total_questions,req.body.percentage],(err,result)=>{
      if (err) {console.error("MySQL Error:", err);return res.json({ Status: false, Error: "Query Error" });
      }return res.json({ Status: true });});
   })

   //fetch report from database
   app.get('/get_report/:id',(req,res)=>{
    const {id} = req.params;
    db.query(
      `SELECT testreport.category_id, category.category_name, testreport.total_correct, testreport.total_questions, testreport.percentage FROM testreport JOIN category ON testreport.category_id = category.category_id WHERE testreport.student_id = ?`,
      [id],
      (err, result) => {
        if (err) {console.error("MySQL Error:", err);return res.json({ Status: false, Error: "Query Error" });
        }return res.json({ Status: true, Result:result });});
  })
  
app.listen(3001,()=>{
    console.log("listening");
})