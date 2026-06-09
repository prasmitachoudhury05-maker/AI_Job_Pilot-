import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || 'gsk_mock_key',
});

/**
 * Generates an Interview Prep Cheat Sheet using Groq AI.
 */
export async function generateInterviewPrep(resumeText: string, jobDescription: string): Promise<string> {
  try {
    const prompt = `
      You are an elite executive career coach and technical interviewer.
      Your task is to prepare the candidate for an upcoming interview based on their resume and the target job description.
      
      Generate a comprehensive "Interview Cheat Sheet" formatted nicely in Markdown containing:
      
      ### 1. Top 3 Behavioral Questions
      - Based on the job description, what are the most likely behavioral questions?
      - Provide a brief tip on how to answer each.

      ### 2. Technical / Skill Gap Analysis
      - Identify any skills required by the job that seem weak or missing in the resume.
      - Suggest exactly how the candidate should address this in the interview.

      ### 3. Suggested STAR Responses
      - Formulate 2 powerful STAR (Situation, Task, Action, Result) stories pulling *directly* from the candidate's actual resume experience that perfectly align with the job's core requirements.
      - Do NOT hallucinate experience. Use only what is in the resume.

      ### 4. Top 3 Questions to Ask Them
      - Provide 3 highly insightful questions the candidate should ask the interviewer to demonstrate deep interest and strategic thinking.

      Job Description:
      ${jobDescription}

      Original Resume:
      ${resumeText}

      Output ONLY the Markdown text. No preamble or meta-text.
    `;

    const response = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama3-8b-8192',
      temperature: 0.5,
    });

    return response.choices[0]?.message?.content?.trim() || 'Failed to generate interview prep.';
  } catch (error) {
    console.error("Groq Interview Prep error:", error);
    return 'An error occurred while generating the interview prep sheet.';
  }
}
