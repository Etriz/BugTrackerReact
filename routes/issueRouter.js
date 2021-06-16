const express = require('express');

const IssueController = require('../controllers/issueController');

const router = express.Router();

router.post('/issue', IssueController.createIssue);
router.put('/issue/:id', IssueController.updateIssue);
router.delete('/issue/:id', IssueController.deleteIssue);
router.get('/issue/:id', IssueController.getIssueById);
router.get('/issues', IssueController.getAllIssues);

module.exports = router;
