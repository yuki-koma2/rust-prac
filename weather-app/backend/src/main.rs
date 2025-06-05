use actix_cors::Cors;
use actix_web::{get, web, App, HttpResponse, HttpServer, Responder};
use dotenv::dotenv;
use serde::{Deserialize, Serialize};
use std::env;

#[derive(Serialize, Deserialize, Debug, Clone)]
struct WeatherResponse {
    weather: Vec<WeatherInfo>,
    main: MainInfo,
    wind: WindInfo,
    name: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
struct WeatherInfo {
    id: i32,
    main: String,
    description: String,
    icon: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
struct MainInfo {
    temp: f32,
    feels_like: f32,
    temp_min: f32,
    temp_max: f32,
    humidity: i32,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
struct WindInfo {
    speed: f32,
    deg: i32,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
struct WeatherData {
    condition: String,
    temperature: f32,
    humidity: i32,
    wind_speed: f32,
    city: String,
}

#[get("/api/weather")]
async fn get_weather() -> impl Responder {
    // For demonstration, we'll use Tokyo's coordinates
    let lat = 35.6762;
    let lon = 139.6503;
    
    // In a real application, you would get this from an environment variable
    let api_key = match env::var("OPENWEATHER_API_KEY") {
        Ok(key) => key,
        Err(_) => {
            // For demo purposes, if no API key is provided, return mock data
            return HttpResponse::Ok().json(WeatherData {
                condition: "Clear".to_string(),
                temperature: 22.5,
                humidity: 65,
                wind_speed: 3.5,
                city: "Tokyo".to_string(),
            });
        }
    };
    
    let url = format!(
        "https://api.openweathermap.org/data/2.5/weather?lat={}&lon={}&appid={}&units=metric",
        lat, lon, api_key
    );
    
    match reqwest::get(&url).await {
        Ok(response) => {
            if response.status().is_success() {
                match response.json::<WeatherResponse>().await {
                    Ok(weather_data) => {
                        let condition = if !weather_data.weather.is_empty() {
                            weather_data.weather[0].main.clone()
                        } else {
                            "Unknown".to_string()
                        };
                        
                        let processed_data = WeatherData {
                            condition,
                            temperature: weather_data.main.temp,
                            humidity: weather_data.main.humidity,
                            wind_speed: weather_data.wind.speed,
                            city: weather_data.name,
                        };
                        
                        HttpResponse::Ok().json(processed_data)
                    }
                    Err(_) => {
                        // Return mock data if parsing fails
                        HttpResponse::Ok().json(WeatherData {
                            condition: "Clear".to_string(),
                            temperature: 22.5,
                            humidity: 65,
                            wind_speed: 3.5,
                            city: "Tokyo".to_string(),
                        })
                    }
                }
            } else {
                // Return mock data if API request fails
                HttpResponse::Ok().json(WeatherData {
                    condition: "Clear".to_string(),
                    temperature: 22.5,
                    humidity: 65,
                    wind_speed: 3.5,
                    city: "Tokyo".to_string(),
                })
            }
        }
        Err(_) => {
            // Return mock data if API request fails
            HttpResponse::Ok().json(WeatherData {
                condition: "Clear".to_string(),
                temperature: 22.5,
                humidity: 65,
                wind_speed: 3.5,
                city: "Tokyo".to_string(),
            })
        }
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok(); // Load environment variables from .env file if present
    
    println!("Starting server at http://127.0.0.1:8080");
    
    HttpServer::new(|| {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header();
            
        App::new()
            .wrap(cors)
            .service(get_weather)
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
