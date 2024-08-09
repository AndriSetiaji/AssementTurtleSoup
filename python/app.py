import uvicorn
import os
import ollama

from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv

port=5000
app = FastAPI()

class ResponseSuccess:
    isSuccess: bool
    content: str 
    def __init__(self,content): 
            self.isSuccess = True
            self.content = content

class ResponseError:
    isSuccess: bool
    errorMessage: str
    def __init__(self,errorMessage): 
            self.isSuccess = False
            self.errorMessage = errorMessage

class GenerateRequest(BaseModel):
    model: str
    messages: list

@app.get("/ping")
def healthcheck():
    payload = {
        'data': 'python-api-svc v0.0.1 /ping'
    }
    return payload

@app.post("/generate")
async def generate(request: GenerateRequest):
    if not request:
        return ResponseError("request is null")
    res = doGenerate(request)
    return ResponseSuccess(res)

def doGenerate(request: GenerateRequest):
    messages = []
    for item in request.messages:
        mes = {'role': 'user', 'content': item["content"]}
        messages.append(mes)

    stream = ollama.chat(
        model=request.model,
        messages=messages,
        stream=True,
    )

    result = ''
    for chunk in stream:
        print(chunk['message']['content'], end='', flush=True)
        result += chunk['message']['content']
    print()
    
    return result

def setup():
    load_dotenv()
    global port
    port = os.getenv('PORT')

def main():
    setup()
    global port
    uvicorn.run(app, host="0.0.0.0", port=int(port))


if __name__ == "__main__":
    main()