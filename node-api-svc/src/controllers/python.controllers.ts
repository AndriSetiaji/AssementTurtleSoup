import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export class PythonController {
    async send(model: string, messages: { content: string | undefined; }[]): Promise<string | undefined> {
        
        const client = axios.create({
            baseURL: process.env.PYTHON_URL,
        });

        const config: AxiosRequestConfig = {
            headers: {
            'Accept': 'application/json',
            } as RawAxiosRequestHeaders,
        };
        
        const body = {
            model: model,
            messages: messages
        };
        console.log(body)
        try {
            const response: AxiosResponse = await client.post(`/generate`, body , config);
            console.log(response.status)
            console.log("data")
            console.log(response.data)
            console.log("data json")

            return response.data.content   
        } catch(err) {
            console.log(err);
        } 
    } 
}