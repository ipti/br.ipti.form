
export function controllerYears() {
    const date = new Date(Date.now());
    
      const years = date.getMonth() >= 10 ? (date.getFullYear() + 1) - 2021 : date.getFullYear() - 2021; 
      
      let yearsOptions: Array<{value: number}> | undefined = [];
    
      for(var i = 0; i <= years; i++){
        yearsOptions = [
          ...(yearsOptions || []),
          {value: (2021 + i)}
        ]
      }
    
      return {yearsOptions}
}