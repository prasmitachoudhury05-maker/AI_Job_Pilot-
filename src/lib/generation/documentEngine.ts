import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || 'gsk_mock_key',
});

/**
 * Generates a tailored cover letter using Groq AI.
 */
export async function generateCoverLetter(resumeText: string, jobDescription: string, tone: string = 'Professional'): Promise<string> {
  try {
    const prompt = `
      You are an expert career coach and technical recruiter.
      Write a compelling cover letter for the candidate based on their resume and the following job description.
      
      Requirements:
      - The tone should be: ${tone}.
      - Keep it concise, engaging, and under 400 words.
      - Do NOT invent or hallucinate experience the candidate does not have.
      - Focus on connecting the candidate's actual experience from their resume to the specific needs in the job description.
      
      Job Description:
      ${jobDescription}

      Original Resume:
      ${resumeText}

      Output ONLY the cover letter text. No preamble or meta-text.
    `;

    const response = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama3-8b-8192',
      temperature: 0.5,
    });

    return response.choices[0]?.message?.content?.trim() || 'Failed to generate cover letter.';
  } catch (error) {
    console.error("Groq Cover Letter error:", error);
    return 'An error occurred while generating the cover letter.';
  }
}

/**
 * Generates an outreach message (e.g. LinkedIn connection request or email) using Groq AI.
 */
export async function generateOutreachMessage(resumeText: string, jobDescription: string, type: string = 'LinkedIn Recruiter'): Promise<string> {
  try {
    const isLinkedIn = type.toLowerCase().includes('linkedin');
    const lengthConstraint = isLinkedIn ? 'under 300 characters (suitable for a LinkedIn connection note)' : 'under 150 words (suitable for a cold email)';
    
    const prompt = `
      You are an expert career coach.
      Write a networking outreach message for the candidate to send to a ${type} regarding the job described below.
      
      Requirements:
      - Length: ${lengthConstraint}.
      - Tone: Professional but enthusiastic.
      - Goal: Secure an intro call or get the resume reviewed.
      - Reference a key matching skill from the candidate's resume that fits the job description.
      
      Job Description:
      ${jobDescription}

      Original Resume:
      ${resumeText}

      Output ONLY the message text. No preamble.
    `;

    const response = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama3-8b-8192',
      temperature: 0.5,
    });

    return response.choices[0]?.message?.content?.trim() || 'Failed to generate outreach message.';
  } catch (error) {
    console.error("Groq Outreach Message error:", error);
    return 'An error occurred while generating the outreach message.';
  }
}
