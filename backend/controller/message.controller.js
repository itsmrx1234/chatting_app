import Conversation from "../model/conversation.model.js";

export const Message= async(req,res)=>{
    try {
        const {message}=req.body;
        const {id:ReceiverId}=req.params;
        const SenderId=req.user._id;
        let conversation=await Conversation.findOne({
            participants:{$all:[SenderId,ReceiverId]};

        })
        if(!conversation){
            conversation=await Conversation.create({
                participants:[SenderId,ReceiverId];
            }) 
        }
        const newMessage= new Message({
            SenderId,
            ReceiverId,
            message,
        })
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        await conversation.save();
        await newMessage.save();
        res.status(200).json({message:"message sent successfully"})
    } catch (error) {
        res.status(401).json({error:"internal server"})
    }
}
