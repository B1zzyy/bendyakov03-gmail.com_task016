"use client";

import { useState, useEffect } from "react";

interface Movie {
  id: string;
  title: string;
  genre: string;
  rating: number;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && genre && rating) {
      const newMovie: Movie = {
        id: Date.now().toString(),
        title,
        genre,
        rating,
      };
      setMovies([...movies, newMovie]);
      setTitle("");
      setGenre("");
      setRating(0);
    }
  };

  const renderRating = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-xl cursor-pointer ${
            i <= rating ? "text-yellow-500" : "text-gray-300"
          }`}
          onClick={() => setRating(i)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  // Load movies from localStorage
  useEffect(() => {
    const savedMovies = localStorage.getItem("watchlist");
    if (savedMovies) {
      setMovies(JSON.parse(savedMovies));
    }
  }, []);

  // Save movies to localStorage
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(movies));
  }, [movies]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight text-zinc-800">
            Movie Watchlist
          </h1>
          <form onSubmit={handleSubmit} className="w-full mt-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-800">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-zinc-800"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-800">
                Genre
              </label>
              <input
                type="text"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white text-zinc-800"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-800">
                Rating
              </label>
              <div className="flex mt-1">{renderRating(rating)}</div>
            </div>
            <button
              type="submit"
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Movie
            </button>
          </form>
        </div>
        <div className="mt-8 w-full">
          <h2 className="text-2xl font-semibold mb-4 text-zinc-800">
            Your Watchlist
          </h2>
          <ul className="space-y-4">
            {movies.map((movie) => (
              <li
                key={movie.id}
                className="p-4 rounded-md bg-zinc-100 shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-zinc-800">
                      {movie.title}
                    </h3>
                    <p className="text-sm text-zinc-600">
                      Genre: {movie.genre}
                    </p>
                  </div>
                  <div className="flex">
                    {renderRating(movie.rating)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
