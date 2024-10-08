import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './CreateProblem.module.css';
import Swal from 'sweetalert2';

const CreateProblem = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { problemId } = location.state || {}; 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [inputFormat, setInputFormat] = useState('');
  const [outputFormat, setOutputFormat] = useState('');
  const [sampleTestCases, setSampleTestCases] = useState([{ input: '', output: '', explanation: '' }]);
  const [topicTags, setTopicTags] = useState([]);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (problemId) {
      const fetchProblemDetails = async () => {
        try {
          const response = await fetch(`http://localhost:8000/api/problems/${problemId}`);
          const problem = await response.json();

          setTitle(problem.title);
          setDescription(problem.description);
          setDifficulty(problem.difficulty);
          setInputFormat(problem.inputFormat);
          setOutputFormat(problem.outputFormat);
          setSampleTestCases(problem.sampleTestCases || [{ input: '', output: '', explanation: '' }]);
          setTopicTags(problem.topicTags);
        } catch (error) {
          console.error('Error fetching problem details:', error);
        }
      };

      fetchProblemDetails();
    }
  }, [problemId]);

  const validateForm = () => {
    if (!title.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Title is required',
      });
      return false;
    }
    if (!description.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Description is required',
      });
      return false;
    }
    if (!inputFormat.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Input Format is required',
      });
      return false;
    }
    if (!outputFormat.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Output Format is required',
      });
      return false;
    }
    for (const testCase of sampleTestCases) {
      if (!testCase.input.trim() || !testCase.output.trim()) {
        Swal.fire({
          icon: 'error',
          title: 'Validation Error',
          text: 'All test cases must have input and output',
        });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const url = problemId
      ? `http://localhost:8000/api/problems/${problemId}`
      : 'http://localhost:8000/api/problems/create';

    const method = problemId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, difficulty, inputFormat, outputFormat, sampleTestCases, topicTags }),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: `Problem ${problemId ? 'updated' : 'created'} successfully`,
        }).then(() => navigate('/problems'));
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error in submitting problem',
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while submitting the problem',
      });
    }
  };

  const handleAddTestCase = () => {
    setSampleTestCases([...sampleTestCases, { input: '', output: '', explanation: '' }]);
  };

  const handleRemoveTestCase = (index) => {
    const newTestCases = sampleTestCases.filter((_, i) => i !== index);
    setSampleTestCases(newTestCases);
  };

  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter' && newTag.trim()) {
      setTopicTags([...topicTags, newTag.trim()]);
      setNewTag('');
    }
  };

  return (
    <div className={styles['create-problem']}>
      <h2>{problemId ? 'Update Problem' : 'Create Problem'}</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles['form-group']}>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label>Difficulty</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className={styles['form-group']}>
          <label>Input Format</label>
          <textarea
            value={inputFormat}
            onChange={(e) => setInputFormat(e.target.value)}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label>Output Format</label>
          <textarea
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value)}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label>Sample Test Cases</label>
          {sampleTestCases.map((testCase, index) => (
            <div key={index} className={styles['test-case']}>
              <div>
                <label>Input</label>
                <textarea
                  value={testCase.input}
                  onChange={(e) => {
                    const newTestCases = [...sampleTestCases];
                    newTestCases[index].input = e.target.value;
                    setSampleTestCases(newTestCases);
                  }}
                  required
                />
              </div>
              <div>
                <label>Output</label>
                <textarea
                  value={testCase.output}
                  onChange={(e) => {
                    const newTestCases = [...sampleTestCases];
                    newTestCases[index].output = e.target.value;
                    setSampleTestCases(newTestCases);
                  }}
                  required
                />
              </div>
              <div>
                <label>Explanation (optional)</label>
                <textarea
                  value={testCase.explanation}
                  onChange={(e) => {
                    const newTestCases = [...sampleTestCases];
                    newTestCases[index].explanation = e.target.value;
                    setSampleTestCases(newTestCases);
                  }}
                />
              </div>
              <button type="button" onClick={() => handleRemoveTestCase(index)}>Remove Test Case</button>
            </div>
          ))}
          <button type="button" onClick={handleAddTestCase}>Add Test Case</button>
        </div>
        <div className={styles['form-group']}>
          <label>Topic Tags</label>
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={handleTagKeyPress}
            placeholder="Press enter to add a tag"
          />
          <div className={styles['tag-container']}>
            {topicTags.map((tag, index) => (
              <span key={index} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </div>
        <button type="submit" className={styles['submit-button']}>
          {problemId ? 'Update Problem' : 'Create Problem'}
        </button>
      </form>
    </div>
  );
};

export default CreateProblem;
