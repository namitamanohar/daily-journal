let entries =[]


export const saveEntry = entry => {
  return fetch('http://localhost:3000/entries', {
       method: "POST",
       headers: {
           "Content-Type": "application/json"
       },
       body: JSON.stringify(entry)
   })
   .then(getEntries)
 }
 



export const getEntries = () => {

  console.log("about to get data")
 return fetch("http://localhost:3000/entries") 
  .then(response => response.json())  // Parse as JSON
  .then(parsedEntries => {
    entries=parsedEntries.slice()
  })
}




export const useJournalEntries = () => {

  const sortedByDate = entries.sort(
      (currentEntry, nextEntry) =>
          Date.parse(currentEntry.date) - Date.parse(nextEntry.date)
  )
  return sortedByDate
}