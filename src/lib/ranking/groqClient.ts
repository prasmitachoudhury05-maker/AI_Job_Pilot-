import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || 'gsk_mock_key',
});

export async function getJobRankingExplanation(candidateProfile: any, job: any, algorithmicScore: number): Promise<{ explanation: string, confidence: number }> {
  try {
    const prompt = `
      You are an expert technical recruiter and career coach.
      Evaluate this candidate against this job description and provide a 2-3 sentence explanation of why they are a good fit (or not) and a confidence score from 0-1.
      
      Candidate Profile: ${JSON.stringify(candidateProfile)}
      Job Description: ${job.description}
      Algorithmic Match Score: ${algorithmicScore}
      
      Respond in strictly valid JSON format like: {"explanation": "...", "confidence": 0.85}
    `;

    const response = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama3-8b-8192',
      temperature: 0.2,
      response_format: { type: "json_object" }
    });

    const content = response.choices[0]?.message?.content || '{}';
    const parsed = JSON.parse(content);

    return {
      explanation: parsed.explanation || "No explanation provided.",
      confidence: parsed.confidence || 0.5
    };
  } catch (error) {
    console.error("Groq API error:", error);
    return {
      explanation: "Unable to generate AI explanation at this time.",
      confidence: 0.5
    };
  }
}
