const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema(
    {
        title: String,
        description: String,
        task: [ {type: Schema.Types.ObjectId, ref: "Task"} ],
      },
      {
        timestamps: true,
      }
    );
    const Project = mongoose.model('Project', projectSchema);
  

module.exports = Project;