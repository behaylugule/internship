const mongoose = require("mongoose");

const FolderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    parent:{type:String,required:true},
    foldername:{type:String, required:true},
    type:{type:String, default:"folder"},
    level:{type:String,required:true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Folder", FolderSchema);
