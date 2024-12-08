import express from 'express';
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const STUDENTS = [
    {
        rollNo:1,
        name:"Piyush Aglawe",
        city:"Pune",
    },
    {
        rollNo:2,
        name:"Piyush",
        city:"Pune",
    },
    {
        rollNo:3,
        name:"Shravan",
        city:"Pune",
    },
    {
        rollNo:4,
        name:"Abhijit",
        city:"Nagpur",
    },
    {
        rollNo:5,
        name:"Harshal",
        city:"Nagpur",
    }
]

//HEALTH API
app.get("/health",(req, res)=>{
    res.status(200).json({
        success:true,
        message:"Server is running"
    })
});

//GET ALL STUDENTS DATA
app.get("/students",(req,res)=>{
    res.json({
        success:true,
        data:STUDENTS,
        message:"Students Fetched Successfully"
    })
});

//ADD STUDENT DATA
app.post("/students",(req,res)=>{
    const {rollNo, name, city} = req.body;
    //validation
    if(!rollNo){
       return res.status(400).json({
            success:false,
            message:"Roll No is Required",
        });
    }
    if(!name){
        return res.status(400).json({
             success:false,
             message:"Name is Required",
         });
     }
     if(!city){
        return res.status(400).json({
             success:false,
             message:"City is Required",
         });
     }
    
     const studentWithRollNo = STUDENTS.find((stud)=>{
       if(stud.rollNo == rollNo){
        return stud;
       }
     })
     if(studentWithRollNo){
        return res.status(400).json({
            success:false,
            message:"Student With this roll no already exits",
        });
     }

    const student = {
        rollNo,
        name,
        city
    };
    STUDENTS.push(student);
    return res.status(201).json({
        success:true,
        data:student,
        message:"Student added successfully",
    });
});

//DELETE STUDENT
app.delete("/students/:rollNo",(req,res)=>{
    const {rollNo} = req.params;
    let studentIndex = -1;

    STUDENTS.map((stud,index)=>{
        if(stud.rollNo == rollNo){
            studentIndex = index;
        }
    })

    if(studentIndex == -1){
        return res.json({
            success:false,
            message:"Student not found",
        })
    }
    STUDENTS.splice(studentIndex, 1);
    res.json({
        success:true,
        message:"Student Deleted Successfully",
    });
});

//UPDATE STUDENTS
app.put("/students/:rollNo",(req,res)=>{
    const {rollNo} = req.params;
    const {name,city} = req.body;

    let studentIndex = -1;

    STUDENTS.map((stud,index)=>{
        if(stud.rollNo == rollNo){
            studentIndex = index;
        }
    })

    if(studentIndex == -1){
        return res.json({
            success:false,
            message:"Student not found",
        })
    } 

    const student = {
        rollNo,
        name,
        city,
    }

    STUDENTS[studentIndex] = student;
    res.json({
        success:true,
        data:student,
        message:"Student Update Successfully",
    })
})

//PATCH STUDENTS
app.patch("/students/city/:rollNo",(req,res)=>{
    const {rollNo} = req.params;
    const {city} = req.body;

    let studentIndex = -1;

    STUDENTS.map((stud,index)=>{
        if(stud.rollNo == rollNo){
            studentIndex = index;
        }
    })

    if(studentIndex == -1){
        return res.json({
            success:false,
            message:"Student not found",
        })
    } 

    const student = STUDENTS[studentIndex];
    student.city=city;

    STUDENTS[studentIndex] = student;
    res.json({
        success:true,
        data:student,
        message:"Student City Update Successfully",
    })
})

//READ SPECIFIC STUDENT
app.get("/students/:rollNo",(req,res)=>{
    const {rollNo} = req.params;

    let studentIndex = -1;

    STUDENTS.map((stud,index)=>{
        if(stud.rollNo == rollNo){
            studentIndex = index;
        }
    })

    if(studentIndex == -1){
        return res.status(404).json({
            success:false,
            message:"Student not found",
        })
    } 

    const student = STUDENTS[studentIndex];

    res.status(200).json({
        success:true,
        data:student,
        message:"Student Update Successfully",
    })
})



app.get("*",(req,res)=>{
    res.json({
        success:false,
        message:"Invalid Api"
    })
})

const PORT = 5001;
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
});
