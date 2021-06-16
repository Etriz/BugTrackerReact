const Issue = require('../models/issueModel');

const createIssue = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'Please provide an issue',
    });
  }

  const issue = new Issue(body);
  if (!issue) {
    return res.status(400).json({
      success: false,
      error: 'Generic Issue Error',
    });
  }
  issue.save().then(() => {
    return res.status(201).json({
      success: true,
      id: issue._id,
      message: 'Issue created successfully',
    });
  });
};

const updateIssue = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    });
  }

  Issue.findOne({ issueId: req.params.id }, (err, issue) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'Issue not found!',
      });
    }
    issue.priority = body.priority;
    issue.description = body.description;
    issue
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: issue._id,
          message: 'Issue updated!',
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: 'Issue not updated!',
        });
      });
  });
};

const deleteIssue = async (req, res) => {
  await Issue.findOneAndDelete({ issueId: req.params.id }, (err, issue) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!issue) {
      return res.status(404).json({ success: false, error: `Issue not found` });
    }

    return res.status(200).json({ success: true, data: issue });
  }).catch((err) => console.log(err));
};

const getIssueById = async (req, res) => {
  await Issue.findOne({ issueId: req.params.id }, (err, issue) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!issue) {
      return res.status(404).json({ success: false, error: `Issue not found` });
    }
    return res.status(200).json({ success: true, data: issue });
  }).catch((err) => console.log(err));
};

const getAllIssues = async (req, res) => {
  await Issue.find({}, (err, issues) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!issues.length) {
      return res.status(404).json({ success: false, error: `No issues created` });
    }
    return res.status(200).json({ success: true, data: issues });
  }).catch((err) => console.log(err));
};

module.exports = {
  createIssue,
  updateIssue,
  deleteIssue,
  getIssueById,
  getAllIssues,
};
