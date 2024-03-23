import PropTypes from 'prop-types'

const NewsItem = (props) => {
    let { title, description, imgUrl, newsUrl, author, date,source } = props
    return (
      <div>
        <div className="card my-3" style={{ width: "350px" }}>
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%', zIndex:'1'}} >{source}</span>
          <img src={imgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title} </h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary">By {author ? author : 'Unknown'} on {new Date(date).toDateString()} </small></p>
            <a href={newsUrl} target='_blank' rel='noreferrer' className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>
    )
}

export default NewsItem

NewsItem.propTypes = {
  title : PropTypes.string,
  description : PropTypes.string, 
  imgUrl: PropTypes.string,
  newsUrl: PropTypes.string,
  author: PropTypes.string,
  date: PropTypes.string,
  source: PropTypes.string, 
}
