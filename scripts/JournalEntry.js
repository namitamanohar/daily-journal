/*
 *  Purpose: To render a single journal entry as an
 *           HTML representation of the data
 */
const JournalEntryComponent = (entry) => {
  return `
      <section id="entry--${entry.id}" class="journalEntry">
         <h4 class='date'>${new Date(entry.date).toLocaleDateString('en-US')}</h4>
         <div class='journalConcept'>${entry.concept}</div>
         <hr>
         <div class='journalText'>${entry.entry}</div>
         <hr>
         <div class='journalMood'>${entry.mood}</div>
         <button id="deleteEntry--${entry.id}">Delete Entry</button>
         <button id="editEntry--${entry.id}">Edit</button>
      </section>
      <hr>
  `
}

export default JournalEntryComponent