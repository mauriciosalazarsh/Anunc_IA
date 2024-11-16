const bot_reply_1 = `
Sure, here's a short joke for a web development tutorial starting:

Why was the web developer always cold?  
Because he left his Windows open!
`
const bot_reply_2 = `
To display a random quote on your webpage using JavaScript, you can follow these steps:

1.  **HTML Structure:** Create an HTML structure for your webpage. You'll need an element, like a &grave;div&grave;, where the random quote will be displayed, and a button to trigger the display of a new quote.
~~~html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Random Quote Generator</title>
</head>
<body>
    <div id="quote-container">
        <p id="quote-text"></p>
    </div>
    <button id="new-quote-button">New Quote</button>
    <script src="script.js"></script>
</body>
</html>
~~~
2.  **Create an Array of Quotes:** Define an array that contains a list of quotes and their authors. Each quote can be an object with two properties: &grave;text&grave; and &grave;author&grave;.
~~~js
const quotes = [
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        text: "Innovation distinguishes between a leader and a follower.",
        author: "Steve Jobs"
    },
    {
        text: "Your time is limited, don't waste it living someone else's life.",
        author: "Steve Jobs"
    },
    // Add more quotes here
];
~~~
3.  **JavaScript to Display Random Quotes:** Write JavaScript code to select a random quote from the array and display it when the button is clicked.
~~~js
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote-text");
const newQuoteButton = document.getElementById("new-quote-button");

// Function to generate and display a random quote
function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    
    quoteText.textContent = randomQuote.text - randomQuote.author;
}

// Initial display of a random quote
displayRandomQuote();

// Event listener for the "New Quote" button
newQuoteButton.addEventListener("click", displayRandomQuote);
~~~
This code selects a random quote from the &grave;quotes&grave; array when the "New Quote" button is clicked and displays it in the &grave;quote-container&grave; element.

4.  **CSS Styling:** You can add CSS to style your webpage as desired.
~~~css
body {
    font-family: Arial, sans-serif;
    text-align: center;
    background-color: #f4f4f4;
}

#quote-container {
    margin: 2rem auto;
    padding: 2rem;
    max-width: 600px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

#quote-text {
    font-size: 1.5rem;
    font-style: italic;
    margin-bottom: 1rem;
}

#new-quote-button {
    padding: 0.5rem 1rem;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

#new-quote-button:hover {
    background-color: #0056b3;
}
~~~
5.  **Testing:** Open your HTML file in a web browser. You should see a random quote displayed initially, and clicking the "New Quote" button should refresh the quote with another random one.

This example demonstrates a simple random quote generator using HTML, CSS, and JavaScript. You can expand and customize it by adding more quotes, additional styling, or even by fetching quotes from an external API for a more dynamic experience.
`

const bot_reply_3 = `Personal:

1. **Mindful Well-being:** Set a resolution focused on personal health and well-being, like practicing mindfulness, incorporating regular exercise, or maintaining a balanced diet. This contributes to overall happiness and fulfillment.

Family:

2. **Quality Time Commitment:** Plan a resolution that emphasizes spending more quality time with family members. This could involve scheduling regular family activities, game nights, or designated family dinners to strengthen bonds and create lasting memories.

Professional:

3. **Skill Development:** Consider a resolution related to professional growth, such as acquiring a new skill, pursuing additional education, or taking on a challenging project at work. This can enhance your career and contribute to long-term success.`

const bot_reply_4 = `
Subject: Resignation Letter

Dear [Supervisor's Name],

I am writing to formally resign from my position at [Company Name], effective [last working day, typically two weeks from the current date]. I have enjoyed my time here and am grateful for the opportunities for professional and personal development that you and the company have provided me.

I have learned a great deal during my tenure and appreciate the support and guidance I have received. I am confident that the skills and experiences gained here will contribute to my future endeavors.

Thank you for the support and understanding. I wish [Company Name] continued success.

Sincerely,

[Your Full Name]`

const bot_reply_5 =`
To make an HTTP request in JavaScript, you can use the built-in &grave;**fetch()**&grave; method or the older &grave;**XMLHttpRequest**&grave; (XHR) object.

Using &grave;**fetch()**&grave; method:
~~~js
fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
~~~
Here, the &grave;**fetch()**&grave; method takes the URL of the resource to fetch as an argument. It returns a &grave;**Promise**&grave; that resolves to a &grave;**Response**&grave; object. You can then use the &grave;**json()**&grave; method of the &grave;**Response**&grave; object to extract the JSON data from the response.

Using &grave;**XMLHttpRequest**&grave; object:
~~~js
const xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.onload = function() {
  if (xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    console.log(data);
  } else {
    console.error('Request failed. Returned status of ' + xhr.status);
  }
};
xhr.send();
~~~
Here, you create a new &grave;**XMLHttpRequest**&grave; object and set its &grave;**open()**&grave; method to specify the HTTP method and the URL of the resource to fetch. You then set the &grave;**onload**&grave; event handler to handle the response when it arrives. Finally, you call the &grave;**send()**&grave; method to send the request. In the &grave;**onload**&grave; event handler, you can check the status code of the response to see if the request was successful and extract the JSON data using the &grave;**responseText**&grave; property.
`

