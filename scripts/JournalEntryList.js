/*
 *  Purpose:
 *    To render as many journal entry components as
 *    there are items in the collection exposed by the
 *    data provider component
 */
import { useJournalEntries, getEntries } from "./JournalDataProvider.js"
import JournalEntryComponent from "./JournalEntry.js"

// DOM reference to where all entries will be rendered
const entryLog = document.querySelector("#entryLog")
const eventHub= document.querySelector('.container')
const EntryListComponent = () => {
    // Use the journal entry data from the data provider component
    
    eventHub.addEventListener("showJournalEntriesButtonClicked",event =>{
      getEntries().then(
        ()=>{
          const entries=useJournalEntries()
          render(entries)
        }
      )
    })

    
    const render = (entryCollection) =>{

      entryLog.innerHTML = `
     
          ${
            entryCollection.map(
              (entry) =>{
                return JournalEntryComponent(entry)
              }
            ).join("")
              }
        
        
      `
    }
}
export default EntryListComponent