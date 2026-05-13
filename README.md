Features

🤖 AI-Generated Itineraries — Personalized day-by-day travel plans powered by LLaMA 3.3 70B via Groq API
🏨 Hotel Recommendations — Curated hotel suggestions based on your budget
🍽️ Restaurant & Cafe Suggestions — Local food recommendations with must-try dishes
🚆 Transport Comparison — Compare flight, train, bus, and car options with estimated prices
🎯 Interest-Based Planning — Customize your trip by selecting interests like History, Food, Nature, Adventure, and more
👥 Traveler Type Support — Solo, Couple, Family, and Group travel modes
💰 Budget Filters — Budget, Mid-Range, and Luxury options
📱 Fully Responsive — Works seamlessly on desktop and mobile


🛠️ Tech Stack
Frontend
TechnologyPurposeReact 18Component-based UI frameworkTypeScriptType-safe JavaScriptViteFast build tool and dev serverTailwind CSSUtility-first CSS stylingLucide ReactIcon library
Backend
TechnologyPurposeSupabase Edge FunctionsServerless Deno runtime for AI API callsSupabasePostgreSQL database and BaaSGroq APILLM inference engineLLaMA 3.3 70B VersatileLarge Language Model for itinerary generation
DevOps
TechnologyPurposeVercelFrontend deploymentSupabase CLIEdge function deploymentEnvironment VariablesSecure API key management

🏗️ Project Architecture
User (Browser)
      ↓
React Frontend (Vite + TypeScript + Tailwind CSS)
      ↓  POST request with user preferences
Supabase Edge Function (Deno runtime)
      ↓  Structured prompt sent to LLM
Groq API → LLaMA 3.3 70B Versatile
      ↓  Returns structured JSON
Edge Function parses and returns response
      ↓
Frontend renders Itinerary Page

🚀 Getting Started
Prerequisites

Node.js v18+
npm or yarn
Supabase account (free)
Groq API key (free)

🔑 Getting API Keys
Supabase

Go to supabase.com and create a free account
Create a new project
Go to Settings → API to get your Project URL and anon key

Groq API

Go to console.groq.com and sign up for free
Navigate to API Keys → Create API Key
Copy and save your key



Backend (Supabase Edge Functions)
Already deployed via Supabase CLI as described in the setup steps above.


Itinerary Page

Day-by-day schedule with Morning, Afternoon, Evening activities, hotel recommendations, transport comparison, and local tips


🤖 How the AI Works

User fills in the planning form (city, days, budget, interests)
Frontend sends a POST request to the Supabase Edge Function
The Edge Function constructs a detailed prompt instructing LLaMA 3.3 to return a strict JSON schema
Groq API processes the prompt and returns structured JSON
The Edge Function cleans and parses the response
Frontend maps the data and renders the itinerary

Sample Prompt Structure
Create a detailed 3-day travel itinerary for Mumbai, India.
Budget: mid
Travel Style: solo
Interests: Food & Cuisine, History & Heritage

Return a JSON object with itinerary, hotels, restaurants, and transport...

🙋‍♂️ Author
Shaan Mathur

B.Tech Computer Science, VIT Bhopal University


🌟 Acknowledgements

Groq for the blazing fast LLM inference
Supabase for the serverless backend infrastructure
Tailwind CSS for the beautiful UI components
Lucide React for the clean icons
