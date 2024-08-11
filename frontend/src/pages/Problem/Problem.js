import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Problem.module.css';
import { BASE_URL } from '../../config';

const Problem = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [error, setError] = useState(null);
  const [code, setCode] = useState('');
  const [results, setResults] = useState(null);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('c++'); 

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/problems/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProblem(data);
      } catch (error) {
        console.error('Error fetching problem:', error);
        setError('Failed to fetch problem');
      }
    };

    fetchProblem();
  }, [id]);

  const handleCodeChange = (e) => setCode(e.target.value);

  const handleInputChange = (e) => setInput(e.target.value);

  const handleLanguageChange = (e) => setLanguage(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/problems/run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          problemId: id,
          code,
          input,
          language,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setResults(data);
      setOutput(data.output);
    } catch (error) {
      console.error('Error submitting code:', error);
      setError('Failed to submit code');
    }
  };

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!problem) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.problemDetails}>
        <h1>{problem.title}</h1>
        <p><strong>Description:</strong> {problem.description}</p>
        <p><strong>Constraints:</strong> {problem.constraints}</p>
        <p><strong>Input Format:</strong> {problem.inputFormat}</p>
        <p><strong>Output Format:</strong> {problem.outputFormat}</p>
        <p><strong>Sample Test Cases:</strong></p>
        <ul>
          {problem.sampleTestCases.map((testCase, index) => (
            <li key={index} className={styles.testcase}>
              <p><strong>Input:</strong> {testCase.input}</p>
              <p><strong>Output:</strong> {testCase.output}</p>
              <p><strong>Explanation:</strong> {testCase.explanation}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.codeSubmission}>
        <form onSubmit={handleSubmit} className={styles.codeForm}>
          <div className={styles.languageSelector}>
            <label htmlFor="language">Language:</label>
            <select id="language" value={language} onChange={handleLanguageChange} className={styles.languageDropdown}>
              <option value="python">Python</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
            </select>
          </div>
          <textarea
            value={code}
            onChange={handleCodeChange}
            rows="10"
            cols="50"
            placeholder="Write your code here..."
            className={styles.codeArea}
          />
          <div className={styles.inputOutputContainer}>
            <div className={styles.inputBox}>
              <h3>Input</h3>
              <textarea
                value={input}
                onChange={handleInputChange}
                rows="5"
                cols="40"
                placeholder="Enter input here..."
                className={styles.inputArea}
              />
            </div>
            <div className={styles.outputBox}>
              <h3>Output</h3>
              <pre className={styles.outputArea}>{output}</pre>
            </div>
          </div>
          <button type="submit" className={styles.submitButton}>Submit Code</button>
        </form>
      </div>
    </div>
  );
};

export default Problem;
