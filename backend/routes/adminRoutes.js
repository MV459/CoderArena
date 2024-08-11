const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');


router.post('/problems', async (req, res) => {
  try {
    const { title, description, difficulty, inputFormat, outputFormat, sampleTestCases, topicTags } = req.body;
    const newProblem = new Problem({ 
      title, 
      description, 
      difficulty, 
      inputFormat, 
      outputFormat, 
      sampleTestCases, 
      topicTags 
    });
    await newProblem.save();
    res.status(201).send('Problem created successfully');
  } catch (error) {
    res.status(400).send('Error creating problem');
  }
});

module.exports = router;
