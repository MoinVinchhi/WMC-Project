import  mongoose from  'mongoose';

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    image: { type: String },
    venue: { type: String, required: true },
    duration: { type: String, required: true },
    points: { type: Number, required: true },
});
  
const Event = mongoose.model('Event', eventSchema);

export default Event;