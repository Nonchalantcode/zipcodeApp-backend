(function(){
    const selector = '#bodyContent table.wikitable tbody tr';
    const rows     = [...document.querySelectorAll(selector)];
    const results  = { zipCodes: {}, all: [] };
    rows.reduce((results, currentRow) => {
      let [department, municipality, zipcode, neighbourhood] = 
          [...currentRow.querySelectorAll('td')].map(td => td.textContent.trim());
      
      results.all.push(zipcode);
      results.zipCodes[zipcode] = { department, municipality, neighbourhood };
      return results;
    }, results);
    return JSON.stringify(results);
}())