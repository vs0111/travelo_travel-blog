import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "../../utils/axios";
import user from '../../assets/images/user.png'
import { Link } from "react-router-dom";

function Testimonial() {
  const [popularAuthor, setPopularAuthor] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlider: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const getPopularAuthor = async () => {
      try {
        const res = await axios.get('/popularAuthor');
        setPopularAuthor(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPopularAuthor();
  }, []);

  return (
    <Slider {...settings}>
      {popularAuthor.length > 0 ? (
        popularAuthor.map((author) => (
          <div key={author._id} className="testimonial py-4 px-3">
            <p>
              Meet {author.name}, an avid traveler, and storyteller.
              With a passion for exploring the world and an insatiable wanderlust.
            </p>
            <div className="d-flex align-items-center gap-4 mt-3">
              {
                author.photo?
                <img
                src={author.photo}
                className="w-25 h-25 rounded-2"
                alt=""
              />:
              <img
                src={user}
                className="w-25 h-25 rounded-2"
                alt=""
              />
              }
              <div>
                <Link to={`/author/${author._id}`} style={{textDecoration:"none"}}><h5 className="mb-0 mt-3" style={{fontFamily:"inherit",fontSize:"20px",fontWeight:"400"}}  >{author.name}</h5></Link>
                <p>Author</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No popular authors found.</div>
      )}
    </Slider>
  );
}

export default Testimonial;
