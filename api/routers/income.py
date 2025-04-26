from fastapi import APIRouter, HTTPException
from typing import List, Optional
from datetime import date
from pydantic import BaseModel
from foundry import client
from tam_copilot_sdk.types import ActionConfig, ActionMode, ValidationResult, ReturnEditsMode

# Models
class IncomeCreate(BaseModel):
    income_date: date
    source: str
    category: str
    description: str
    amount: int
    invoice_id: Optional[str] = None
    student_id: Optional[str] = None

class Income(IncomeCreate):
    id: str

# Router
router = APIRouter(
    prefix="/income",
    tags=["income"]
)

@router.post("/", response_model=dict)
async def create_income_endpoint(income: IncomeCreate):
    try:
        response = client.ontology.actions.create_income(
            action_config=ActionConfig(
                mode=ActionMode.VALIDATE_AND_EXECUTE,
                return_edits=ReturnEditsMode.ALL),
            income_date=income.income_date, 
            source=income.source, 
            category=income.category, 
            description=income.description, 
            amount=income.amount, 
            invoice_id=income.invoice_id, 
            student_id=income.student_id
        )
        print(response)
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", response_model=List[Income])
async def get_income_endpoint():
    # TODO: Implement with Palantir SDK
    raise HTTPException(status_code=501, detail="Not implemented yet") 