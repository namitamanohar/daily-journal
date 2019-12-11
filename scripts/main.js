import EntryListComponent from "./JournalEntryList.js";
import { getEntries } from "./JournalDataProvider.js";
import journalFormComponent from "./JournalEntryForm.js";

journalFormComponent()

getEntries().then(
  () => EntryListComponent()
)
