import { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import done from "../assets/done.gif"

const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  
  const cap = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30)
    let parsedData = await data.json()
    props.setProgress(70)
    // console.log(parsedData, 1)
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100)
  }

  useEffect(() => {
    document.title = `${cap(props.category)} - NewsInternational`;
    updateNews();
    // eslint-disable-next-line no-use-before-define
  }, [])

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData, page)
    setPage(page + 1)
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };

  return (
    <>
      <h2 style={{ margin: '40px', marginTop: '90px' }}>NewInternational - Top {cap(props.category)} Headlines </h2>
      {loading && <Spinner />}
      <hr />
      <InfiniteScroll
        dataLength={articles.length}
        loader={<Spinner />}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        endMessage={<img src={done} alt="Ends Here" width={1220} height={600} />}
      >
        <div className="container">
          <div className="row d-flex flex-wrap justify-content-center">
            {articles.map((element) => {
              return <div className="col md-4" key={element.url + Date.now()}>
                <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage ? element.urlToImage : "https://www.gannett-cdn.com/presto/2023/06/28/USAT/1ae86d68-7784-451b-b6a2-aa8558ba0e97-AP23178343313246.jpg?auto=webp&crop=2080,1170,x0,y372&format=pjpg&width=1200"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  )
}


News.defaltProps = {
  country: 'in',
  pageSize: 4,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string,
  setProgress:PropTypes.func
}


export default News