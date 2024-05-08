import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'moviesdb',
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll({ genre }) {
    if (!genre) {
      const [movies] = await connection.query(
        'SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie;'
      )
      return movies
    }

    const lowerCaseGenres = genre.toLowerCase()
    const [genres] = await connection.query(
      'SELECT id, name FROM genre WHERE LOWER(name) = ?',
      [lowerCaseGenres]
    )
    if (genres.length === 0) return []
    const [{ id }] = genres

    const [movies] = await connection.query(
      `SELECT BIN_TO_UUID(m.id) id, m.title, m.year, m.director, m.duration, m.poster, m.rate FROM movie AS m
      INNER JOIN movie_gender AS mg ON m.id = mg.movie_id
      WHERE mg.genre_id = ? ;`,
      [id]
    )
    return movies
  }

  static async getById({ id }) {
    const [movie] = await connection.query(
      `SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie
       WHERE id = UUID_TO_BIN(?);`,
      [id]
    )
    return movie[0]
  }

  static async create({ input }) {
    const {
      title,
      year,
      director,
      duration,
      poster,
      rate,
      genre: genreArray,
    } = input
    const [uuidResult] = await connection.query('SELECT uuid() uuid')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(
        `INSERT INTO movie (id, title, year, director, duration, poster, rate)
         VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?)`,
        [title, year, director, duration, poster, rate]
      )
      await this.#createMovieGenre(uuid, genreArray)
    } catch (e) {
      console.log(e)
      throw new Error('Error creating movie')
    }
    const movie = await this.#find(uuid)
    return movie
  }

  static async delete({ id }) {
    const movie = await this.#find(id)
    if (!(movie.length > 0)) return false
    else {
      try {
        await connection.query(`DELETE FROM movie WHERE BIN_TO_UUID(id) = ?`, [
          id,
        ])
        await this.#deleteMovieGenre(id)
      } catch (error) {
        return false
      }
    }
  }

  static async update({ id, input }) {
    const movie = await this.#find(id)

    if (!(movie.length > 0)) return false
    else {
      const updateMovie = { ...movie[0], ...input }
      const { genre: genreArray } = input
      const { title, year, director, duration, poster, rate } = updateMovie

      try {
        await connection.query(
          `UPDATE movie
          SET title = ?, year = ?, director = ?, duration = ?, poster = ?, rate = ? WHERE BIN_TO_UUID(id) = ?`,
          [title, year, director, duration, poster, rate, id]
        )
        await this.#deleteMovieGenre(id)
        await this.#createMovieGenre(id, genreArray)
        return await this.#find(id)
      } catch (error) {
        return false
      }
    }
  }

  static async #find(id) {
    const [movie] = await connection.query(
      `SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie
       WHERE BIN_TO_UUID(id) = ?;`,
      [id]
    )
    return movie
  }

  static async #createMovieGenre(id, genreArray) {
    if (genreArray?.length > 0) {
      try {
        for (const genre of genreArray) {
          await connection.query(
            `INSERT INTO movie_gender (movie_id, genre_id) VALUES
              (UUID_TO_BIN("${id}"), (SELECT id FROM genre WHERE name = ?))`,
            [genre]
          )
        }
      } catch (error) {
        throw new Error('Error creating movie genre')
      }
    }
  }

  static async #deleteMovieGenre(id) {
    try {
      await connection.query(
        `DELETE FROM movie_gender WHERE BIN_TO_UUID(movie_id) = ?`,
        [id]
      )
    } catch (error) {
      throw new Error('Error deleting movie genre')
    }
  }
}
