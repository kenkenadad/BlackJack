var SUIT_TYPE = ["club", "diamond", "hart", "spade"]

var Trump = function()
{
  this.suit = "";
  this.rank = 0;
}

Trump.prototype.identify = function(suit, rank)
{
  this.suit = suit;
  this.rank = rank;
}

Trump.prototype.show = function()
{
  document.write(this.suit+", "+this.rank+"<br>");
}
