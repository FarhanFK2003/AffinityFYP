using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System;
using FYPBackend.Models;
using BCrypt;
using Microsoft.AspNetCore.Http.HttpResults;

namespace FYPBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly FypdbContext _context;

        public GameController(FypdbContext context)
        {
            _context = context;
        }

        [HttpGet("getLeaderboard")]
        public List<dynamic> getLeaderBoard(int gameId,int userId)
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

            return topEntries;
        }


    }
}
