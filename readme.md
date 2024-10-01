## Task:

-   Store the gameboard as an array inside of a Gameboard object
-   Players are also going to be stored in objects
-   Object to control the flow of the game itself
-   `Include logic that checks for when the game is over
-   Should be checking for all winning 3-in-a-rows and ties
-   Once the console game is working, an object that will handle the display/DOM logic(function that will render the contents of the gameboard array to the webpage)
-   Tucking as much as possible inside factories
-   A single instance of something (e.g. the gameboard, the displayController etc.) should be wrapped inside an IIFE (module pattern) so it cannot be reused to create additional instances.

### Note

-   Clear the DOM of the current board, div's text content to an empty string.
-   Get the most up-to-date board
-   Get the most up-to-date active player
-   Render the player's turn
-   Render each grid square on the DOM
-   The cells are buttons(anything clickable should be a button or link)
