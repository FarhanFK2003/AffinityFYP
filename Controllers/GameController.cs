using Microsoft.AspNetCore.Mvc;
using FYPBackend.Models;
using Microsoft.AspNetCore.Authorization;

namespace FYPBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class GameController : ControllerBase
    {
        private readonly FypdbContext _context;

        public GameController(FypdbContext context)
        {
            _context = context;
        }

        [HttpGet("getUser")]
        public IActionResult GetUser()
        {
            var userId = int.Parse(User.FindFirst("UserId").Value);

            return Ok(new { id = userId });
        }

        [HttpGet("getLeaderboard")]
        public IActionResult getLeaderBoard(int gameId,int userId)
        {
            var allEntries = _context.GamePlays
    .Where(gp => gp.GameId == gameId)
    .Join(_context.Users,
          gp => gp.UserId,
          u => u.Id,
          (gp, u) => new
          {
              UserId = u.Id,
              Username = u.Username,
              Level = gp.Level,
              Score = gp.Score
          })
    .ToList();

            var rankedList = allEntries
                .OrderByDescending(gp => gp.Level)
                .ThenByDescending(gp => gp.Score)
                .Select((x, index) => new
                {
                    Rank = index + 1,
                    UserId = x.UserId,
                    Username = x.Username,
                    Level = x.Level,
                    Score = x.Score
                })
                .ToList<dynamic>();

            var topEntries = rankedList.Take(10).ToList();

            var userEntry = rankedList.FirstOrDefault(e => e.UserId == userId);
            if (userEntry != null && !topEntries.Any(e => e.UserId == userId))
            {
                topEntries.Add(userEntry);
            }

            return Ok(topEntries);
        }

        [HttpPut("updateGameplay")]
        public IActionResult Update([FromBody]GamePlay gamePlay)
        {
            var gameP=_context.GamePlays.Where(g=> g.UserId==gamePlay.UserId && g.GameId==gamePlay.GameId).FirstOrDefault();
            if (gameP != null)
            {
                gameP.Score = gamePlay.Score;
                gameP.Level = gamePlay.Level;
                _context.SaveChanges();

            }
            else
            {
                _context.GamePlays.Add(gamePlay);
                _context.SaveChanges();
            }

            return NoContent();
        }


    }
}
