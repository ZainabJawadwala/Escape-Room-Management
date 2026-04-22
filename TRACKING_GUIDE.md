# Game Registration & Tracking System Guide

## What's Improved

Your Escape Room Management system now includes a complete **Game Registration and Tracking** system. Here's what has been added:

### 1. **Automatic Game Registration**
- When you complete a booking form submission, the game is automatically registered
- Each registration includes: team name, email, room theme, player count, date, time, and timestamp

### 2. **Track Only Your Games**
- The Track Games section now displays **only games you've actually booked**
- No more dummy/hardcoded games - only real registrations appear
- Each game card shows:
  - Room name and status
  - Team name and email
  - Player count
  - Booking date and time
  - Live countdown timer
  - Puzzle progress indicator

### 3. **Complete Registration History**
- Every game registration is stored locally in your browser
- Access the full history of all games (active and completed)
- View when games were registered and their final status

## How to Use

### Booking a Game
1. Go to "📅 Book Rooms" tab (or visit book.html)
2. Fill in all booking details:
   - Team name and email
   - Select room theme
   - Number of players
   - Booking date and time
3. Click **"Confirm Booking"**
4. The game is automatically registered and appears in tracking

### Tracking Games
1. Click the **"🎮 Track Games"** tab
2. You'll see all your registered games:
   - Only games YOU registered will appear
   - Live timer counts down
   - Progress updates show puzzles solved
3. Actions available:
   - **Send Hint** - Send messages to the team
   - **Stop Game** - End a game session (moves to history)

## Behind the Scenes

### GameRegistry Class
A new `GameRegistry` class handles all registration and tracking:

**Methods:**
- `registerGame(bookingData)` - Creates a new game from booking
- `getActiveGames()` - Returns all currently active games
- `getHistory()` - Returns complete game history
- `updateGameProgress(gameId, puzzlesSolved)` - Updates progress
- `endGame(gameId)` - Completes a game and moves to history
- `clearAll()` - Reset all data

### Data Storage
- **Active Games**: Stored in localStorage as `registeredGames`
- **Game History**: Stored in localStorage as `gameHistory`
- Both persist between browser sessions

## Features

✅ Register games from bookings  
✅ Track only registered games  
✅ Live countdown timers  
✅ Progress tracking  
✅ Game history  
✅ Stop/complete games  
✅ Persistent data storage  

## Example Game Card
Each registered game displays:
```
Room: The Cryptic Library
Status: Active
Team: Jane's Squad (4 players)
Email: jane@example.com
Date: 2025-04-21 at 6:00 PM
Time Left: 45:23 (live countdown)
Progress: 3/5 puzzles solved
[Progress Bar: 60% filled]
```

## Notes
- Games are stored locally in your browser's localStorage
- Clearing browser data will remove game history
- Multiple games can be active simultaneously
- Each game gets a unique ID and timestamp
