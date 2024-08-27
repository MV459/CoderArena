import React, { useEffect, useState } from 'react';
import styles from './Problems.module.css';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'admin') {
      setIsAdmin(true);
    }

    const fetchProblems = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/problems`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProblems(data);
      } catch (error) {
        console.error('Error fetching problems:', error);
        setError('Failed to fetch problems');
      }
    };

    fetchProblems();
  }, []);

  const handleProblemClick = (id) => {
    navigate(`/problem/${id}`);
  };

  const handleDelete = async (problemId) => {
    try {
      await fetch(`${BASE_URL}/api/problems/${problemId}`, {
        method: 'DELETE',
      });
      setProblems(problems.filter((problem) => problem._id !== problemId));
    } catch (error) {
      console.error('Error deleting problem:', error);
    }
  };

  const handleUpdate = (problemId) => {
    navigate(`/admin/create-problem/`, { state: { problemId } });
  };

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <body>
    <div className={styles.problemsContainer}>
      <h2>All Problems</h2>
      <ul className={styles.problemsList}>
        {problems.map((problem) => (
          <li
            key={problem._id}
            className={styles.problemItem}
            onClick={() => handleProblemClick(problem._id)}
          >
            <div className={styles.problemTitle}>
              <h3>{problem.title}</h3>
            </div>
            <div className={styles.problemDetails}>
              <span className={`${styles.difficulty} ${styles[problem.difficulty]}`}>
                {problem.difficulty}
              </span>
              {/* <span className={styles.submissions}>
                {problem.submissionsCount} submissions
              </span> */}
              {isAdmin && (
                <div className={styles.adminActions}>
                  <button
                    className={styles.updateButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdate(problem._id);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(problem._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
    </body>
  );
};

export default Problems;
