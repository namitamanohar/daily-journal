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
    // make the custom event getting id from entry card
  eventHub.addEventListener("entryHasBeenEdited", event =>{
    const updatedEntries=useJournalEntries()
    render(updatedEntries)
  })

// listens to search custom Event 

eventHub.addEventListener("searchInitiated", event =>{
  const searchText=event.detail.searchText.toLowerCase()
  console.log(searchText)
  
  const allEntries=useJournalEntries()

  const matchingEntries = []

for (const entry of allEntries) {
    for (const value of Object.values(entry)) {
      console.log("value",value)
      const valueString=String(value).toLowerCase()
        if (valueString.includes(searchText)) {
            matchingEntries.push(entry)
            console.log("matching Entries",matchingEntries)
          }
          render(matchingEntries)
    }
}

})
    // const filterEntries=allEntries.map((individualEntry)=>{
    //   return Object.values(individualEntry)===searchText})
    //   console.log(filterEntries)



  
  eventHub.addEventListener("click", event =>{
    if(event.target.id.startsWith("editEntry--")){

      const[prefix,id]=event.target.id.split("--")
      const message =new CustomEvent("editButtonClicked",{
        detail:{
          entryId:id
        }
      })
      eventHub.dispatchEvent(message)
    }
  })

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
      const mood=clickEvent.target.value
      if(clickEvent.target.id.startsWith("moodChoice")){
      
        const entries =useJournalEntries()
        
        const filteredMoodArray=entries.filter(
          (individualEntry)=>{
            if(individualEntry.mood===mood){
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