import './gallery.css'
import SideBar from '../../components/gallerySideBar/SideBar';
import Feed from '../../components/galleryFeed/Feed';
import RightBar from '../../components/galleryRightBar/RightBar';

function Gallery() {
  return (
    <>
    <div className="galleryContainer">
    <SideBar/>
    <Feed/>
    <RightBar/>

    </div>
    </>
  )
}

export default Gallery;