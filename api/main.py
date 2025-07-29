from fastapi import FastAPI
from foundry import client
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from routers import expenses, income, students

app = FastAPI(
    title="TAM Copilot API",
    description="A stateless API gateway for Palantir Foundry integration",
    version="0.1.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(expenses.router)
app.include_router(income.router)
app.include_router(students.router)

@app.get("/")
async def read_root():
    return {"message": "Hello World - TAM FastAPI Server is running!"}

class QueryRequest(BaseModel):
    question: str

@app.post("/query")
async def process_query(request: QueryRequest):
    result = client.ontology.queries.process_query(
        question=request.question
    )
    return {"message": result}
