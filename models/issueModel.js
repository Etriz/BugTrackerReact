const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
  issueId: { type: Number, required: true },
  priority: { type: String, required: true },
  description: { type: String, required: true },
});

const issueModel = mongoose.model('IssueModel', IssueSchema, 'issues');

module.exports = issueModel;
