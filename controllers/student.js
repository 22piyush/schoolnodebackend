import { STUDENTS } from "../data/student.js";

const getStudent = (req,res)=>{
    res.json({
        success:true,
        data:STUDENTS,
        message:"Students Fetched Successfully"
    });
};

const postStudents = (req,res)=>{
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
}

const deleteStudentByRollNo = (req,res)=>{
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
}

const putStudentByRollNo = (req,res)=>{
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
}

const patchStudentCityByRollNo = (req,res)=>{
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
}

const getStudentByRollNo = (req,res)=>{
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
}

export{
    getStudent,
    postStudents,
    deleteStudentByRollNo,
    putStudentByRollNo,
    patchStudentCityByRollNo,
    getStudentByRollNo
}