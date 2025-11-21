import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = 'http://127.0.0.1:5000/courses';

function HomePage() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(API_URL);
                setCourses(response.data);
                setError(null);
            } catch (err) {
                console.error("Error fetching courses:", err);
                setError("Failed to load courses. Please check the server connection.");
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    if (loading) return <h2 style={{ textAlign: 'center', padding: '50px' }}>Loading courses...</h2>;
    if (error) return <h2 style={{ color: 'red', textAlign: 'center', padding: '50px' }}>Error: {error}</h2>;

    return (
        <div className="container">
            <div id="homepage-intro-section">
                <h1 className="main-title">Creative Classes</h1>
                <h2 className="subtitle">Interested in starting a new hobby? Learning a new skill? Making new friends?</h2>

                <h3 className="classes-subtitle" style={{ textAlign: 'center', marginTop: '20px' }}>CHECK OUT OUR CLASSES BELOW.</h3>
            </div>

            <div id="classes_block">
                {courses.length === 0 ? (
                    <p style={{ textAlign: 'center', width: '100%', padding: '20px' }}>
                        No courses found in the database.
                    </p>
                ) : (
                    courses.map(course => (
                        <article key={course._id} className="course-card">
                            <Link to={`/course/${course._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>

                                <img
                                    src={course.image || 'https://placehold.co/600x400?text=No+Image'}
                                    alt={course.title}
                                    className="card-image"
                                />

                                <div className="card-info" style={{ padding: '0 15px 15px 15px' }}>

                                    <h4 style={{ marginBottom: '10px' }}>{course.title}</h4>

                                    <p style={{ fontStyle: 'normal', margin: '0 0 15px 0' }}>
                                        {course.description ? course.description.substring(0, 100) + '...' : ''}
                                    </p>

                                    <p className="hours_requirement" style={{ margin: '15px 0', lineHeight: 1.4, fontStyle: 'italic', fontWeight: 'bold' }}>
                                        Cost: ${course.cost !== undefined && course.cost !== null ? course.cost : 'N/A'} <br />

                                        Hours to complete: {course.duration || 'N/A'}.
                                    </p>

                                    <button style={{ marginTop: '10px', width: '100%' }}>
                                        More information about {course.title}
                                    </button>
                                </div>
                            </Link>
                        </article>
                    ))
                )}
            </div>
        </div>
    );
}

export default HomePage;