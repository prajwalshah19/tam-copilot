from fastapi import APIRouter, HTTPException
from typing import List, Optional
from datetime import date
from pydantic import BaseModel
import uuid
from foundry import client
from tam_copilot_sdk.types import ActionConfig, ActionMode, ValidationResult, ReturnEditsMode

# Models
class ExpenseCreate(BaseModel):
    expense_date: date
    category: str
    description: str
    amount: float
    vendor: Optional[str] = None
    payment_method: Optional[str] = None

class Expense(ExpenseCreate):
    id: str

# Router
router = APIRouter(
    prefix="/expenses",
    tags=["expenses"]
)

@router.post("/", response_model=dict)
async def create_expense_endpoint(expense: ExpenseCreate):
    try:
        response = client.ontology.actions.create_expense(
            action_config=ActionConfig(
                mode=ActionMode.VALIDATE_AND_EXECUTE,
                return_edits=ReturnEditsMode.ALL),
            expense_date=date.today(), 
            category=expense.category, 
            description=expense.description, 
            amount=expense.amount, 
            vendor=expense.vendor, 
            payment_method=expense.payment_method
        )
        print(response)
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", response_model=List[Expense])
async def get_expenses_endpoint():
    # TODO: Replace with Palantir SDK call
    return get_expenses() 