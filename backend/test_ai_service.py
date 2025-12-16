
import asyncio
import os
import sys

# Add project root to path
sys.path.append(os.getcwd())

from app.services import ai_service

async def test():
    print("Testing generate_practice_question(1, 'Medium')...")
    try:
        q = await ai_service.generate_practice_question(1, "Medium")
        print("Success!")
        print(f"Question: {q.question_text[:50]}...")
        print(f"Explanation: {q.explanation[:50]}...")
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test())
