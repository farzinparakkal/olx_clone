import mongoose from "mongoose"
const enqSchema = new mongoose.Schema({
    buyerId: { type: String },
    sellerId: { type: String },
    description: { type: String },
    productId: { type: String },
    negprice: { type: String },
})

export default mongoose.model.enq||mongoose.model('enq',enqSchema)