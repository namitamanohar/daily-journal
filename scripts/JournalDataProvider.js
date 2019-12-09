let entries =[]

export const getEntries = () => {

  console.log("about to get data")
 return fetch("http://localhost:3000/entries") 
  .then(response => response.json())  // Parse as JSON
  .then(parsedEntries => {
    entries=parsedEntries.slice()
      console.log(entries)
  })
}




export const useJournalEntries = () => {


  const sortedByDate = entries.sort(
      (currentEntry, nextEntry) =>
          Date.parse(currentEntry.date) - Date.parse(nextEntry.date)
  )
  return sortedByDate
}