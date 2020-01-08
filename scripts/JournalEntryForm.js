import { saveEntry, useJournalEntries, editEntry } from "./JournalDataProvider.js";
import EntryListComponent from "./JournalEntryList.js";

const contentTarget=document.querySelector(".journalForm")
const eventHub=document.querySelector(".container")

const journalFormComponent = () => {
  
  eventHub.addEventListener("keypress", event=>{
    if(event.target.id==="searchInput"){

      if(event.key==="Enter"){
        const searchText=document.querySelector("#searchInput").value
        console.log(searchText)
        const message = new CustomEvent("searchInitiated",{
          detail:{
            searchText:searchText
          }
        })
        eventHub.dispatchEvent(message)
      }

    }
  })

  eventHub.addEventListener("editButtonClicked", event =>{
    const entryToBeEdited=event.detail.entryId 

    const allEntries=useJournalEntries()

    // make custom event that capture what was put in the search bar 




    const foundEntry =allEntries.find(
      (individualEntry) =>{
        return individualEntry.id=parseInt(entryToBeEdited,10)
      }
    )
    console.log(foundEntry.date)
    document.querySelector("#journalDate").value=foundEntry.date
    document.querySelector("#conceptsCovered").value=foundEntry.concept
    document.querySelector("#journalEntry").value=foundEntry.entry
    document.querySelector("#moodDropdown").value=foundEntry.mood
  })

  eventHub.addEventListener("click", clickEvent =>{
    
    if(clickEvent.target.id==="saveJournalEntry"){
      const hiddenInputValue=document.querySelector("#entryId").value
      if(hiddenInputValue!=""){
        const editedNote ={
          "id":parseInt(document.querySelector('#entryId').value,10),
          "date":document.querySelector('#journalDate').value,
          "concept":document.querySelector('#conceptsCovered').value,
          "entry":document.querySelector('#journalEntry').value,
          "mood":document.querySelector('#moodDropdown').value
        }
        editEntry(editedNote).then(()=>{
          eventHub.dispatchEvent(new CustomEvent("entryHasBeenEdited"))
        })


      } else {

        clickEvent.preventDefault()

        const newEntry = {
          "date":document.querySelector("#journalDate").value, 
          "concept":document.querySelector("#conceptsCovered").value,
          "entry":document.querySelector("#journalEntry").value,
          "mood":document.querySelector("#moodDropdown").value,
        }
  
        saveEntry(newEntry).then(()=>document.getElementById("entryForm").reset()).then(
          ()=>{
              const message =new CustomEvent("entryCreated")
              eventHub.dispatchEvent(message)   
          }
          )
      }

      }

    })

 

  const render = () => {
    contentTarget.innerHTML =`
      <form id="entryForm">
      <fieldset>
      <input type="hidden" name="entryId" id="entryId">
        <label for="journalDate">Date of Entry</label>
        <input type="date" name='journalDate' id='journalDate'>
      </fieldset>
      <fieldset>
        <label for="conceptsCovered">Concepts Covered</label>
        <input type="text" name='conceptsCovered' id='conceptsCovered'>      
      </fieldset>
      <fieldset>
        <label for="journalEntry">Journal Entry</label>
        <textarea id="journalEntry" rows="4" cols="50" name="journalEntry">
        </textarea>
      </fieldset>
      </form>
      <fieldset>
        <label for="moodForTheDay">Mood for The Day</label>  
        <select id="moodDropdown" name="moodForTheDay">
            <option value="" selected disable hidden>Select Your Mood</option>
            <option value="happy">Happy</option>
            <option value="neutral">Neutral</option>
            <option value="sad ">Sad</option>
        </select>    
      </fieldset>
      <section class="buttonClick">
        <button class="buttonGroup" id="saveJournalEntry">Record your journal entry</button>
        <button class="buttonGroup" id="showJournalEntries">Show Old Journal Entries</button>
      </section>
      <fieldset class="moodFilter">
      <p class="moodFilter__name">Filter Journal Entries By Mood</p>
      <div class="moodFilter__radio">
        <input type="radio" id="moodChoice1" name="mood" value="happy">
        <label for="moodChoice1">Happy</label>
        <input type="radio" id="moodChoice2" name="mood" value="neutral">
        <label for="moodChoice2">Neutral</label>  
        <input type="radio" id="moodChoice3" name="mood" value="sad">
        <label for="moodChoice3">Sad</label>
        <br>
      </div>
      <div class="searchBar">
      <input id="searchInput" type="text" placeholder="Search.." >
      </div>
      </fieldset>
        `
  }
  
  render()
}

export default journalFormComponent 