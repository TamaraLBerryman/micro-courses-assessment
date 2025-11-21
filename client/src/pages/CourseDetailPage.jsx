import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

// --- Sub-Component for the Accordion Items ---
const ModuleItem = ({ module }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li style={{ listStyle: 'none' }}>
            <button
                className="module-dropdown-btn" // Uses your new "Card" CSS
                aria-expanded={isOpen}
                onClick={() => setIsOpen(!isOpen)}
            >
                {/* Left Side: Title */}
                <span>{typeof module === 'string' ? module : module.title}</span>

                {/* Right Side: Toggle Icon */}
                <span style={{ fontSize: '1.5rem', fontWeight: '400', lineHeight: '1' }}>
                    {isOpen ? '−' : '+'}
                </span>
            </button>

            {/* Dropdown Content */}
            <div
                className="module-description-content"
                style={{
                    display: isOpen ? 'block' : 'none',
                    padding: '20px',
                    backgroundColor: 'white',
                    border: '1px solid #eee',
                    borderTop: 'none',
                    borderRadius: '0 0 5px 5px',
                    marginBottom: '15px',
                    marginTop: '-15px'
                }}
            >
                <p style={{ margin: 0, color: '#333' }}>
                    {module.description || "No description available."}
                </p>
            </div>
        </li>
    );
};

// --- Main Page Component ---
function CourseDetailPage() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [enrollmentStatus, setEnrollmentStatus] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            const API_URL = `http://127.0.0.1:5000/courses/${id}`;
            try {
                const response = await axios.get(API_URL);
                setCourse(response.data);
                setError(null);
            } catch (err) {
                console.error("Error fetching single course:", err);
                setError("Failed to load course details.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id]);

    const handleEnrollSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;

        if (name && email) {
            setEnrollmentStatus('success');
            e.target.reset();
        } else {
            setEnrollmentStatus('error');
        }
    };

    if (loading) return <h2 style={{ padding: '50px', textAlign: 'center' }}>Loading course details...</h2>;
    if (error) return <h2 style={{ color: 'red', padding: '50px', textAlign: 'center' }}>Error: {error}</h2>;
    if (!course) return <h2 style={{ padding: '50px', textAlign: 'center' }}>Course not found!</h2>;

    return (
        <div id="detail-page-container">

            {/* Back Link */}
            <div style={{ marginBottom: '20px' }}>
                <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>&larr; Back to All Classes</Link>
            </div>

            {/* Hero Section */}
            <section id="course-hero">
                <img
                    id="detail-image"
                    src={course.image || 'https://placehold.co/800x400?text=No+Image'}
                    alt={`Details for ${course.title}`}
                />
                <h1 id="detail-title" style={{ marginTop: '20px' }}>{course.title}</h1>
            </section>

            {/* --- TOP SECTION: Split Columns (Info Box vs Description) --- */}
            <section id="course-summary">

                {/* Left Column: Info Box */}
                <div className="info-box">
                    <h4 style={{ borderBottom: '2px solid #B31237', paddingBottom: '10px', marginBottom: '15px' }}>
                        COURSE SNAPSHOT
                    </h4>
                    <p><strong>Cost:</strong> ${course.cost ? course.cost : 'N/A'}</p>
                    <p><strong>Total Hours:</strong> {course.duration || 'N/A'}</p>
                    <p><strong>Instructor:</strong> {course.instructor || 'TBD'}</p>
                    <p><strong>Category:</strong> {course.category || 'General'}</p>
                </div>

                {/* Right Column: Description ONLY */}
                <div className="description-box">
                    <h2 style={{ marginTop: 0 }}>About this Class</h2>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>{course.description}</p>
                </div>

            </section>

            {/* --- BOTTOM SECTION: Modules (Full Width) --- */}
            {/* MOVED OUTSIDE of #course-summary so it can stretch fully left-to-right */}
            <section id="course-modules" style={{ marginTop: '40px' }}>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                    Course Modules (One per Week)
                </h2>

                <ul id="detail-modules-list" style={{ padding: 0 }}>
                    {course.modules && course.modules.length > 0 ? (
                        course.modules.map((mod, index) => (
                            <ModuleItem key={index} module={mod} />
                        ))
                    ) : (
                        <li>No modules listed for this course.</li>
                    )}
                </ul>
            </section>

            {/* Enrollment Section */}
            <section id="enrollment-section">
                <h2 className="contact-form-heading">Enroll in <span id="enrollment-class-title">{course.title}</span></h2>

                <form id="enrollment-form" className="detail-form" onSubmit={handleEnrollSubmit}>
                    <div className="form-group">
                        <label htmlFor="enroll-name">Full Name:</label>
                        <input type="text" id="enroll-name" name="name" required placeholder="Your Name" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="enroll-email">Email Address:</label>
                        <input type="email" id="enroll-email" name="email" required placeholder="your@email.com" />
                    </div>

                    <button type="submit" id="submit-enrollment-button">Submit Enrollment</button>
                </form>

                {enrollmentStatus === 'success' && (
                    <div id="enrollment-feedback" className="success">
                        Thank you! Your enrollment has been submitted. We will be in touch soon.
                    </div>
                )}
                {enrollmentStatus === 'error' && (
                    <div id="enrollment-feedback" className="error">
                        Error: Please fill out all required fields.
                    </div>
                )}
            </section>

        </div>
    );
}

export default CourseDetailPage;