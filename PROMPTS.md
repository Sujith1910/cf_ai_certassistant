name = "cf_ai_certassistant"
main = "src/index.js"
compatibility_date = "2025-10-09"

[ai]
binding = "AI"

[durable_objects]
bindings = [{ name = "SESSION", class_name = "SessionMemory" }]

