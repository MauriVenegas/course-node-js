DROP DATABASE IF EXISTS moviesdb;
CREATE DATABASE moviesdb;

USE moviesdb;

CREATE TABLE movie (
	id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
	title VARCHAR(225) NOT NULL,
	year INT NOT NULL,
	director VARCHAR(225) NOT NULL,
	duration INT NOT NULL,
	poster TEXT,
	rate DECIMAL(2,1) UNSIGNED NOT NULL
);

CREATE TABLE genre (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(225) NOT NULL UNIQUE
);

CREATE TABLE movie_gender (
	movie_id BINARY(16) REFERENCES movie(id),
    genre_id INT REFERENCES genre(id),
    PRIMARY KEY (movie_id, genre_id)
);

INSERT INTO genre (name) VALUES
('Drama'),
('Action'),
('Crime'),
('Adventure'),
('Sci-Fi'),
('Romance'),
('Animation'),
('Biography'),
('Fantasy');

/* INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES
(UUID_TO_BIN(UUID()), 'Inception', '2010', 'Christopher Nolan', 148, 'https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg', 8.8),
(UUID_TO_BIN(UUID()), 'The Matrix', '1999', 'Lana Wachowski', 136, 'https://i.ebayimg.com/images/g/QFQAAOSwAQpfjaA6/s-l1200.jpg', 8.7),
(UUID_TO_BIN(UUID()), 'The Shawshank Redemption', '1994', 'Frank Darabont', 142, 'https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp', 8.8),
(UUID_TO_BIN(UUID()), 'The Dark Knight', '2008', 'Christopher Nolan', 152, 'https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg', 9.0);

INSERT INTO movie_gender (movie_id, genre_id) VALUES
	((SELECT id FROM movie WHERE title = 'Inception'), (SELECT id FROM genre WHERE name = 'Sci-Fi')),
    ((SELECT id FROM movie WHERE title = 'The Matrix'), (SELECT id FROM genre WHERE name = 'Sci-Fi')),
    ((SELECT id FROM movie WHERE title = 'Inception'), (SELECT id FROM genre WHERE name = 'Action')),
	((SELECT id FROM movie WHERE title = 'The Shawshank Redemption'), (SELECT id FROM genre WHERE name = 'Drama')),
	((SELECT id FROM movie WHERE title = 'The Dark Knight'), (SELECT id FROM genre WHERE name = 'Action'));

SELECT BIN_TO_UUID(id), title, year, director, duration, poster, rate FROM movie;
-- where BIN_TO_UUID(id) = '2a7ff3e8-0989-11ef-ae6b-840fbd8a79c0';

SELECT BIN_TO_UUID(movie_id), genre_id FROM movie_gender;
-- WHERE BIN_TO_UUID(movie_id) = '7583eafe-099b-11ef-ae6b-840fbd8a79c0';

-- SELECT * FROM genre;*/

-- SELECT BIN_TO_UUID(id), title, year, director, duration, poster, rate FROM movie;
-- SELECT BIN_TO_UUID(movie_id), genre_id FROM movie_gender;




