// Escape Room Dynamic Effects
document.addEventListener('DOMContentLoaded', function() {
  // Enhanced Button Interactions
  const buttons = document.querySelectorAll('.button');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05) translateY(-2px)';
      this.style.boxShadow = '0 0 20px rgba(138, 43, 226, 0.6)';
    });

    button.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1) translateY(0)';
      this.style.boxShadow = '0 0 10px rgba(138, 43, 226, 0.4)';
    });
  });

  // Glitch Text Effect
  const glitchElements = document.querySelectorAll('.glitch-flicker');
  glitchElements.forEach(element => {
    setInterval(() => {
      if (Math.random() < 0.1) {
        element.style.textShadow = `
          2px 0 #ff00ff,
          -2px 0 #00ffff,
          0 2px #ff00ff,
          0 -2px #00ffff
        `;
        setTimeout(() => {
          element.style.textShadow = '0 0 10px rgba(138, 43, 226, 0.8)';
        }, 100);
      }
    }, 2000);
  });

  // Dim lighting when entering form details
  const formInputs = document.querySelectorAll('input, select, textarea');
  let focusCount = 0;

  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      focusCount++;
      dimBackground(true);
    });

    input.addEventListener('blur', function() {
      focusCount--;
      if (focusCount <= 0) {
        focusCount = 0;
        dimBackground(false);
      }
    });
  });
});

function dimBackground(dim) {
  const body = document.body;
  if (dim) {
    body.classList.add('dimmed');
  } else {
    body.classList.remove('dimmed');
  }
}

// Form Enhancement for book.html
function enhanceForm() {
  const form = document.querySelector('form');
  if (!form) return;

  const inputs = form.querySelectorAll('input, select');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.style.borderColor = '#8a2be2';
      this.style.boxShadow = '0 0 10px rgba(138, 43, 226, 0.5)';
    });

    input.addEventListener('blur', function() {
      this.style.borderColor = '#333';
      this.style.boxShadow = 'none';
    });
  });
}

// Call form enhancement if on booking page
if (document.querySelector('form')) {
  enhanceForm();
}

// Game Registration and Tracking System
class GameRegistry {
  constructor() {
    this.storageKey = 'registeredGames';
    this.historyKey = 'gameHistory';
  }

  // Register a new game from booking
  registerGame(bookingData) {
    const game = {
      id: Date.now(),
      name: bookingData.customerName,
      email: bookingData.customerEmail,
      room: bookingData.roomTheme,
      roomName: bookingData.room,
      playerCount: parseInt(bookingData.playerCount),
      playersText: bookingData.players,
      bookingDate: bookingData.date,
      startTime: bookingData.time,
      registeredAt: new Date().toLocaleString(),
      status: 'active',
      timeLeft: 60, // 60 minutes
      progress: 0,
      puzzlesSolved: 0,
      totalPuzzles: 5
    };

    // Add to active games
    const activeGames = this.getActiveGames();
    activeGames.push(game);
    localStorage.setItem(this.storageKey, JSON.stringify(activeGames));

    // Add to history
    this.addToHistory(game);

    return game;
  }

  // Get all active games
  getActiveGames() {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  // Add game to history
  addToHistory(game) {
    const history = this.getHistory();
    history.push({
      ...game,
      addedToHistoryAt: new Date().toLocaleString()
    });
    localStorage.setItem(this.historyKey, JSON.stringify(history));
  }

  // Get game history (all registrations)
  getHistory() {
    const stored = localStorage.getItem(this.historyKey);
    return stored ? JSON.parse(stored) : [];
  }

  // Update game progress
  updateGameProgress(gameId, puzzlesSolved) {
    const games = this.getActiveGames();
    const game = games.find(g => g.id === gameId);
    if (game) {
      game.puzzlesSolved = puzzlesSolved;
      game.progress = (puzzlesSolved / game.totalPuzzles) * 100;
      localStorage.setItem(this.storageKey, JSON.stringify(games));
    }
  }

  // End a game
  endGame(gameId) {
    const games = this.getActiveGames();
    const gameIndex = games.findIndex(g => g.id === gameId);
    if (gameIndex !== -1) {
      const game = games[gameIndex];
      game.status = 'completed';
      games.splice(gameIndex, 1);
      localStorage.setItem(this.storageKey, JSON.stringify(games));
      this.addToHistory(game);
    }
  }

  // Clear all data
  clearAll() {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.historyKey);
  }
}

// Initialize registry
const gameRegistry = new GameRegistry();