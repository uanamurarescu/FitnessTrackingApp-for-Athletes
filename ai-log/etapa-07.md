# Stage 7: AI log
## Tools
- <Claude Pro>
## Conversations
- <https://claude.ai/share/26212da4-af77-4586-8cb9-c65dcd013a95> (<Guidance, without generated code, for the Supplements_AddForm validation and for the App.jsx functions that talk to the API>)
## Key requests
### 1. <Supplements_AddForm input validation>
- Asked: <Guide me, without generated code, to write a function that validates the form before the async submit: supplement name, dose written as "number + unit" and the meal chosen from the dropdown. It should check that each field is filled in, that it does not exceed a maximum number of characters, that the dose has the right format and that a meal was selected.>
- Got: <A step-by-step plan: trim the values first, check in the order empty → too long → wrong format, keep the limits as constants, validate the dropdown against the list of meals, stop before the request if there is an error, and send the trimmed values to the server. It also suggested returning an object with one error per field, checking that the number is greater than 0 and clearing the error while typing.>
- Changed or rejected: <I kept a single error message shown next to the form, as in the lab guide, instead of an object with one error per field. I did not add the "greater than 0" check or the clearing of the error while typing. I accepted the rest of the guidance and implemented it.>
### 2. <General pattern for the dose format>
- Asked: <Is there a model syntax I can use to check, in general, that the dose is written correctly as a number followed by g / mg?>
- Got: <The regular expression /^\d+([.,]\d+)?\s?(g|mg|mcg)$/i, with every part explained (anchors, digits, optional decimals, optional space, list of units, case-insensitive flag), examples that pass and fail, how to adapt it, and how to use it with the .test() method on the trimmed value.>
- Changed or rejected: <I added IU and ml to the list of units, because my data has doses such as "2000 IU". I used the pattern with .test(), as explained.>
### 3. <App.jsx functions that link the form and the list to the API>
- Asked: <Guide me, without generated code, to write addSupplement, toggleSupplement and removeSupplement in App.jsx and to connect them in JSX. I described my rules: the request goes to the server first and the state changes after, the state gets the object returned by the server, addSupplement has no try/catch so the error reaches the form, toggle and delete have try/catch and use setError, PATCH sends only { taken: !value }, and all updates are immutable.>
- Got: <The steps of each function in words: await the API call, then update the state with (prev) => ... using spread, find + map, or filter; why the error from addSupplement travels back to the form; how to pass the functions as props without calling them, with the form given to the list through children; and a final list of checks in the browser and in the Network tab.>
- Changed or rejected: <Nothing rejected. From the optional suggestions I used only the reset of the old error message after a successful toggle or delete.>

## What I learned / what did not work
<I understood why the request has to be sent to the server before the state is changed and why the list must use the object returned by the server (the id is generated there). I also learned how to read and build a regular expression piece by piece and how an error thrown in App.jsx reaches the form when the function has no try/catch. What did not fit my project was the object with one error per field: the lab guide and the automatic check expect a single form-error message, so I kept one message.>