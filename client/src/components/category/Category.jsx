import './category.css'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import { GrFormPrevious } from "react-icons/gr"
import { MdNavigateNext } from "react-icons/md"
import img1 from "../../assets/images/gallery-01.jpg"
import { Container } from 'reactstrap'

const SampleNextArrow = (props) => {
  const { onClick } = props
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='next'>
        <MdNavigateNext className='icon' />
      </button>
    </div>
  )
}
const SamplePrevArrow = (props) => {
  const { onClick } = props
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='prev'>
        <GrFormPrevious className='icon' />
      </button>
    </div>
  )
}
 const Category = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  }

  const category = [
  {
    id: 1,
    category: "Life",
    title: "Stay Calm And Surf",
    cover:img1,
  },
  {
    id: 2,
    category: "Fashion",
    title: "Becoming a Dragonfly",
    cover: "../images/category/ca2.png",
  },
  {
    id: 3,
    category: "Travel",
    title: "There's always light at the end of the tunnel",
    cover: "../images/category/ca3.png",
  },
  {
    id: 4,
    category: "Sport",
    title: "Stay Calm And Surf",
    cover: "../images/category/ca4.png",
  },
  {
    id: 5,
    category: "Fun",
    title: "There's always light at the end of the tunnel",
    cover: "../images/category/ca5.png",
  },
  {
    id: 6,
    category: "Health",
    title: "Becoming a Dragonfly",
    cover: "../images/category/ca6.png",
  },
  {
    id: 7,
    category: "Business",
    title: "Stay Calm And Surf",
    cover: "../images/category/ca7.png",
  },
  {
    id: 8,
    category: "Technology",
    title: "There's always light at the end of the tunnel",
    cover: "../images/category/ca8.png",
  },
]

  return (
    <>
    <Container>
      <section className='categories'>
        <div className=''>
          <Slider {...settings}>
            {category.map((item) => (
              <div className='boxs'>
                <div className='box' key={item.id}>
                  <img src={item.cover} alt='cover' />
                  <div className='overlay'>
                    <h4>{item.category}</h4>
                    <p>{item.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
      </Container>
    </>
  )
}
export default Category;
