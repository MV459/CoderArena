import React, { useState } from 'react';
import styles from './CreateProblem.module.css';

const CreateProblem = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [inputFormat, setInputFormat] = useState('');
  const [outputFormat, setOutputFormat] = useState('');
  const [sampleTestCases, setSampleTestCases] = useState([{ input: '', output: '', explanation: '' }]);
  const [topicTags, setTopicTags] = useState([]);
  const [newTag, setNewTag] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/api/problems/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, description, difficulty, inputFormat, outputFormat, sampleTestCases, topicTags })
    });

    if (response.ok) {
      alert('Problem created successfully');
      setTitle('');
      setDescription('');
      setDifficulty('easy');
      setInputFormat('');
      setOutputFormat('');
      setSampleTestCases([{ input: '', output: '', explanation: '' }]);
      setTopicTags([]);
      setNewTag('');
    } else {
      alert('Error creating problem');
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
      <h2>Create Problem</h2>
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
        <button type="submit" className={styles['submit-button']}>Create Problem</button>
      </form>
    </div>
  );
};

export default CreateProblem;
