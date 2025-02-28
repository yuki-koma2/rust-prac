# Tokyo Weather App

An interactive weather application with a Rust backend and Next.js frontend that displays animated weather cards for Tokyo's weather conditions.

## Features

- Real-time weather data for Tokyo, Japan
- Animated weather cards for different conditions:
  - Sunny weather with animated sun rays
  - Rainy weather with falling raindrops and puddles
  - Windy weather with moving clouds and swaying elements
  - Snowy weather with falling snowflakes and accumulation
- Ability to switch between weather conditions manually
- Responsive design that works on desktop and mobile

## Project Structure

The project is divided into two main parts:

### Backend (Rust with Actix Web)

- Fetches weather data from OpenWeatherMap API
- Provides a REST API endpoint for the frontend
- Handles CORS for local development
- Falls back to mock data if API key is not provided

### Frontend (Next.js with TypeScript and Tailwind CSS)

- Interactive UI with animated weather cards
- Fetches data from the Rust backend
- Responsive design using Tailwind CSS
- Client-side state management with React hooks

## Prerequisites

- Rust (latest stable version)
- Node.js (v16 or later)
- npm or yarn

## Setup and Running

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd weather-app/backend
   ```

2. Create a `.env` file with your OpenWeatherMap API key:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   ```
   
   You can get a free API key by signing up at [OpenWeatherMap](https://openweathermap.org/api).
   
   Note: If you don't provide an API key, the application will use mock data.

3. Build and run the backend:
   ```
   cargo run
   ```
   
   The backend server will start at http://localhost:8080.

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd weather-app/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```
   
   The frontend will be available at http://localhost:3000.

## Usage

- Visit http://localhost:3000 in your browser to see the weather app
- The app will automatically display the current weather in Tokyo
- Use the buttons to switch between different weather animations
- All weather cards are displayed at the bottom of the page

## License

MIT
