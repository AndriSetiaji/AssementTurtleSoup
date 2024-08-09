# AssementTurtleSoup

- test link : https://hyperhire.notion.site/Distributed-LLM-Assignment-python-node-js-_240801-15845197a09949cb99c4664c3e1e3e0f

### tech stack:
- python: running and consume the model ✔️
- node js (typescript): backend server ✔️
- postgres_db: read and write the history ✔️

## how to setup and run node & postgres db
- go dir /nod-api-svc and run `docker compos up`
  - for running postgres_db image
  - for build + runningnode-api-svc
- create db and table (file sql) on postgres db
- node js port is 8080
- postgres port is 5432

## how to run python db
- install python 3.11 
- install ollama `curl -fsSL https://ollama.com/install.sh | sh`
- download model llama2 and mistral `ollama run llama2` and `ollama run mistral`
- go to dir /python and run `pip install -r equirements.txt`
- run script with `python app.py`
- python port is 5000

### Note
The current setup runs the Python program locally rather than containerizing it into a Docker image due to the following considerations:
1. Large Model Size:
Option A: Including the model in the Docker image would significantly increase the image size, with each model requiring a minimum of 4GB. This would result in a very large Docker image.
2. Model Download on Startup:
Option B: Excluding the model from the Docker image would require downloading the model on-the-fly each time the image is started. This would lead to longer startup times, as downloading large models can be time-consuming.
Given these factors, the decision was made to run the Python program locally, without Dockerization, to avoid the limitations imposed by large model sizes and to optimize performance on limited hardware resources (CPU and RAM).
![Screenshot 2024-08-09 140209](https://github.com/user-attachments/assets/71c5db74-6759-4c18-b8e0-03ccf20cb9fc)


# Bussines Flow
![image](https://github.com/user-attachments/assets/0f18b26c-bd26-4ad9-bff3-18dab4aefaae)

## CURL for access python program
### /ping - helath check
```
curl --location 'http://localhost:5000/ping'
```
![Screenshot 2024-08-09 140350](https://github.com/user-attachments/assets/8dcf228e-42b3-4a59-a8ac-0fe50872256e)

### /generate - chain conversation
```
curl --location 'http://localhost:5000/generate' \
--header 'Content-Type: application/json' \
--data '{
    "model": "llama2",
    "messages": [
        {
            "content": "hello"
        },
        {
            "content": "tell me a joke"
        },
        {
            "content": "not funny"
        }
    ]
}'
```
![Screenshot 2024-08-09 140500](https://github.com/user-attachments/assets/746b9a30-5fba-44ca-972c-f67b2172130b)


### Note
- model -> select model (llma2 or mistral)
- messages -> for send chain input text user

## CURL for access node-api-svc
### /ping - helath check
```
curl --location 'http://localhost:8080/ping'
```
![Screenshot 2024-08-09 140338](https://github.com/user-attachments/assets/d0943bb0-67d2-4952-9107-909bb223258f)


### /generate - chain conversation
```
curl --location 'http://localhost:8080/conversations' \
--header 'Content-Type: application/json' \
--data '{
    "sender": "test - 3",
    "receiver":"llama2",
    "value":"yes please"
}'
```
![Screenshot 2024-08-09 140329](https://github.com/user-attachments/assets/8490aff7-87ea-44e4-9d6f-8075237693f4)
```
{
    "conversations": [
        {
            "id": 59,
            "sender": "llama2",
            "receiver": "test - 3",
            "value": "Great! Here is another one:\n\nWhy don't lobsters share? Because they're shellfish! 😜\n\nI hope these jokes bring a smile to your face. Is there anything else I can help you with or would you like me to keep telling jokes?",
            "deleted": false,
            "createdAt": "2024-08-09T07:02:26.666Z",
            "createdBy": "create - llama2",
            "updatedAt": "2024-08-09T07:02:26.670Z"
        },
        {
            "id": 58,
            "sender": "test - 3",
            "receiver": "llama2",
            "value": "yes please",
            "deleted": false,
            "createdAt": "2024-08-09T07:01:57.068Z",
            "createdBy": "create - test - 3",
            "updatedAt": "2024-08-09T07:01:57.070Z"
        },
        {
            "id": 57,
            "sender": "llama2",
            "receiver": "test - 3",
            "value": "Of course, I'd be happy to tell you a joke! Here is one:\n\nWhy don't scientists trust atoms? Because they make up everything! 😂\n\nI hope that made you smile! Do you have a favorite joke to share or would you like me to tell you another one?",
            "deleted": false,
            "createdAt": "2024-08-09T07:01:42.479Z",
            "createdBy": "create - llama2",
            "updatedAt": "2024-08-09T07:01:42.480Z"
        },
        {
            "id": 56,
            "sender": "test - 3",
            "receiver": "llama2",
            "value": "tell me a joke please",
            "deleted": false,
            "createdAt": "2024-08-09T07:01:10.394Z",
            "createdBy": "create - test - 3",
            "updatedAt": "2024-08-09T07:01:10.390Z"
        },
        {
            "id": 55,
            "sender": "llama2",
            "receiver": "test - 3",
            "value": "Hello! It's nice to meet you. Is there something I can help you with or would you like to chat?",
            "deleted": false,
            "createdAt": "2024-08-09T07:00:53.679Z",
            "createdBy": "create - llama2",
            "updatedAt": "2024-08-09T07:00:53.680Z"
        },
        {
            "id": 54,
            "sender": "test - 3",
            "receiver": "llama2",
            "value": "hello",
            "deleted": false,
            "createdAt": "2024-08-09T07:00:08.420Z",
            "createdBy": "create - test - 3",
            "updatedAt": "2024-08-09T07:00:08.420Z"
        }
    ]
}
```

### Note
- sender -> user / model (differentiate text `from` which side user or model)
- receiver -> user / model (differentiate text `to` which side user or model)
- value -> fill for content or text (from user or model)
