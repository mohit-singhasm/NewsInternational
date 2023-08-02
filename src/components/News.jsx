import { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import done from "./done.gif"

export class News extends Component {
  articles = []
  static defaltProps = {
    country: 'in',
    pageSize: 4,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string,
    // setProgress:PropTypes.number
  }
  cap = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props)
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.cap(this.props.category)} - NewsInternational`;
  }

  async updateNews() {
    this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({ loading: true })
    let data = await fetch(url);
    this.props.setProgress(30)
    let parsedData = await data.json()
    this.props.setProgress(70)
    // console.log(parsedData, 1)
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100)
  }

  componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async () => {
    // this.setState({ page: this.state.page + 1, })
    // console.log(this.state.page)

    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData, this.state.page)
    this.setState({
      page: this.state.page + 1,
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    })
  };

  render() {
    return (
      <>
        <h2 style={{ margin: '40px' }}>NewInternational - Top {this.cap(this.props.category)} Headlines </h2>
        {this.state.loading && <Spinner />}
        <hr />
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
          endMessage={ <img src={done} alt="Ends Here" width={1220} height={500}/> }
          >
          <div className="container">
            <div className="row d-flex flex-wrap justify-content-center">
              {this.state.articles.map((element) => {
                return <div className="col md-4" key={element.url}>
                  <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage ? element.urlToImage : "https://www.gannett-cdn.com/presto/2023/06/28/USAT/1ae86d68-7784-451b-b6a2-aa8558ba0e97-AP23178343313246.jpg?auto=webp&crop=2080,1170,x0,y372&format=pjpg&width=1200"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    )
  }
}

export default News