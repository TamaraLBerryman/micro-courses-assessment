import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/courses';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const response = await axios.get(API_URL);
                setCourses(response.data);
            } catch (error) {
                console.error("Error fetching menu items:", error);
            }
        };
        fetchMenuData();
    }, []);

    const toggleMenu = () => setIsMenuOpen(prev => !prev);
    const closeMenus = () => {
        setIsMenuOpen(false);
        setIsDropdownOpen(false);
    };

    const toggleDropdown = (e) => {
        e.preventDefault();
        setIsDropdownOpen(prev => !prev);
    };

    return (
        <header id="main-header">
            <nav id="top-nav">
                <ul>
                    <li id="logo-container">
                        <Link to="/" onClick={closeMenus}>
                            <img src="/images/Logo_Landscape.png" alt="Creative Classes Logo" className="header-logo" />
                        </Link>
                    </li>

                    <li className="desktop-only"><Link to="/">Home</Link></li>

                    <li className="dropdown desktop-only" onMouseLeave={() => setIsDropdownOpen(false)}>
                        <a href="#" className="dropbtn" onMouseEnter={() => setIsDropdownOpen(true)}>All Classes</a>
                        <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`} onMouseLeave={() => setIsDropdownOpen(false)}>
                            {courses.map(course => (
                                <Link key={course._id} to={`/course/${course._id}`}>{course.title}</Link>
                            ))}
                        </div>
                    </li>

                    <li className="desktop-only"><Link to="/contact">Contact</Link></li>

                    <button
                        className="menu-button"
                        onClick={toggleMenu}
                        aria-expanded={isMenuOpen}
                    >
                        <span className="hamburger-icon"></span>
                    </button>
                </ul>
            </nav>

            <div
                id="main-menu-list"
                data-visible={isMenuOpen ? "true" : "false"}
            >
                <ul>
                    <li><Link to="/" onClick={closeMenus}>Home</Link></li>

                    <li>
                        <button
                            className="mobile-dropdown-toggle"
                            onClick={toggleDropdown}
                            style={{ background: 'none', border: 'none', fontSize: '1.2rem', fontWeight: 'bold', color: '#B31237', width: '100%', textAlign: 'left', padding: '0', cursor: 'pointer' }}
                        >
                            All Classes {isDropdownOpen ? '−' : '+'}
                        </button>

                        <div className={`mobile-dropdown-content ${isDropdownOpen ? 'show' : ''}`} style={{ display: isDropdownOpen ? 'block' : 'none', paddingLeft: '20px' }}>
                            {courses.map(course => (
                                <Link
                                    key={course._id}
                                    to={`/course/${course._id}`}
                                    onClick={closeMenus}
                                    style={{ display: 'block', padding: '10px 0', fontSize: '1rem' }}
                                >
                                    {course.title}
                                </Link>
                            ))}
                        </div>
                    </li>

                    <li><Link to="/contact" onClick={closeMenus}>Contact</Link></li>
                </ul>
            </div>
        </header>
    );
}

export default Header;