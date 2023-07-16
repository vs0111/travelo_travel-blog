import React from 'react';
import './menu.css';
import { Link, useNavigate } from 'react-router-dom';

function Menu({ menuBlog }) {
  const navigate = useNavigate();

  const handleBlogClick = (blogId) => {
    navigate(`/singlePost/${blogId}`);
    window.location.reload()
  };

  return (
    <div className="menus">
      <h1>Other posts you may like</h1>
      {menuBlog.map((blog) => (
        <div className="posts gap-2" key={blog._id}>
          <img src={blog.photo} alt="" />
          <h2>{blog.title.substring(0, 50)}...</h2>
          <button className="menu-btn" onClick={() => handleBlogClick(blog._id)}>
            Read More
          </button>
        </div>
      ))}
    </div>
  );
}

export default Menu;
