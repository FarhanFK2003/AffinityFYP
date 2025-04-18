using System;
using System.Collections.Generic;

namespace FYPBackend.Models;

public partial class GamePlay
{
    public int Id { get; set; }

    public int GameId { get; set; }

    public int UserId { get; set; }

    public int Score { get; set; }

    public int? Level { get; set; }

    public decimal? PlayingHours { get; set; }
}
