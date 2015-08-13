var CARD_SIZE = 1;

var Dealer = function()
{
  document.write("Dealer appeared."+"<br>");
  this.talon = [];
  this.hand = [];
  this.bet = 0;
  this.bStaying = false;
}

/* Debug action */
Dealer.prototype.showHand = function()
{
  document.write("=== Dealer ===<br>");
  for (index in this.hand)
  {
    var card = this.hand[index];
    card.show();
  }
}

Dealer.prototype.showTalon = function()
{
  document.write("=== Talon ===<br>");
  for (index in this.talon)
  {
    var card = this.talon[index];
    card.show();
  }
}

/* Basic action */
Dealer.prototype.takeCard = function(card)
{
  this.hand.push(card);
}

Dealer.prototype.giveCard = function(player)
{
  var card = this.talon.shift();
  player.takeCard(card);
}

Dealer.prototype.discardHand = function()
{
  this.hand = [];
}

Dealer.prototype.initializeTalon = function()
{
  var trump_set = [];
  for (var suit in SUIT_TYPE)
  {
    for (var rank = 1; rank <= 13; rank++)
    {
      var card = new Trump();
      card.identify(SUIT_TYPE[suit], rank);
      trump_set.push(card);
    }
  }
  this.talon = [];
  for (var size = 0; size < CARD_SIZE; size++)
  {
    for (var index in trump_set)
    {
      this.talon.push(trump_set[index]);
    }
  }
}

Dealer.prototype.shuffle = function()
{
  var i, tmp;
  n = this.talon.length;
  while(n)
  {
    i = Math.floor(Math.random() * n--);
    tmp = this.talon[n];
    this.talon[n] = this.talon[i];
    this.talon[i] = tmp;
  }
}

/* Game action */
Dealer.prototype.initialize = function(Players)
{
  this.initializeTalon();
  this.discardHand();
  for (var index in Players)
  {
    player = Players[index];
    player.initialize();
  }
  this.bStaying = false;
  this.shuffle();
}

Dealer.prototype.check = function(player)
{
  var count = 0;
  for (var index in this.hand)
  {
    var value = 0;
    card = this.hand[index];
    switch(card.rank)
    {
    case 1:
      value = 1;
      break;
    case 11:
    case 12:
    case 13:
      value = 10;
      break;
    default:
      value = card.rank;
      break;
    }
    count += value;
  }
  if (count > 21)
  {
    // Bust
    this.bStaying = true;
  }
  document.write("Dealer: "+count+"<br>");
}

Dealer.prototype.deal = function(players)
{
  for (var i = 0; i < 2; i++)
  {
    this.giveCard(this);
  }
  for (var index in players)
  {
    player = players[index];
    for (var i = 0; i < 2; i++)
    {
      this.giveCard(player);
    }
  }
}

Dealer.prototype.hit = function(dealer)
{
  dealer.giveCard(this);
}

Dealer.prototype.stay = function()
{
  this.bStaying = true;
}

Dealer.prototype.doubledown = function()
{
  dealer.giveCard(this);
  this.bet *= 2.0;
  this.stay();
}
