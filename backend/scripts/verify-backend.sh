#!/bin/bash
set -e

# Create State
echo "Creating State..."
STATE_RES=$(curl -s -X POST http://localhost:3000/locations/states -H "Content-Type: application/json" -d '{"name": "California", "code": "CA"}')
echo "State Response: $STATE_RES"
STATE_ID=$(node -e "console.log(JSON.parse(process.argv[1]).id)" "$STATE_RES")

# Create County
echo "Creating County..."
COUNTY_RES=$(curl -s -X POST http://localhost:3000/locations/counties -H "Content-Type: application/json" -d '{"name": "Los Angeles", "code": "LA", "stateId": "'$STATE_ID'"}')
echo "County Response: $COUNTY_RES"
COUNTY_ID=$(node -e "console.log(JSON.parse(process.argv[1]).id)" "$COUNTY_RES")

# Create City
echo "Creating City..."
CITY_RES=$(curl -s -X POST http://localhost:3000/locations/cities -H "Content-Type: application/json" -d '{"name": "Los Angeles City", "countyId": "'$COUNTY_ID'"}')
echo "City Response: $CITY_RES"
CITY_ID=$(node -e "console.log(JSON.parse(process.argv[1]).id)" "$CITY_RES")

# Create Property
echo "Creating Property..."
PROP_RES=$(curl -s -X POST http://localhost:3000/properties -H "Content-Type: application/json" -d '{
  "externalPropertyId": "TEST1234",
  "type": "HOUSE",
  "stateId": "'$STATE_ID'",
  "countyId": "'$COUNTY_ID'",
  "cityId": "'$CITY_ID'",
  "address": "123 Main St"
}')
echo "Property Response: $PROP_RES"
