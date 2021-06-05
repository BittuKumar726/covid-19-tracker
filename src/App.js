import React, { Component } from "react";

import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";

import coronaImage from './assets/image.png';
class App extends Component {
  state = { data: {}, country:''};

  async componentDidMount(){
    const fetchedData = await fetchData();
    this.setState({data: fetchedData});
  }
  
  handleChange = async ( country ) => {
  const fetchedData = await fetchData(country)

  this.setState({data: fetchedData, country: country});

  }

  render() {
    const{ data, country } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt="COVID-19" />
        <Cards data={data} />
        <CountryPicker handleChange={this.handleChange}/>
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;
