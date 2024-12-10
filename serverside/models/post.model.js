import mongoose from "mongoose"
const postSchema = new mongoose.Schema({
    userId: { type: String },
    title: { type: String },
    category: { type: String },
    images: [{ type: String }],
    description: { type: String },
    price: { type: String },
    date: { type: String },
    time: { type: String } 
})

export default mongoose.model.post||mongoose.model('post',postSchema)