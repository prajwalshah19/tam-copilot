from fastapi import APIRouter, HTTPException
from typing import List, Optional
from datetime import date
from pydantic import BaseModel
from foundry import client
from tam_copilot_sdk.types import ActionConfig, ActionMode, ValidationResult, ReturnEditsMode


# Models
class StudentCreate(BaseModel):
    first_name: str
    last_name: str
    date_of_birth: date
    primary_contact_name: Optional[str] = None
    primary_contact_email: Optional[str] = None
    primary_contact_phone: Optional[str] = None
    enrollment_status: Optional[str] = None

class Student(StudentCreate):
    id: str

# Router
router = APIRouter(
    prefix="/students",
    tags=["students"]
)

@router.post("/", response_model=dict)
async def create_student_endpoint(student: StudentCreate):
    try:
        response = client.ontology.actions.create_students(
            action_config=ActionConfig(
                mode=ActionMode.VALIDATE_AND_EXECUTE,
                return_edits=ReturnEditsMode.ALL),
            first_name=student.first_name, 
            last_name=student.last_name, 
            date_of_birth=student.date_of_birth, 
            primary_contact_name=student.primary_contact_name, 
            primary_contact_email=student.primary_contact_email, 
            primary_contact_phone=student.primary_contact_phone, 
            enrollment_status=student.enrollment_status
        )
        print(response)
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", response_model=List[Student])
async def get_students_endpoint():
    try:
        objects_iterator = client.ontology.objects.Students.iterate()
        objects = list(objects_iterator)
        
        students = [
            Student(
                id=obj.student_id,
                first_name=obj.first_name,
                last_name=obj.last_name,
                date_of_birth=obj.date_of_birth,
                primary_contact_name=obj.primary_contact_name,
                primary_contact_email=obj.primary_contact_email,
                primary_contact_phone=obj.primary_contact_phone,
                enrollment_status=obj.enrollment_status
            ) for obj in objects
        ]
        
        return students
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 