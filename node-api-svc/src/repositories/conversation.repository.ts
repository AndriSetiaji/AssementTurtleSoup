import { Op, TimeoutError } from "sequelize";
import Conversation from "../models/conversation.model";

interface IConversationRepository {
  save(conversation: Conversation): Promise<Conversation>;
  retrieveBySender(sender: string, orderBy: string): Promise<Conversation[]>;
}

interface SearchCondition {
  [key: string]: any;
}

class ConversationRepository implements IConversationRepository {
  async save(conversation: Conversation): Promise<Conversation> {
    try {

      return await Conversation.create({
        sender: conversation.sender,
        receiver: conversation.receiver,
        value: conversation.value,
        createdBy: "create - " +conversation.sender,
        createdAt: new Date()
      });
    } catch (err) {
      throw new Error("Failed to save Conversation! " + err);
    }
  }

  async retrieveBySender(sender: string, orderBy: string): Promise<Conversation[]> {
    try {
        let condition: SearchCondition = {};
        
      return await Conversation.findAll({ 
        where: {
          [Op.or]: [{sender: sender}, {receiver: sender}]
        },  
        order: [
            ['created_at', orderBy],
        ],
    });
    } catch (error) {
      throw new Error("Failed to retrieve Tutorials!");
    }
  }
}

export default new ConversationRepository();