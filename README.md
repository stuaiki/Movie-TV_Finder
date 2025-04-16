# Movie/TV Show Finder

Movie/TV Show Finder is a React application built with TypeScript and Vite. The app allows users to search for movies and TV shows using TheMovieDB (TMDb) API, view details about each title, and manage a list of favorites that persists across sessions. The project makes use of modern React features such as hooks, context for state management, and custom hooks for API calls and local storage handling.

---

## Project Description

This project is a movie and TV show finder application that provides the following functionality:

- **Search and Filter:**  
  Users can search for movies and TV shows, and filter results by selecting from Movie, TV Show, or both.
- **Detail View:**  
  Clicking on a movie or TV show displays detailed information retrieved from the TMDb API.

- **Favorites Management:**  
  Users can mark titles as favorites. Favorites are stored in local storage to persist across browser sessions. The app uses a React context along with a custom `useLocalStorage` hook for this feature.

- **Pagination and Infinite Scroll:**  
  The project supports pagination (i.e., load more results) when browsing popular movies/TV shows.

- **Error Handling:**  
  An ErrorBoundary component is integrated to catch render-time errors and display a fallback UI, ensuring the app remains resilient in case unexpected issues occur.

- **Third-party Libraries:**  
  The project makes use of `react-router-dom` for routing and Vite for fast refresh and build performance.

---

## Instructions to Run the Project

1. **Clone the Repository**
   ```bash
   git clone https://github.com/stuaiki/Movie-TV_Finder.git
   cd movie-tv-finder
   npm install
   npm run dev
   ```
