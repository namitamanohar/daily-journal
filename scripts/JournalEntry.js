/*
 *  Purpose: To render a single journal entry as an
 *           HTML representation of the data
 */
const JournalEntryComponent = (entry) => {
  return `
      <section id="entry--${entry.id}" class="journalEntry">
         <h4 class='date'>${entry.date}</h4>
         <p class='journalText'>${entry.entry}</p>
      </section>
      <hr>
  `
}

export default JournalEntryComponent