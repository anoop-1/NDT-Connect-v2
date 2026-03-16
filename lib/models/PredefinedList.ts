import mongoose from "mongoose";

const predefinedListSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  items: {
    type: [String],
    required: true,
    default: []
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const PredefinedList = mongoose.models.PredefinedList || mongoose.model("PredefinedList", predefinedListSchema);

export default PredefinedList;
