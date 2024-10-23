import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export const dynamic = 'force-dynamic';

const openai = new OpenAI({
  apiKey: "KEY_PLACEHOLDER",
});

export async function POST(req: Request) {
  try {
    const { imageBase64, additionalDetails } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ error: 'Image data is required' }, { status: 400 });
    }

    const defaultInstructions = "Make the titles short, 3-4 words. Make the description long and include a key features section. Both should aim to drive high sales to the product.";
    const instructions = additionalDetails || defaultInstructions;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.7,
      messages: [
        {
          "role": "system",
          "content": "You are an ex-Google SEO consultant that works with Shopify store owners to create Search intent and SEO-optimized titles and descriptions for their product to drive high search volume. \n\nYou're quite experienced, you do this by analyzing the product image and nothing more.\n\nThe user sends you the product picture and some requirements, you return a json that matches the following schema: \n\n{\ntitle: \"...\",\ndescription: \"...\" \n}"
        },
        {
          "role": "user",
          "content": [
            {
              "type": "image_url",
              "image_url": {
                "url": `data:image/jpeg;base64,${imageBase64}`
              }
            },
            {
              "type": "text",
              "text": instructions
            }
          ]
        }
      ]
    });

    const content = response.choices[0].message.content;

    if (content === null) {
      return NextResponse.json({ error: 'AI response is empty' }, { status: 500 });
    }

    let parsedContent;

    try {
      parsedContent = JSON.parse(content);
    } catch (error) {
      return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 });
    }

    return NextResponse.json(parsedContent);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Failed to generate description', details: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
