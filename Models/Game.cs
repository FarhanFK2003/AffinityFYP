using System;
using System.Collections.Generic;

namespace FYPBackend.Models;

public partial class Game
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Genre { get; set; }
}