const bot_reply_6 = `Sure! Here's an example team card using Tailwind CSS:
~~~html
<div class="bg-white rounded-lg shadow-md overflow-hidden">
  <img src="team-member.jpg" alt="Team Member" class="w-full h-48 object-cover">
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">John Doe</div>
    <p class="text-gray-700 text-base">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque velit quis dui facilisis, vel luctus felis commodo.
    </p>
  </div>
  <div class="px-6 py-4">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#Marketing</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#Design</span>
  </div>
</div>
~~~
This code creates a team card with an image, name, description, and two tags indicating the team member's areas of expertise. Here's a breakdown of what each class does:

- &grave;**rounded-lg**&grave;: rounds the corners of the card
- &grave;**shadow-md**&grave;: adds a subtle drop shadow
- &grave;**bg-white**&grave;: sets the background color to white
- &grave;**overflow-hidden**&grave;: hides any overflow from the image
- &grave;**w-full**&grave;: sets the image to be the full width of its container
- &grave;**h-48**&grave;: sets the height of the image to be 48 units (you can adjust this as needed)
- &grave;**object-cover**&grave;: makes sure the image fills its container without distorting or cropping
- &grave;**px-6**&grave;: adds horizontal padding to the content inside the card
- &grave;**py-4**&grave;: adds vertical padding to the content inside the card
- &grave;**font-bold**&grave;: makes the name bold
- &grave;**text-xl**&grave;: sets the font size of the name to extra large
- &grave;**mb-2**&grave;: adds some bottom margin to the name
- &grave;**text-gray-700**&grave;: sets the color of the description text to a dark gray
- &grave;**text-base**&grave;: sets the font size of the description text to base size
- &grave;**inline-block**&grave;: makes the tags display inline
- &grave;**bg-gray-200**&grave;: sets the background color of the tags to a light gray
- &grave;**rounded-full**&grave;: rounds the corners of the tags to make them circular
- &grave;**px-3**&grave;: adds horizontal padding to the tags
- &grave;**py-1**&grave;: adds vertical padding to the tags
- &grave;**text-sm**&grave;: sets the font size of the tags to small
- &grave;**font-semibold**&grave;: makes the tags bold
- &grave;**text-gray-700**&grave;: sets the color of the tag text to a dark gray
- &grave;**mr-2**&grave;: adds some right margin to the first tag to space them out a bit
- &grave;**mr-2**&grave;: adds some right margin to the first tag to space them out a bit
`

const bot_reply_7 = `
React is a popular JavaScript library used for building user interfaces, and following best practices can help you write cleaner, more maintainable, and performant code. Here are 10 React best practices to keep in mind:

1. **Component Structure and Organization:** Organize your components in a modular way, keeping them small and focused on specific tasks. Group related components into folders and use clear naming conventions.
2. **Use Functional Components:** With the introduction of React hooks, functional components have become the preferred way to write components. They are more concise, easier to test, and promote the use of hooks.
3. **State Management:** Use state management libraries like Redux or Mobx for handling complex state logic, shared state between components, and better predictability.
4. **Avoid Directly Manipulating the DOM:** In React, avoid directly manipulating the DOM using native DOM APIs like getElementById or innerHTML. Instead, let React handle the rendering and use React's state and props to manage changes.
5. **Keys in Lists:** When rendering lists in React, always provide a unique key prop to each item. This helps React efficiently update the UI when the list changes.
6. **Immutability:** Avoid direzctly modifying state and props as it can lead to unintended side effects. Use immutable data structures or helper libraries (e.g., Immutable.js) to handle updates more predictably.
7. **Performance Optimization:** Use tools like React's memo or PureComponent to prevent unnecessary re-renders, and leverage React's built-in shouldComponentUpdate or React.memo for functional components.
8. **Destructuring Props:** Destructure props in functional components to make your code cleaner and easier to read, as well as to avoid unnecessary repetition.
9. **PropTypes or TypeScript:** Type-checking is crucial for avoiding bugs and maintaining a healthy codebase. Use PropTypes or TypeScript to define the expected types of props and state.
10. **Error Boundaries:** Use Error Boundaries to catch and handle errors within your components, preventing the entire application from crashing due to an error in a single component.

Remember, best practices can change over time with new React features and updates, so always stay up-to-date with the latest recommendations from the React community and official documentation.
`

