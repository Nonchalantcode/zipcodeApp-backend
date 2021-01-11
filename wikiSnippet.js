(function(){
    const selector = '#bodyContent table.wikitable tbody tr';
    const rows     = [...document.querySelectorAll(selector)];
    const results  = { zipCodes: {}, all: [] };
    const allzips  = new Set(); /* Get rid of some of the duplicate zip codes */
    rows.reduce((results, currentRow) => {
      let [department, municipality, zipcode, neighbourhood] = 
          [...currentRow.querySelectorAll('td')].map(td => td.textContent.trim());
      
      /* Handling of special case where value of neighborhood is 'Master code'. See postal code 10000 or the ones above 15100 for an example */
      neighbourhood = neighbourhood === 'Master code' ? 'Unknown / NA' : neighbourhood
      /* If it's a duplicate zip code such as 11002, just add the value of neighbourhood to the existing one */
      if(results.zipCodes[zipcode]) {
        results.zipCodes[zipcode].neighbourhood += `, ${neighbourhood}`;
      } else {
        results.zipCodes[zipcode] = { department, municipality, neighbourhood };
      }
      allzips.add(zipcode)
      return results;
    }, results);
    results.all = [...allzips];   /* Turn the set back into an array */
    return JSON.stringify(results); /* Serialize data */
}())