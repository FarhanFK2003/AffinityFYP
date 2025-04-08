using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace FYPBackend.Models;

public partial class FypdbContext : DbContext
{
    public FypdbContext()
    {
    }

    public FypdbContext(DbContextOptions<FypdbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Game> Games { get; set; }

    public virtual DbSet<GamePlay> GamePlays { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=FYPDB;Integrated Security=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Game>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Game__3214EC075DB987CD");

            entity.ToTable("Game");

            entity.Property(e => e.Genre).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<GamePlay>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__GamePlay__3214EC070505396A");

            entity.ToTable("GamePlay");

            entity.Property(e => e.PlayingHours).HasColumnType("decimal(18, 0)");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__User__3214EC0767A19821");

            entity.ToTable("User");

            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.PasswordHash).HasMaxLength(100);
            entity.Property(e => e.Username).HasMaxLength(100);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