const data=[
    {
        id:'cid01',
        title:'Random Quote on Your Webpage with JavaScript',
        replys: [
            {
                from: 'human',
                text: 'write me short joke for web development tutorial starting',
            },
            {
                from: 'bot',
                text: bot_reply_1,
            },
            {
                from: 'human',
                text: 'Display a Random Quote on Your Webpage with JavaScript',
            },
            {
                from: 'bot',
                text: bot_reply_2,
            },
            {
                from: 'human',
                text: '**/imagine** Surprise me with random cute awesome photo',
            },
            {
                from: 'bot',
                images:[
                    {
                        src: "/images/generated/a-modern-and-innovative-commercial-booth-in-the-middle-of-the-desert.jpg",
                    },
                    {
                        src: "/images/generated/a-teeny-tiny-cute-redheaded-gremlin-girl-reaching-her-hands-into-the-air-saying-because-I-love-you.jpg",
                    },
                    {
                        src: "/images/generated/cute-cat-as-calculator-macaroon-as-the-buttons-of-the-calculator-ribbon-happy-colors2.jpg",
                    },
                    {
                        src: "/images/generated/cute-cat-as-calculator-macaroon-as-the-buttons-of-the-calculator-ribbon-happy-colors.jpg",
                    },
                ]
            }
        ]
    },
    {
        id:'cid02',
        title:'Surprise me with cute awesome photo',
        replys: [
            {
                from: 'human',
                text: '**/imagine** Surprise me with random cute awesome photo',
            },
            {
                from:'bot',
                images:[
                    {
                        src: "/images/generated/happy-ice-cream-sining.jpg",
                    },
                    {
                        src: "/images/generated/cute-cat-as-calculator-macaroon-as-the-buttons-of-the-calculator-ribbon-happy-colors2.jpg",
                    },
                    {
                        src: "/images/generated/melted-candle-looks-like-a-fried-chicken-burger-in-pastel-colours.jpg",
                    },
                    {
                        src: "/images/generated/design-the-world-through-the-eyes-of-a-neurodivergent-child-vivid-and-vibrant-colours-fun-white-background-hyper-realistic.jpg",
                    },
                ] 
            },
            {
                from: 'human',
                text: '**/imagine** Hyper Realistic Modern Furniture with Mood Lighting',
            },
            {
                from:'bot',
                images:[
                    {
                        src: "/images/generated/hyper-realistic-modern-sofa-with-pastel-colors-and-white-background-cinematic-light.jpg", 
                    },
                    {
                        src: "/images/generated/hyper-realistic-modern-furniture-with-white-background-and-pastel-colors-cinematic-lights.jpg",
                    },
                    {
                        src: "/images/generated/hype-realistic-modern-bed-with-sandy-colors-white-background-and-cinematic-lights.jpg",
                    },
                    {
                        src: "/images/generated/a-modern-and-innovative-commercial-booth-in-the-middle-of-the-desert.jpg",
                    },
                ] 
            }
        ]
    },
    {
        id:'cid03',
        title:'Make an HTTP request in Javascript?',
        replys: [
            {
                from: 'human',
                text: 'How do I make an HTTP request in Javascript? ',
            },
            {
                from:'bot',
                text: bot_reply_5
            }
        ]
    },
    {
        id:'cid04',
        title:'Team card with tailwind css',
        replys: [
            {
                from: 'human',
                text: 'Make me a team card with tailwind css',
            },
            {
                from: 'bot',
                text: bot_reply_6,
            },
        ]
    },
    {
        id:'cid05',
        title:'Tutorial React Best practices',
        replys: [
            {
                from: 'human',
                text: 'Write 10 React Best practices ',
            },
            {
                from: 'bot',
                text: bot_reply_7,
            },
        ]
    },
    {
        id:'cid06',
        title:'Give me 3 ideas about how to plan good New Years resolutions. Give me some that are personal ,family, and professionally-oriented.',
        replys: [
            {
                from: 'human',
                text: 'Give me 3 ideas about how to plan good New Years resolutions. Give me some that are personal, family, and professionally-oriented.',
            },
            {
                from: 'bot',
                text: bot_reply_3,
            },
        ]
    },
    {
        id:'cid07',
        title:'Resignation Letter Assistance',
        replys: [
            {
                from: 'human',
                text: 'Could you help me write a resignation later ',
            },
            {
                from: 'bot',
                text: 'Certainly! Please provide some details like your current position, the date you plan to resign, and any specific reasons you would like to include in your resignation letter.',
            },
            {
                from: 'human',
                text: 'Just a generic one ',
            },
            {
                from: 'bot',
                text: bot_reply_4,
            },
        ]
    },
]

export default data;