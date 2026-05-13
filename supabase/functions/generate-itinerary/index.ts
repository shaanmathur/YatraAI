import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    const { city, days, budget, interests, travelStyle, travelerType } = body

    const prompt = `Create a detailed ${days}-day travel itinerary for ${city}, India.
Budget: ${budget}
Travel Style: ${travelStyle || travelerType || 'solo'}
Interests: ${interests?.join(', ') || 'general sightseeing'}

Return a JSON object with this exact structure (no markdown, no extra text, only valid JSON):
{
  "city": "${city}",
  "days": ${days},
  "overview": "2-3 sentence overview of the trip",
  "itinerary": [
    {
      "day": 1,
      "theme": "day theme",
      "activities": [
        {
          "time": "9:00 AM",
          "name": "Place name",
          "description": "Brief description",
          "category": "attraction",
          "duration": "2 hours",
          "cost": "200"
        }
      ]
    }
  ],
  "hotels": [
    {
      "name": "Hotel name",
      "category": "mid-range",
      "pricePerNight": "2000",
      "rating": 4.2,
      "highlights": ["highlight1", "highlight2"]
    }
  ],
  "restaurants": [
    {
      "name": "Restaurant name",
      "cuisine": "cuisine type",
      "priceRange": "200-500",
      "mustTry": "dish name",
      "rating": 4.5
    }
  ],
  "transport": [
    {
      "mode": "Flight",
      "duration": "2 hours",
      "price": "4000-8000",
      "comfort": "High",
      "recommended": true
    },
    {
      "mode": "Train",
      "duration": "8 hours",
      "price": "500-1500",
      "comfort": "Medium",
      "recommended": false
    },
    {
      "mode": "Bus",
      "duration": "10 hours",
      "price": "300-600",
      "comfort": "Low",
      "recommended": false
    }
  ]
}`

    const groqKey = Deno.env.get('GROQ_API_KEY')

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${groqKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 4000
      })
    })

    const groqData = await response.json()

    if (!groqData.choices || groqData.choices.length === 0) {
      throw new Error('No response from Groq: ' + JSON.stringify(groqData))
    }

    const text = groqData.choices[0].message.content
    const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim()
    const itinerary = JSON.parse(cleaned)

    return new Response(JSON.stringify(itinerary), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})