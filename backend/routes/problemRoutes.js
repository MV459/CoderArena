const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const generateFile = require('../utils/generateFile');
const executeCpp = require('../utils/executeCpp');
const generateInputFile = require('../utils/generateInputFile');
const executeJava = require('../utils/executeJava'); 
const executePython = require('../utils/executePython'); 

router.get('/:id',async (req,res)=>{
    const problemId = req.params.id;
  try {
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.json(problem);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
  
    try {
      const updatedProblem = await Problem.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (!updatedProblem) {
        return res.status(404).json({ message: 'Problem not found' });
      }
  
      res.json(updatedProblem);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
  
router.post('/create', async (req, res) => {
    try {
        const { title, description, difficulty, inputFormat, outputFormat, sampleTestCases, inputFile, outputFile, topicTags } = req.body;

        const problem = new Problem({
            title,
            description,
            difficulty,
            inputFormat,
            outputFormat,
            sampleTestCases,
            inputFile,
            outputFile,
            topicTags
        });

        await problem.save();

        res.status(201).json({
            message: 'Problem created successfully',
            problem
        });
    } catch (error) {
        console.error('Error creating problem:', error);
        res.status(500).send('Failed to create problem');
    }
});

router.delete('/:id', async (req, res) => {
    try {
      const problem = await Problem.findByIdAndDelete(req.params.id);
      if (!problem) {
        return res.status(404).json({ message: 'Problem not found' });
      }
      res.json({ message: 'Problem deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const problems = await Problem.find();
        res.status(200).json(problems);
    } catch (error) {
        console.error('Error fetching problems:', error);
        res.status(500).send('Failed to fetch problems');
    }
});
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


router.post('/run', async (req, res) => {
    console.log('Received request:', req.body);
    const { language = 'cpp', code, input } = req.body;

    if (!code) {
        return res.status(400).json({ success: false, message: 'Code is required' });
    }

    try {
        const filePath = await generateFile(language, code);
        const inputPath = input ? await generateInputFile(input) : null;

        let output;
        switch (language) {
            case 'cpp':
                output = await executeCpp(filePath, inputPath);
                break;
            case 'java':
                output = await executeJava(filePath, inputPath);
                break;
            case 'python':
                output = await executePython(filePath, inputPath);
                break;
            default:
                return res.status(400).json({ success: false, message: 'Invalid language specified' });
        }

        res.json({ filePath, inputPath, output });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
module.exports = router;
