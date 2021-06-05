import React, { useEffect, useState } from "react";
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './CountryPicker.module.css';

import { fetchCountries } from '../../api';

const CountryPicker = (props) => {
  const { handleChange } = props;
  const [fetchedCountries, setFetchCountries] = useState([]);

  useEffect(() => {
    const fetchCountry = async () => {
      const countryData = await fetchCountries();
      setFetchCountries(countryData);
    };
    fetchCountry();
  }, [setFetchCountries]);


  return(
    <FormControl className={styles.formControl}>
      <NativeSelect defaultValue='' onChange={(e) =>{handleChange(e.target.value)}}>
        <option value=''>Global</option>
        {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
      </NativeSelect>
    </FormControl>
   )
  }


export default CountryPicker;