import { Request, Response } from "express";
import { PythonController } from './python.controllers';
import Conversation from "../models/conversation.model";
import conversationRepository from "../repositories/conversation.repository";

export default class ConversationController {
  async create(req: Request, res: Response) {
      if (!req.body.value) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
      const pythonController = new PythonController();
      try {
        const conversation: Conversation = req.body;
        
        const savedConversation = await conversationRepository.save(conversation);

        // check all conversation from db
        const conversations = await conversationRepository.retrieveBySender(conversation.sender, "ASC");
        
        const messages = conversations.map(element => ({
          content: element.value
        })).filter(element => element.content !== "");
        
        console.log("before pyhton")
        // call python for generate content
        const generate = await pythonController.send(conversation.receiver, messages)

        console.log(generate)
        
        const responseConversation = new Conversation()
        responseConversation.sender = conversation.receiver
        responseConversation.receiver = conversation.sender
        responseConversation.value = generate
        const savedResponseConversation = await conversationRepository.save(responseConversation);

        res.send({
          savedResponseConversation
          });

      } catch (err) {
        res.status(500).send({
          message: "Some error occurred while retrieving conversations." + err
        });
      }
    }
    
    async findBySender(req: Request, res: Response) {
        const sender: string = req.params.sender;

        if (sender == null) {
          res.status(400).send({
            message: "sender can not be empty!"
          });
          return;
        }
        
        try {
          const conversations = await conversationRepository.retrieveBySender(sender, "DESC");
  
          res.send({
            conversations
            });
  
        } catch (err) {
          res.status(500).send({
            message: "Some error occurred while retrieving conversations." + err
          });
        }
      }
  }