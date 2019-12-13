import { saveEntry } from "./JournalDataProvider.js";
import EntryListComponent from "./JournalEntryList.js";

const contentTarget=document.querySelector(".journalForm")
const eventHub=document.querySelector(".container")

const journalFormComponent = () => {

  eventHub.addEventListener("click", clickEvent =>{

    if(clickEvent.target.id==="saveJournalEntry"){
      clickEvent.preventDefault()
      console.log("the click event is working")
      const newEntry = {
        "date":document.querySelector("#journalDate").value, 
        "concept":document.querySelector("#conceptsCovered").value,
        "entry":document.querySelector("#journalEntry").value,
        "mood":document.querySelector("#moodDropdown").value,
      }

      saveEntry(newEntry).then(()=>document.getElementById("entryForm").reset()).then(()=>EntryListComponent())
    }

  })

  // eventHub.addEventListener("click", clickEvent =>{
  //   if(clickEvent.target.id==="showJournalEntries"){
  //     const message =new CustomEvent("showJournalEntriesButtonClicked")

  //     eventHub.dispatchEvent(message)
  //   }
  // })

  const render = () => {
    contentTarget.innerHTML =`
    
      <fieldset>
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
      </div>
      </fieldset>
        `
  }
  
  render()
}

export default journalFormComponent 