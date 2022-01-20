import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from './post';

class Home extends React.Component {
  constructor(props) {
    // Initialize mutable state
    super(props);
    this.state = {
      results: [],
      hasMore: true,
      length: 0,
      next: 1,
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    // This line automatically assigns this.props.url to the const variable url
    const url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=hqtZZggdTfa0iBef9HhRnfPismhfKnjkumciboC5';

    // Call REST API to get the post's information
    fetch(url, { 
      method: "GET",
      withCredentials: true,
      creditials: 'same-origin',
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);
      console.log('received');
      return response.json();
    })
    .then((data) => {
      console.log('handled!');
      this.setState({
        results: data.photos,
        length: this.state.results.length,
        next: this.state.next + 1,
      });
    
     
    })
    .catch((error) => console.log('failed to fetch', error));
  }

  fetchData() {
    // if next is nothing -> show end message
    const { next, results } = this.state;
    console.log('Check next:', next);
    if (next >= 35) {
      console.log('next is empty');
      this.setState({
        hasMore: false,
      });
      return;
    }
    console.log('next is not empty');
    this.setState({
      hasMore: true,
    });

    // Load and display the next 10 posts use asynch function
    // call fetch
    let front = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=';
    let back = '&api_key=hqtZZggdTfa0iBef9HhRnfPismhfKnjkumciboC5';
    const url = front + next + back;

    fetch(url, { credentials: 'same-origin' })
    // this 'then()' is the same for all
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      // changes state (does something to the DOM)
      .then((data) => {
        console.log('update state', data.photos);
        this.setState({
          length: results.length,
          next: this.state.next + 1,
          results: results.concat(data.photos),
        });
      })
      // error handle
      .catch((error) => console.log(error));
  }

  render() {
    const { posts, length, hasMore } = this.state;
    console.log('feed rendering');
    console.log('results', posts);
    // console.log("postid array: ", postid);

    // Render number of post image and post owner
    return (
      <div className="feed">
        <InfiniteScroll
          dataLength={length}
          next={this.fetchData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={(
            <p>
              <b>
                Yay! You have seen all
                {posts.length}
                posts
              </b>
            </p>
          )}
        >
          { posts.map((post) => <Post postInfo={post} key={post.postid} />) }
        </InfiniteScroll>
      </div>
    );
  }
}

export default Home;

// { data.map((user, i) => (
//     <Event 
//       visitInfo={user}
//       key={i}
//     />
//   ))}