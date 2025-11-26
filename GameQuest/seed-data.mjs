import mysql from "mysql2/promise";

const connection = await mysql.createConnection(process.env.DATABASE_URL);

console.log("🌱 Seeding database...");

try {
  // Insert platforms
  console.log("Inserting platforms...");
  await connection.execute(`INSERT IGNORE INTO platforms (name, icon) VALUES ('PlayStation 5', '🎮')`);
  await connection.execute(`INSERT IGNORE INTO platforms (name, icon) VALUES ('Xbox Series X/S', '🎮')`);
  await connection.execute(`INSERT IGNORE INTO platforms (name, icon) VALUES ('Nintendo Switch', '🎮')`);
  await connection.execute(`INSERT IGNORE INTO platforms (name, icon) VALUES ('PC', '💻')`);
  await connection.execute(`INSERT IGNORE INTO platforms (name, icon) VALUES ('PlayStation 4', '🎮')`);
  await connection.execute(`INSERT IGNORE INTO platforms (name, icon) VALUES ('Xbox One', '🎮')`);

  // Insert tags
  console.log("Inserting tags...");
  await connection.execute(`INSERT IGNORE INTO tags (name, category) VALUES ('Ação', 'genre')`);
  await connection.execute(`INSERT IGNORE INTO tags (name, category) VALUES ('Aventura', 'genre')`);
  await connection.execute(`INSERT IGNORE INTO tags (name, category) VALUES ('RPG', 'genre')`);
  await connection.execute(`INSERT IGNORE INTO tags (name, category) VALUES ('Estratégia', 'genre')`);
  await connection.execute(`INSERT IGNORE INTO tags (name, category) VALUES ('Puzzle', 'genre')`);
  await connection.execute(`INSERT IGNORE INTO tags (name, category) VALUES ('Terror', 'theme')`);
  await connection.execute(`INSERT IGNORE INTO tags (name, category) VALUES ('Ficção Científica', 'theme')`);
  await connection.execute(`INSERT IGNORE INTO tags (name, category) VALUES ('Fantasia', 'theme')`);
  await connection.execute(`INSERT IGNORE INTO tags (name, category) VALUES ('Mundo Aberto', 'gameplay')`);
  await connection.execute(`INSERT IGNORE INTO tags (name, category) VALUES ('Multiplayer', 'gameplay')`);
  await connection.execute(`INSERT IGNORE INTO tags (name, category) VALUES ('Single Player', 'gameplay')`);
  await connection.execute(`INSERT IGNORE INTO tags (name, category) VALUES ('Cooperativo', 'gameplay')`);

  // Insert games
  console.log("Inserting games...");
  await connection.execute(`
    INSERT IGNORE INTO games (title, description, developer, publisher, averageRating, totalAchievements) 
    VALUES ('The Legend of Zelda: Breath of the Wild', 'Um jogo de aventura em mundo aberto onde você explora o reino de Hyrule, enfrenta inimigos e resolve puzzles para salvar a princesa Zelda.', 'Nintendo', 'Nintendo', 97, 120)
  `);
  
  await connection.execute(`
    INSERT IGNORE INTO games (title, description, developer, publisher, averageRating, totalAchievements) 
    VALUES ('Elden Ring', 'Um RPG de ação desafiador em mundo aberto criado por FromSoftware e George R.R. Martin, com combate intenso e exploração épica.', 'FromSoftware', 'Bandai Namco', 96, 42)
  `);
  
  await connection.execute(`
    INSERT IGNORE INTO games (title, description, developer, publisher, averageRating, totalAchievements) 
    VALUES ('God of War Ragnarök', 'Kratos e Atreus embarcam em uma jornada pela mitologia nórdica para impedir o Ragnarök e enfrentar deuses poderosos.', 'Santa Monica Studio', 'Sony Interactive Entertainment', 94, 36)
  `);
  
  await connection.execute(`
    INSERT IGNORE INTO games (title, description, developer, publisher, averageRating, totalAchievements) 
    VALUES ('Hogwarts Legacy', 'Viva sua própria aventura no mundo mágico de Harry Potter como estudante de Hogwarts no século XIX.', 'Avalanche Software', 'Warner Bros. Games', 84, 46)
  `);
  
  await connection.execute(`
    INSERT IGNORE INTO games (title, description, developer, publisher, averageRating, totalAchievements) 
    VALUES ('Baldurs Gate 3', 'Um RPG épico baseado em Dungeons & Dragons com escolhas significativas, combate tático e narrativa profunda.', 'Larian Studios', 'Larian Studios', 96, 54)
  `);
  
  await connection.execute(`
    INSERT IGNORE INTO games (title, description, developer, publisher, averageRating, totalAchievements) 
    VALUES ('Cyberpunk 2077', 'Um RPG de ação em mundo aberto ambientado em Night City, uma megalópole obcecada por poder, glamour e modificações corporais.', 'CD Projekt Red', 'CD Projekt', 86, 44)
  `);
  
  await connection.execute(`
    INSERT IGNORE INTO games (title, description, developer, publisher, averageRating, totalAchievements) 
    VALUES ('Red Dead Redemption 2', 'Uma épica aventura no Velho Oeste americano seguindo Arthur Morgan e a gangue Van der Linde.', 'Rockstar Games', 'Rockstar Games', 97, 52)
  `);
  
  await connection.execute(`
    INSERT IGNORE INTO games (title, description, developer, publisher, averageRating, totalAchievements) 
    VALUES ('The Witcher 3: Wild Hunt', 'Geralt de Rivia caça monstros e busca sua filha adotiva em um vasto mundo aberto cheio de escolhas morais.', 'CD Projekt Red', 'CD Projekt', 93, 53)
  `);

  console.log("✅ Database seeded successfully!");
} catch (error) {
  console.error("❌ Error seeding database:", error);
} finally {
  await connection.end();
}
