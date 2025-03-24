curl -X POST http://localhost:5001/api/user/register \
-H "Content-Type: application/json" \
-d '{
  "name": "Test User",
  "email": "test@example.com",
  "password": "TestPass123",
  "role": "user"
}'
