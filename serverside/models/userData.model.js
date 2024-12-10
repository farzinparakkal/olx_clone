import mongoose from "mongoose"
const userDataSchema = new mongoose.Schema({
    userId: { type: String },  
    district:{type:String},
    place: { type: String },
    pin: { type: String },
    pic: { type: String },
})

export default mongoose.model.userData||mongoose.model('userData',userDataSchema)