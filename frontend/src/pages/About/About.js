import React from 'react';
import Styles from './About.module.css';
import aboutUsImage from '../../assets/about_img.jpg';
import { Link } from 'react-router-dom';

export default function AboutUs() {
    return (
        <div className={Styles.body}>
            <div id="team" className={Styles.team}>
                <div className={Styles.totalabout}>
                    <div className={Styles.member}>
                        <div className={Styles["member-img"]}>
                            <img src="https://cdn.business2community.com/wp-content/uploads/2014/03/Unknown-person.gif" alt="Team member" />
                        </div>
                        <div className={Styles["member-info"]}>
                            <h3>Avinash</h3>
                            <div className={Styles.social}>
                                <Link to="/"><i className="fa-brands fa-twitter"></i></Link>
                                <Link to="/"><i className="fa-brands fa-facebook"></i></Link>
                                <Link to="/"><i className="fa-brands fa-instagram"></i></Link>
                            </div>
                            <h4>Web Designer</h4>
                            <p>Designed CoderArena website</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={Styles["about-container"]}>
                <div className={Styles["about_image"]}>
                    <img src={aboutUsImage} alt="About us" />
                </div>
                <div className={Styles["about_team"]}>
                    <h2>Our Motive</h2>
                    <ul className={Styles.motive}>
                        <li>Providing a seamless, engaging environment for coding enthusiasts.</li>
                        <li>Offering challenging problems to improve coding skills.</li>
                        <li>Fostering growth and critical thinking among developers.</li>
                    </ul>

                    <h2>Our Vision</h2>
                    <ul className={Styles.motive}>
                        <li>Belief in coding as a tool to solve real-world problems.</li>
                        <li>Encouraging continuous learning and improvement.</li>
                        <li>Creating a community of passionate coders.</li>
                    </ul>

                    <h2>What we Offer</h2>
                    <ul className={Styles.motive}>
                        <li>Comprehensive Problem Sets: Our platform features a wide array of coding problems, ranging from beginner to advanced levels, across various domains and languages. Each problem is designed to challenge your problem-solving abilities and help you think like a developer.</li>
                        <li>Interactive Coding Environment: Solve problems directly on our platform using our built-in code editor and compiler. With real-time feedback and detailed problem descriptions, our environment is tailored to give you a hands-on coding experience.</li>
                        <li>Learning and Growth: Our platform isn't just about solving problems—it's about learning. We encourage users to explore different algorithms, improve their coding practices, and deepen their understanding of computer science concepts.</li>
                    </ul>
                </div>
            </div>

            
        </div>
    );
}
