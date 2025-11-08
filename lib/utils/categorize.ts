
import { generateAPIUrl } from "@/lib/utils/generateAPIUrl";

interface CategorizeResponse {
  categoryId: string;
  reasoning: string;
  action: "existing" | "new";
  categoryTitle: string;
}

export async function categorizeJournalEntry(
  title: string | undefined,
  content: string,
  userId: string
): Promise<CategorizeResponse> {
  try {
    const response = await fetch(generateAPIUrl("/api/categorize"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        userId,
      }),
    });

    if(!response.ok) {
      const errorText = await response.text();
      throw new Error(`Categorization failed: ${response.status} ${errorText}`);
    }

    const result: CategorizeResponse = await response.json();
    return result;
  }
  catch(error) {
    console.error("Error calling categorization API:", error);
    throw error;
  }
}