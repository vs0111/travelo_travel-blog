import Posts from '../posts/Posts'
import Share from '../share/Share'
import './feed.css'

function Feed() {
  return (
    <div className='feed'>
        <div className="feedWrapper">

        <Share/>
        <Posts/>
        </div>
        
    </div>
  )
}

export default Feed