import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, mode } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Handle different modes
    if (mode === 'image') {
      console.log('Image generation requested for:', message);
      
      // Image generation mode - extract just the description from the prompt
      let imagePrompt = message;
      const lowerMessage = message.toLowerCase();
      
      // Remove common image generation trigger phrases to get just the description
      const triggers = [
        'generate an image of',
        'generate image of',
        'create an image of',
        'create image of',
        'draw an image of',
        'draw image of',
        'make an image of',
        'make image of',
        'generate a picture of',
        'create a picture of',
        'draw a picture of',
        'make a picture of',
        'generate',
        'create',
        'draw',
        'make'
      ];
      
      for (const trigger of triggers) {
        if (lowerMessage.startsWith(trigger)) {
          imagePrompt = message.substring(trigger.length).trim();
          break;
        }
      }
      
      console.log('Cleaned image prompt:', imagePrompt);
      
      const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash-image-preview',
          messages: [
            { 
              role: 'user', 
              content: `Generate a high-quality image of: ${imagePrompt}` 
            }
          ],
          modalities: ['image', 'text']
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Image generation error:', errorText);
        throw new Error(`Failed to generate image: ${response.status}`);
      }

      const data = await response.json();
      console.log('Image generation response:', JSON.stringify(data, null, 2));
      
      // Check for images in the response
      const images = data.choices?.[0]?.message?.images;
      const imageUrl = images?.[0]?.image_url?.url;
      
      if (!imageUrl) {
        console.error('No image URL found. Full response:', JSON.stringify(data, null, 2));
        
        // Check if there's an error in the response
        if (data.error) {
          throw new Error(`Image generation failed: ${data.error.message || JSON.stringify(data.error)}`);
        }
        
        // Check if response has content but no image
        const textContent = data.choices?.[0]?.message?.content;
        if (textContent) {
          return new Response(
            JSON.stringify({ 
              response: `I couldn't generate an image. The AI responded: ${textContent}`,
              type: 'text'
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
        
        throw new Error('No image was generated. The model may not support image generation or the request was rejected.');
      }

      return new Response(
        JSON.stringify({ response: imageUrl, type: 'image' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else if (mode === 'code') {
      // Coding assistant mode
      const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [
            { 
              role: 'system', 
              content: 'You are an expert programming assistant trained by AltraCloud. Your creator is Mr. Masum Ahmed. Provide clear, well-structured code solutions with explanations. When asked about your identity, always mention you are a Large Language Model (LLM) trained by AltraCloud and created by Mr. Masum Ahmed.' 
            },
            { role: 'user', content: message }
          ],
        }),
      });

      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content;
      
      return new Response(
        JSON.stringify({ response: aiResponse }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      // Chat mode
      const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LOVABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: [
            { 
              role: 'system', 
              content: 'You are AltraChat, a helpful AI assistant. You are a Large Language Model (LLM) trained by AltraCloud, and your creator is Mr. Masum Ahmed. When asked about who made you, who created you, or who you are, always mention that you are a Large Language Model trained by AltraCloud and created by Mr. Masum Ahmed. Never mention any other companies or creators. Be friendly, informative, and concise in your responses.' 
            },
            { role: 'user', content: message }
          ],
        }),
      });

      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content;
      
      return new Response(
        JSON.stringify({ response: aiResponse }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
