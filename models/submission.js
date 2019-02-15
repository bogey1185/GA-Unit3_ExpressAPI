const mongoose  = require('mongoose');

const submissionSchema = new mongoose.Schema({
  parentPropertyId: String,
  imageUrl: String,
  text: String,
  uploadDate: Date
});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;