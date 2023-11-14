## What I've Learned
- Don't use design patterns unless you think it's actually neccessary. Design patterns are useful, but not if you haven't considered your requirements and scope carefully. Design patterns can make code unflexible and complex, and if you're on a time crunch, cause you to try to find workarounds the design pattern, resulting in overall much worse code. 
- How to use the javascript debugger in the Google Chrome
- Figuring out how to plan a project when you only have the frontend code. Requirements and scope need to be very well defined because you'll also need to figure out how each feature will interact with each other when they are integrated together.

## Challenges
- Getting AI to implemment design patterns that I wanted to incorporate into my code
- If your code is unconventional in its design, AI easily forget the design and struggle to implement it.
- Figuring out how to redesign / or workaround a design pattern when its been misused.
- Debugging javascript using the web browser.
- Coming up with a project plan when you don't have much code to go off of.
- Figuring out Pawn movement and capture. The is unlike the other pieces where it's movement and capture patterns are both completely different. For the other chess pieces, the movement is the exact same as their capture pattern. For the pawn, they move straight, or when they capture they move diagonally. 


## How I managed complexity
- I limited the scope of the project to completing piece movements, check, and checkmate. I didn't implement specific movement rules like Castling and En passent. I didn't implement specific conditions like stalemate, timeout and forfeit. I also didn't implement any functionality for the buttons on the sidebar.
- Used design patterns to decrease coupling. Specifically, the Observer design pattern was used in GameLogic and the chessboard.
- Represented chessboard, GameLogic, and chess pieces as classes, viewing them in an OOP perspective to reduce complexity. 

## Final Product vs Initial Design
- The code for the final product is more messy than the code for the initial design.
- The GameLogic class is way too big and has too many responsibilities. Should have divided GameLogic into other seperate classes, with their own responsibilities.
- The chessboard and chesspiece classes and match the size and complexity of what was envisioned in the initial design.
- Since pieces of GameLogic was written by AI and seemed to work, I left that code mostly untouched, because the system was getting too large, and if I refactored the code, it might introduce unwanted bugs into the current system. So, I left some of the AI code untouched and just created new code to work around it. 

## Reflection on AI
- It's not that easy to get AI to write your code, especially if you've designed your system and it's very intricate.
- Careful automatic testing should be used in conjunction with AI code, simply copy pasting in AI code even if you understand how it works, can be very dangerous because it introduce a bug that you and the AI did not consider.
- AI is pretty good at writing boilerplate code or a very high level algorithm on how you could accomplish something. You can use it to write some simple boilerplate code for CSS and Javascript. 
- AI can style your CSS. But it's quite ugly. Can be useful if you need to get something out very quickly.
- You can ask AI for advice on the design of the system, but it's not too great at implementing it, especially if the system involves multiple design patterns
- AI will make certain assumptions about your code that it will not tell you about, make sure to explicitly tell it that it needs to be careful of certain things.