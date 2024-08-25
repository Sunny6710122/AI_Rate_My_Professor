const express = require('express');
const hbs = require("hbs");
const path = require("path");
const bodyParser = require('body-parser');
const app = express();
port = 8000;
let resp2 ;
const { HfInference } = require('@huggingface/inference');
const { Pinecone } = require('@pinecone-database/pinecone');
const Groq = require("groq-sdk");
const pc = new Pinecone({ apiKey: '6e984d91-ae10-4ea5-be10-c2ce41f9cd0b' });
// Initialize Hugging Face Inference client
const hf = new HfInference('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');
const groq = new Groq({ apiKey: "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" });
let ALLRevINOne = '';

let objectArray = [];
let response1= "";


async function main2(userinput,contectt) {
    const userQuestion = userinput; // Example user question
  
    const chatCompletion = await getGroqChatCompletion1(userQuestion,contectt);
    const response = chatCompletion.choices[0]?.message?.content || "";
  
      return response;
  }
  
  async function getGroqChatCompletion1(userQuestion,contectt) {
    return groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: contectt + "\nYou are given several student reviews about a course. Your task is to generate a detailed and cohesive paragraph summarizing the key points from these reviews. Focus on providing a comprehensive overview of the students' opinions and experiences, ensuring that all information is presented in a single paragraph format. Do not use bullet points or any other list format; instead, write the summary as a continuous paragraph",
        },
        {
          role: "user",
          content: userQuestion,
        },
      ],
      model: "llama3-8b-8192",
    });
  }
  







  async function main3(userinput) {
    const userQuestion = userinput; // Example user question
  
    const chatCompletion = await getGroqChatCompletion3(userQuestion);
    const response = chatCompletion.choices[0]?.message?.content || "";
  
    if (isResponseRelatedToDataset3(response)) {
      console.log("yes");
      return "yes";
    } else {
      console.log("no");
      return "no";
    }
  }
  
  function isResponseRelatedToDataset3(response) {
    // This function checks if the response is related to courses, professors, or related topics.
    // Adjust the keywords as per your dataset.
    const relatedKeywords = ["course", "professor", "lecture", "syllabus", "exam", "assignment"];
    return relatedKeywords.some((keyword) => response.toLowerCase().includes(keyword));
  }
  
  async function getGroqChatCompletion3(userQuestion) {
    return groq.chat.completions.create({
      messages: [
       
        {
          role: "user",
          content: userQuestion,
        },
      ],
      model: "llama3-8b-8192",
    });
  }






















async function main(userinput) {
    const userQuestion = userinput; // Example user question
  
    const chatCompletion = await getGroqChatCompletion(userQuestion);
    const response = chatCompletion.choices[0]?.message?.content || "";
  
    //   console.log(response);
      return response;
}
  
//   function isResponseRelatedToTopic(response) {
//     // Here you can implement additional logic to verify the response is related to GitHub.
//     // For simplicity, we'll assume the model provides a response if it knows the answer related to GitHub.
//     return response && response.toLowerCase().includes("github");
//   }
  
  async function getGroqChatCompletion(userQuestion) {
    return groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: userQuestion,
        },
      ],
      model: "llama3-8b-8192",
    });
  }












// Initialize Pinecone client directly using the constructor
const indexName = "reviews";
const index = pc.index(indexName);

// Function to encode the query and then query Pinecone
async function encodeQuery(query) {
    try {
        const encodedResponse = await hf.featureExtraction({
            model: 'sentence-transformers/all-MiniLM-L6-v2',
            inputs: query
        });
        return encodedResponse;
    } catch (error) {
        console.error('Error encoding query:', error);
        throw error; // Re-throw the error to handle it in the main function
    }
}

// Function to query the Pinecone index
async function queryPinecone(vector) {
    try {
        const queryResponse = await index.query({
            topK: 3,
            vector: vector,
            includeMetadata: true
        });
        
        // Extract reviews from the response
        const data = queryResponse.matches;
        let ALlreviews = '';
        data.forEach(item => {
            ALlreviews += item.metadata.review;
            ALlreviews += `\n\n`;
        });
        return { data, ALlreviews };
    } catch (error) {
        console.error('Error querying Pinecone:', error);
        throw error; // Re-throw the error to handle it in the main function
    }
}

// Main function to run the query and log results
async function main1(userinput1) {
    try {
        userQuery = userinput1;
        let repp = await main3(userQuery)
        if(repp=="no")
        {
          resp2 = await main(userQuery);
          return;
        }
        const vector = await encodeQuery(userQuery);
        const { data, ALlreviews } = await queryPinecone(vector);
        let onereview = '';
        for (let i = 0; i < data.length; i++) 
        {
            onereview = data[i].metadata.review;
            // console.log(onereview);
            
            let reponse1 = await main(onereview);
            ALLRevINOne += reponse1;
            ALLRevINOne += "\n\n\n\n";
        }

        // console.log(ALLRevINOne);
        resp2 = await main2(userQuery,ALLRevINOne);
        console.log(resp2);
        
        
        // console.log(data.length);
        
        // data.forEach(item => {
        //     let onereview = item.metadata.review;
        // });
        //console.log('Data:', data); // This will be available here after the query completes
        // console.log('All Reviews:', ALlreviews);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// main1();








const templatePath = path.join(__dirname,"./Templates");

msgggg = "";
app.set("view engine","hbs");
app.set("views",templatePath);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',async (req,res)=>
{
    objectArray = []
    res.render("mainpage",{objectArray: JSON.stringify(objectArray)});
});





app.post('/prompt',async (req,res)=>
{
    let userinput1 = req.body.input;
    // console.log(req.body.input);
    await main1(userinput1);
    console.log(resp2);
    
    objectArray.push({
        user: userinput1,
        AI: resp2
    });
    
    // console.log(objectArray);
    // console.log("dsfds");
    
    // console.log(response1);
    
    
    res.render("mainpage",{objectArray: JSON.stringify(objectArray)});
});




app.post('/NewChat',async (req,res)=>
  {      
      objectArray = []
      res.render("mainpage",{objectArray: JSON.stringify(objectArray)});
  });



app.listen(port,'localhost',()=>{
    console.log(`Listening on port number : ${port}`);
});
