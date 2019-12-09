import EntryListComponent from "./JournalEntryList.js";
import { getEntries } from "./JournalDataProvider.js";

getEntries().then(
  () => EntryListComponent()
)

