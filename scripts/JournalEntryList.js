/*
 *  Purpose:
 *    To render as many journal entry components as
 *    there are items in the collection exposed by the
 *    data provider component
 */
import { useJournalEntries, getEntries, deleteEntry } from "./JournalDataProvider.js"
import JournalEntryComponent from "./JournalEntry.js"

// DOM reference to where all entries will be rendered
const entryLog = document.querySelector("#entryLog")
const eventHub= document.querySelector('.container')
const EntryListComponent = () => {
    // Use the journal entry data from the data provider component
    

    eventHub.addEventListener("click", clickEvent =>{
      if (clickEvent.target.id==="showJournalEntries"){
        getEntries().then(
          () =>{
            const entries=useJournalEntries()
            render(entries)
          }
        )
      }
    })
    eventHub.addEventListener("click", clickEvent => {
      if (clickEvent.target.id.startsWith("deleteEntry--")) {
          const [prefix, id] = clickEvent.target.id.split("--")
  
         deleteEntry(id).then(() => render(useJournalEntries()) )
      }
  })

    eventHub.addEventListener("click", clickEvent=>{
      if(clickEvent.target.value==="happy"){
        const entries=useJournalEntries()
        const filteredMoodArray=entries.filter(
          (individualEntry)=>{
            if(individualEntry.mood==="happy"){
              return individualEntry
            }
        })
        render(filteredMoodArray)
      }
      if(clickEvent.target.value==="neutral"){
        const entries=useJournalEntries()
        const filteredMoodArray=entries.filter(
          (individualEntry)=>{
            if(individualEntry.mood==="neutral"){
              return individualEntry
            }
        })
        render(filteredMoodArray)
      }
      if(clickEvent.target.value==="sad"){
        const entries=useJournalEntries()
        const filteredMoodArray=entries.filter(
          (individualEntry)=>{
            if(individualEntry.mood==="sad"){
              return individualEntry
            }
        })
        render(filteredMoodArray)
      }
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