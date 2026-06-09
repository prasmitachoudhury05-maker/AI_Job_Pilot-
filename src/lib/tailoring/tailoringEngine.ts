import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || 'gsk_mock_key',
});

/**
 * Calculates a basic ATS keyword match score between a resume and a job description.
 */
export function calculateAtsScore(resumeText: string, jobDescription: string): number {
  if (!resumeText || !jobDescription) return 0;
  
  const resumeWords = new Set(resumeText.toLowerCase().match(/\b[a-z]+\b/g) || []);
  const jobWords = new Set(jobDescription.toLowerCase().match(/\b[a-z]+\b/g) || []);
  
  if (jobWords.size === 0) return 0;

  let matches = 0;
  for (const word of Array.from(jobWords)) {
    if (resumeWords.has(word)) {
      matches++;
    }
  }

  return Math.min(100, Math.round((matches / jobWords.size) * 100));
}

/**
 * Uses Groq AI to rewrite the original resume bullet points to better match the job description.
 */
export async function generateTailoredResume(originalResume: string, jobDescription: string): Promise<{
  tailoredResume: string,
  changes: Array<{ originalText: string, tailoredText: string, explanation: string }>
}> {
  try {
    const prompt = `
      You are an expert resume writer and career coach.
      Your task is to tailor the candidate's original resume to match the following job description.
      Rewrite bullet points to highlight relevant skills and experience. Do NOT invent or hallucinate experience the candidate does not have.
      
      Job Description:
      ${jobDescription}

      Original Resume:
      ${originalResume}

      Output strictly in JSON format matching this structure:
      {
        "tailoredResume": "The complete rewritten resume text...",
        "changes": [
          {
            "originalText": "Developed web app...",
            "tailoredText": "Developed scalable React web app...",
            "explanation": "Added 'React' to match the job description's focus on frontend frameworks."
          }
        ]
      }
    `;

    const response = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama3-8b-8192',
      temperature: 0.3,
      response_format: { type: "json_object" }
    });

    const content = response.choices[0]?.message?.content || '{}';
    const parsed = JSON.parse(content);

    return {
      tailoredResume: parsed.tailoredResume || originalResume,
      changes: parsed.changes || []
    };
  } catch (error) {
    console.error("Groq Tailoring error:", error);
    return {
      tailoredResume: originalResume,
      changes: []
    };
  }
}
