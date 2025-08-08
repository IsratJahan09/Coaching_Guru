


// // import {
// //   GoogleGenAI,
// // } from '@google/genai';

// // const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
// // const genAI = new GoogleGenAI(apiKey);
// // const model = genAI.GoogleGenAI({
// //   model: 'gemini-2.0-flash-lite',
// // });

// // const generationConfig = {
// //   temperature: 1,
// //   topP: 0.95,
// //   topK: 40,
// //   maxOutputTokens: 8192,
// //   resposeMimeType: 'application/json',
// // };

// // export const GenerateTopicsAIModel = model.starChat({
// //   generationConfig,
// //   history: [
// //     {
// //       role: 'user',
// //       parts: [
// //         {
// //           text: `Learn Python : : As your are coaching teacher`
// //         }
// //       ]
// //     },
// //     {
// //   role: "model",
// //   parts: [
// //     {
// //       text: "```json\n{\n  \"Course title\": [\n    \"Python Basics: A Gentle Intro\",\n    \"Python Fundamentals: Data & Control\",\n    \"Python Programming: Functions and Modules\",\n    \"Object-Oriented Python: Classes and Objects\",\n    \"Python Data Handling: Files and APIs\",\n    \"Intermediate Python: Exploring Libraries\",\n    \"Python Project: Build Your First Application\"\n  ]\n}\n```"
// //        }
// //      ],
// //     }
// //   ],
// // });



const {
  GoogleGenerativeAI,
}=require('@google/generative-ai')

const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
};

 export const GenerateTopicsAIModel = model.startChat({
 generationConfig,
  history: 
  [
    {
      role: 'user',
      parts: [
        {
          text: "Learn Python : : As your are coaching teacher"
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
       text: "```json\n{\n  \"course title\": [\n    \"Python Basics: A Gentle Intro\",\n    \"Python Fundamentals: Data & Control\",\n    \"Python Programming: Functions and Modules\",\n    \"Object-Oriented Python: Classes and Objects\",\n    \"Python Data Handling: Files and APIs\",\n    \"Intermediate Python: Exploring Libraries\",\n    \"Python Project: Build Your First Application\"\n  ]\n}\n```"

        },
      ],
    },
    
  ]
});

 export const GenerateCourseAIModel = model.startChat({
 generationConfig,
  history: 
  [
   
    
  ]
});



// // To run this code you need to install the following dependencies:
// // npm install @google/genai mime
// // npm install -D @types/node

// import {
//   GoogleGenAI,
// } from '@google/genai';

//   const ai = new GoogleGenAI({
//     apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY,

//   });
//   // const config = {
//   //   responseMimeType: 'application/json',
//   // };
//   const model = 'gemini-2.0-flash-lite';
//   const generationConfig = ai.GoogleGenAI({
//     temperature: 1,
//     topP: 0.95,
//     topK: 40,
//     maxOutputTokens: 8192,
//     responseMimeType: 'application/json',
//   });
//   export const GenerateTopicsAIModel = model.startChat({
//     generationConfig,
//     history: [
//       {
//         role: 'user',
//         parts: [
//           {
//             text: `text: Learn Python : : As your are coaching teacher -User want to learn about the topic -Generate 5-7 Course title for study (Short) -Make sure it is related to description -Output will be ARRAY of String in JSON FORMAT only -Do not add any plain text in output like this - { Course title:[ "python Bacis: a Gentle into", "python fundamental : Data & Control" "python Programming : function and module" "object oriented python: classes" "python data handaling : file and apis" "intermideate python : libearys" "python project: build your first app" ] },`,
//         },
//       ],
//     },
//     {
//       role: 'model',
//       parts: [
//         {
//           text: `[
//   "Python Basics: A Gentle Intro",
//   "Python Fundamentals: Data & Control",
//   "Python Programming: Functions and Modules",
//   "Object-Oriented Python: Classes",
//   "Python Data Handling: Files and APIs",
//   "Intermediate Python: Libraries",
//   "Python Project: Build Your First App"
// ]`,
//         },
//       ],
//     },

//   ]
// });

//   // const response = await ai.models.generateContentStream({
//   //   model,
//   //   config,
//   //   contents,
//   // });



  


