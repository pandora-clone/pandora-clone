import React, { Component } from "react";

class Search extends Component {
    constructor(props){
      super(props);
      this.state = {
          searchParams: ''

      }
  }
  setStateHandler = e => {
    this.setState({searchParams: e.target.value})
  };
  render() {
    const {searchParams} = this.state;
    return (
      <div>
        <input
            placeholder="Search here..."
            value={searchParams}
            onChange={(e) => this.setStateHandler(e)}
            type="text"
            name="searchParams"
        />
        this is Search page
      </div>
    );
  }
}

export default Search;
