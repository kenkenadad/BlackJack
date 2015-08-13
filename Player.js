var Player = function () {}

Player.prototype.hand = [];
Player.prototype.bet = 0;

Player.prototype.initizlize = function ()
{
}

Player.prototype.check = function ()
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
    }
    count += value;
  }
  if (count > 22)
  {
    // Bust
  }
}
