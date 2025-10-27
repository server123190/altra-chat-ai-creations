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
      // Image generation mode
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
              content: message 
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
      console.log('Image generation response:', JSON.stringify(data));
      
      const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
      
      if (!imageUrl) {
        console.error('No image URL in response:', data);
        throw new Error('No image was generated');
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
              content: 'You are an expert programming assistant. Provide clear, well-structured code solutions with explanations.' 
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
              content: 'You are AltraChat, a helpful AI assistant created by AltraCloud and Mr. Masum Ahmed. Be friendly, informative, and concise.' 
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
