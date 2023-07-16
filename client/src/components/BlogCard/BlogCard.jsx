import React from "react";
import "./blog-card.css";
import { Link } from "react-router-dom";

export const BlogCard = ({ blog }) => {
  // console.log(blog);
  // console.log("Yes you Can...");

  function formatDateTime(dateTime) {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateTime).toLocaleString(undefined, options);
  }

  const formattedDateTime = formatDateTime(blog.createdAt);

  return (
    <>
      <section className="popularPost">
        {/* <Heading title='Popular Posts' /> */}
        <div className="content" style={{ width: "360px" }}>
          <div className="items">
            <div className="box shadow">
              <div className="images">
                <div className="img">
                  <img style={{ width: "360px" }} src={blog.photo} alt="" />
                </div>
                <div class="category category1 ">
                  <p style={{ paddingLeft: "5px",marginTop:"-5px" }}>
                    <i class="ri-map-pin-fill"></i> {blog.location}
                  <i style={{paddingLeft:"170px"}} class="ri-eye-line"> {blog.views.length}</i>
                  <i style={{paddingLeft:"30px"}} class="ri-thumb-up-fill"> {blog.likes.length}</i>
                  </p>
                </div>
              </div>
              <div className="text">
                <h5 className="title"><Link className="link" to={`/singlePost/${blog._id}`} >{blog.title.substring(0, 30)}...</Link> </h5>
                <div
                  className="contents"
                  dangerouslySetInnerHTML={{
                    __html: `${blog?.content.substring(0, 150)}${
                      blog?.content.length > 300 ? "..." : ""
                    }`,
                  }}
                ></div>
                <div className="date">
                  <i class="fas fa-calendar-days"></i>
                  <label>{formattedDateTime}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default BlogCard;
