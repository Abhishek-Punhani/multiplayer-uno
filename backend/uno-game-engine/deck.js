import { v4 as uuidv4 } from 'uuid';
const colors = ['red', 'yellow', 'green', 'blue'];
const values = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'skip',
    'reverse',
    'draw2',
];
const specialCards = ['wild', 'draw4'];
const deck = [];

/**    
 * In a standard UNO deck, there are 108 cards. Here's the breakdown:

- colors: These are the four colors of the cards in the deck: red, yellow, green, and blue.

- values: These are the values that can be on the cards. Each color has one '0' card and 
 two of each of the other number cards ('1' through '9'). 
 Each color also has two 'skip', 'reverse', and 'draw2' cards.

- specialCards: These are the black cards that can be played on any color.
 There are four 'wild' cards that allow the player to choose the color that
 continues play, and four 'draw4' cards that act like 'wild' cards but also
 force the next player to draw four cards.

 So, in total, for each color there are 19 number cards, 2 'skip' cards, 
 2 'reverse' cards, and 2 'draw2' cards, which makes 25 cards per color. 
 Multiply that by 4 (for the four colors) and add the 8 special cards, 
 and you get 108 cards.

 This function returns a shuffled deck of 108 UNO cards. Each card is an object with a color and a value.
 The function makeCard is used to make the card objects.
 @returns {Array} deck - An array of 108 UNO cards.
 */

export default function getShuffledCardDeck() {
    // generating cards of each color

for(let col of colors){
   for(let val of values){
    if(val.length==1){
        for(let i=0;i<2;i++){
            makeCard("number",col,val);
            if(val==0) break;
            
        }
    }else{
        for(let i=0;i<2;i++){
            makeCard("special",col,val);
        }
    }
   
   }
}
   // generating special cards
   for(let sc of specialCards){
    for(let i=0;i<4;i++){
        makeCard("special","wild",sc);
    }
   }
    // todo: Implement the card generation logic
    // dummy code:
    // deck.push(makeCard('special', 'wild', 'wild'))
    // deck.push(makeCard('number', 'red', '0'))

   let shuffledDeck= shuffle(deck)
    return shuffledDeck
}

/**
 * Helper function to make a card object.
 * @param {string} type one of ['number', 'special', 'wild']
 * @param {string} color one of ['red', 'yellow', 'green', 'blue']
 * @param {string} value the numeric value as string or the special card name ("skip", "reverse", "draw2", "wild", "draw4")
 * @returns {{type: string, color: string, value: string, id: unknown}} card - An object representing an UNO card.
 */
function makeCard(type, color, value) {
    let card={
        id:uuidv4(),
        type:type,
        color:color,
        value:value,
    };
    deck.push(card);
}

/**
 * This function shuffles the elements of the given array *in place* . The function behaves in a type-agnostic way.
 * Time complexity: O(n)
 * 
 */
function shuffle(deck) {
    let n = deck.length;
  
  for (let i = n - 1; i > 0; i--) {
    // Pick a random index from 0 to i (inclusive)
    let j = Math.floor(Math.random() * (i + 1));
    
    // Swap the elements at indices i and j
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  
  return deck;
}
