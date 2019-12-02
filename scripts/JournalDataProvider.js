/*
 *   Journal data provider for Daily Journal application
 *
 *      Holds the raw data about each entry and exports
 *      functions that other modules can use to filter
 *      the entries for different purposes.
 */

// This is the original data. Can't Touch This.
const journal = [
  {
      date: "11/15/19",
      concept: "HTML & CSS",
      entry: "We talked about HTML components and how to make grid layouts with Flexbox in CSS.",
      mood: "Ok"
  },
  {
      date: "11/19/19",
      concept: "Javascript",
      entry: "We incorporated JS into Martin's aquarium using dialog boxes with query selector and add event.",
      mood: "Good"
  },
  {
      date: "11/22/19",
      concept: "Javascript + dynamic html",
      entry: "We took our original HTML from martin's aquarium and instead created an object to then push into a string template",
      mood: "Ok"
  }
]

/*
  You export a function that provides a version of the
  raw data in the format that you want
*/
export const useJournalEntries = () => {
  const sortedByDate = journal.sort(
      (currentEntry, nextEntry) =>
          Date.parse(currentEntry.date) - Date.parse(nextEntry.date)
  )
  return sortedByDate
}