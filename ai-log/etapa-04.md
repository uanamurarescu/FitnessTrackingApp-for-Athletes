# Stage 4: AI log
## Tools
- <Claude Pro (Anthropic), copilot in VSCode>
## Conversations
- <https://claude.ai/share/afd919b2-0e4b-4d5b-8774-1878f77d546e> (<Implementing the dashboard design and the Quick Food Tracker in React>)
## Key requests
### 1. <Implementing the AddForm to the quick_food_tracker.js>
- Asked: <How can i create an Add Form, which lets me add a new food into an JS array named Quick Food Tracker?>
- Got: <An example of a general code which can be modified according to my needs.>
- Changed or rejected: <Changed the general code according to my project.>
### 2. <Useful React functions>
- Asked: <What is the purpose of useState and useEffect in React?>
- Got: <useState gives a component memory and useEffect runs code after React has rendered the page.>
- Changed or rejected: <Nothing, as I wanted to know how they influence my code.>
### 3. <Implementing the desired design into the AddForm and solving the webpage refresh errors.>
- Asked: <How can i apply this exact design to my AddForm and how to solve the error of deleting the modification added to the webpage after refreshing the webpage? How to implement the CSS design of the AddForm as a separated from the index.css or App.css CSS file?>
- Got: <A CSS file for the AddForm created according to the photo of the desired design and an 2 JSX files - one implementing the AddForm and the other implementing a parent component in which the AddForm is called.>
- Changed or rejected: <Accepted the CSS file, but changing it a bit according to my design prefences; Rejected the AddForm JSX file as i already have it and rejected the FoodTracker JSX as it is not needed since i call the component in the App.jsx file.>
### 4. <Creating a grid out of the MEAP_OPTIONS list, in which can be added a new meal through the AddForm or deleted by clicking on a button.>
- Asked: <How can i implement a grid of 6 columns (breakfast, lunch, dinner, snack-1. snack-2, snack-3), made out of my predefined MEAL_OPTIONS list from AddForm, under the rest of the previous webpage design? I want a certain coloring design for the grid (photo sent).>
- Got: <Updated CSS & JSX files based on the deisgn i wanted to implement.>
- Changed or rejected: <Accepted the CSS file, but changed some design elements according to my current design on the webpage. Accepted the AddForm JSX file, but only took the changed code from it and adapted it to my project. Rejected the rest of them.>
### 5. <Implementing a delete method in the previous MEAL_OPTIONS grid>
- Asked: <Explain to me how to add a delete method of the foods from the grid, like a X button.>
- Got: <General code to implement in steps in each file (App,jsx, Food_TrackList.jsx, Food_TrackCard.jsx) + what does the lines of code do.>
- Changed or rejected: <Adapted the code to my project and debugged errors.>
### 6. <Designing the whole webpage according to the previous deisgn model. >
- Asked: <Explain to me the steps i need to make in order to move the mockup to React components, to split the CSS into index.css and App.css, which elements to move to index.css and which to App.css using a generated guide. No code generated, only the guide covering each step.>
- Got: <A generated Dashboard covering each steps with explanations and CSS suggestions.>
- Changed or rejected: <Asked for constant updates of the dashboard according to elements that were missed (ex: the webpage didnt fit to the window page) or i was not happy about the way they were designed (ex: SVG pictures instead of GoogleFonts ones for icons, changing the position of the AddForm). Acepted the last version of the guide, but adapted it to my desired design.>
### 7. <Automated filling of the words by Copilot>
- Asked: <When i changed the name of a code element or i wanted to add more items in an array, i used the Copilot to fix all of the spaces, where the certain name appeared, or to automated generate another line like the ones above in the array.>
- Got: <Exactly like in the Asked section.>
- Changed or rejected: <After i checked if it was the correct move, i accepted it.>
## What I learned / what did not work
<I understood how to organize the CSS so the design is reused and not repeated, and how to save the data so it stays after refresh, how to create the whole CSS design step by step. What did not work at first was the blank page, which I found and fixed.>