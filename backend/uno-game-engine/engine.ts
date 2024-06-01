import { getShuffledCardDeck } from './deck';
import { handleEvent } from './gameEvents';
import { shuffle } from './deck';

const NUM_CARDS_PER_PLAYER = 7;

export class GameEngine {
    cardDeck: UNOCard[];
    thrownCards: UNOCard[];
    players: Player[];
    currentPlayerIndex: number;
    lastThrownCard: UNOCard | null;
    currentColor: number;
    direction: number;
    status: 'READY' | 'STARTED';

    constructor() {
        this.cardDeck = getShuffledCardDeck();
        this.thrownCards = [];
        this.players = [];
        this.currentPlayerIndex = 0;
        this.lastThrownCard = null;
        this.currentColor = 0;
        this.direction = 1;
        this.status = 'READY';
    }
    allotCards() {
        if (this.cardDeck.length < this.players.length * NUM_CARDS_PER_PLAYER) {
            throw new Error('Not enough cards to distribute');
        }

        this.players = this.players.map((player: Player) => {
            player.cards = this.cardDeck.splice(0, NUM_CARDS_PER_PLAYER);
            return player;
        });
    }
    addPlayer(player: Player) {
        this.players.push(player);
    }
    startGame() {
        if (this.players.length < 2) {
            throw new Error('Not enough players to start the game');
        }
        this.status = 'STARTED';
    }
    nextPlayer() {
        this.currentPlayerIndex =
            (this.currentPlayerIndex + this.direction) % this.players.length;
    }
    drawCardFromDeck(player: Player) {
        if (this.cardDeck.length === 0) {
            if (this.thrownCards.length === 0) {
                throw new Error('No cards left to draw');
            }

            // Move thrown cards back to the deck and updated last thrown card
            this.cardDeck = this.thrownCards.splice(
                0,
                this.thrownCards.length - 1
            );
            //Updating the last thrown card
            this.updateLastThrownCard();
            // Shuffle the deck
            shuffle(this.cardDeck); // using shuffle function defined in deck.ts
        }

        // Draw a card for the player
        const drawnCard = this.cardDeck.pop();
        if (drawnCard) {
            this.players.find((p) => p.id === player.id)?.cards.push(drawnCard);
        } else {
            throw new Error('Failed to draw a card');
        }
    }
    updateLastThrownCard() {
        // checking if thrown cards are empty
        if (this.thrownCards.length > 0) {
            this.lastThrownCard = this.thrownCards[this.thrownCards.length - 1];
        } else {
            this.lastThrownCard = null;
        }
    }
    dispatchEvent(event: GameEvent) {
        // handle different types of events based on event.type
        handleEvent(this, event);
    }
}
