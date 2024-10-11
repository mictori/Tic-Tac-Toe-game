## Task:

-   Use modules(IIFEs) and factures. A single instance of something (e.g. the Gameboard, the ScreenController etc.) should be wrapped inside an IIFE (revealing module pattern) so it cannot be reused to create additional instances.

-   Store the gameboard as an array inside of a GameBoard module. Players are going to be stored in GameController module. The ScreenController module should take some data about the game, such as the state of the game board and which player's turn it is, and update the screen each time a player takes their turn.

-   todos:

*   create player constructor with methods which give messages
