/*
  # Trip Planner - Initial Schema

  ## Tables
  - `itineraries`: Stores generated trip itineraries
    - id (uuid pk)
    - city (text) — destination city in India
    - days (int) — duration of trip
    - traveler_type (text) — solo/couple/family/group
    - budget (text) — budget/mid/luxury
    - interests (text[]) — array of interest tags
    - itinerary_data (jsonb) — full AI-generated itinerary JSON
    - created_at (timestamptz)

  ## Security
  - RLS enabled on itineraries
  - Public INSERT allowed (unauthenticated users can save trips)
  - Public SELECT by id allowed
*/

CREATE TABLE IF NOT EXISTS itineraries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city text NOT NULL,
  days integer NOT NULL CHECK (days >= 1 AND days <= 14),
  traveler_type text NOT NULL DEFAULT 'solo',
  budget text NOT NULL DEFAULT 'mid',
  interests text[] DEFAULT '{}',
  itinerary_data jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE itineraries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert itineraries"
  ON itineraries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read itineraries by id"
  ON itineraries FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_itineraries_city ON itineraries(city);
CREATE INDEX IF NOT EXISTS idx_itineraries_created_at ON itineraries(created_at DESC);
