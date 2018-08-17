import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './App.css'
import { log } from 'ruucm-util'
import axios from 'axios'

var foursquare = require('react-foursquare')({
  clientID: 'WSORB05B0YZ5MA33CEXUV5DXNRERO42NZGW14X3GRG4PNVVV',
  clientSecret: 'H3SOXBLZCLREWMGDNRMTGSMZ30ATNK5TWS0PPV05JP1A41SM',
})

var params = {
  ll: '37.7749,-122.4194',
  query: 'Blue Bottle',
}

export default class FoursquareDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
    }
  }

  componentDidMount() {
    axios
      .get('https://api.foursquare.com/v2/venues/explore', {
        params: {
          client_id: 'WSORB05B0YZ5MA33CEXUV5DXNRERO42NZGW14X3GRG4PNVVV',
          client_secret: 'H3SOXBLZCLREWMGDNRMTGSMZ30ATNK5TWS0PPV05JP1A41SM',
          ll: '37.567758,126.9274094',
          // ll: '40.7243,-74.0018',
          query: 'coffee',
          v: '20180323',
          limit: 10,
        },
      })
      .then(response => {
        console.log(response)
        this.setState({
          items: response.data.response.groups[0].items,
        })
      })
      .catch(function(error) {
        console.log(error)
      })
      .then(function() {
        // always executed
      })
  }

  render() {
    return (
      <div>
        <div>Items:</div>
        {log('this.state.items', this.state.items)}
        {this.state.items.map(item => {
          return <div key={item.id}>{item.venue.name}</div>
        })}
      </div>
    )
  }
}

ReactDOM.render(<FoursquareDemo />, document.getElementById('root'))
