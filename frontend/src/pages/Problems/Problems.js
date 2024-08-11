import React, { useEffect, useState } from 'react';
import styles from './Problems.module.css';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config';

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const userRole=localStorage.getItem('userRole');
  const navigate=useNavigate();
  const handleProblemClick = (id) => {
        navigate(`/problem/${id}`); // Navigate to the problem detail page with the problem ID
      };
  
  

  useEffect(() => {
    if(userRole=='admin'){
      setIsAdmin(true);
    }
    // const fetchUserRole = async () => {
    //   try {
    //     const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
    //     console.log(token.split(' ')[1])
    //     const response = await fetch('http://localhost:8000/api/users/me', {
    //       method: 'GET',
    //       headers: {
    //         Authorization: `Bearer ${token.split(' ')[1]}`, // Send token in Authorization header
    //       },
    //     });

    //     // if (response.status === 401) {
    //     //   throw new Error('Unauthorized - token might be missing or expired');
    //     // }

    //     const user = await response.json();
    //     console.log('User fetched:', user);

    //     if (user.role === 'admin') {
    //       setIsAdmin(true);
    //     }
    //   } catch (error) {
    //     console.error('Error fetching user role:', error);
    //     setError('Failed to fetch user role');
    //   }
    // };

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

    // fetchUserRole(); // Fetch the role of the user
    fetchProblems(); // Fetch the problems list
  }, []);

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
    console.log('Update problem:', problemId);
    // Implement update logic here
  };

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.problemsContainer}>
      <h2>All Problems</h2>
      <ul className={styles.problemsList}>
        {problems.map((problem) => (
          <li key={problem._id} className={styles.problemItem} onClick={() => handleProblemClick(problem._id)}>
            <div className={styles.problemTitle}>
              <h3>{problem.title}</h3>
            </div>
            <div className={styles.problemDetails}>
              <span className={`${styles.difficulty} ${styles[problem.difficulty]}`}>
                {problem.difficulty}
              </span>
              <span className={styles.submissions}>
                {problem.submissionsCount} submissions
              </span>
              {isAdmin && (
                <div className={styles.adminActions}>
                  <button 
                    className={styles.updateButton} 
                    onClick={() => handleUpdate(problem._id)}
                  >
                    Update
                  </button>
                  <button 
                    className={styles.deleteButton} 
                    onClick={() => handleDelete(problem._id)}
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
  );
};

export default Problems;
