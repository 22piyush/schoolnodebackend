import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import { getHealth } from './controllers/health.js';
import {deleteStudentByRollNo, getStudent, getStudentByRollNo, patchStudentCityByRollNo, postStudents, putStudentByRollNo} from './controllers/student.js';
import { notFound } from './controllers/other.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


//HEALTH API
app.get("/health", getHealth);

//GET ALL STUDENTS DATA
app.get("/students", getStudent);

//ADD STUDENT DATA
app.post("/students",postStudents);

//DELETE STUDENT
app.delete("/students/:rollNo",deleteStudentByRollNo);

//UPDATE STUDENTS
app.put("/students/:rollNo",putStudentByRollNo)

//PATCH STUDENTS
app.patch("/students/city/:rollNo",patchStudentCityByRollNo)

//READ SPECIFIC STUDENT
app.get("/students/:rollNo",getStudentByRollNo)



app.get("*",notFound)

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
});
