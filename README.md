# diCaptcha - Diffusion based Captcha

A repo for our team participating in AssemblyAI hackathon 2022
Video that describes the demo: https://youtu.be/ENv-qlfjSe8



## Inspiration 💡
Ever tried to select all boxes that have traffic lights showing up and confused if you're supposed to check the very edge of it? 
![alt text](https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/62ea9176e70b564abdf44af2_mio-x4Rjl7cVKZC_RNkP-sGg-ogV5hoDzsHY63h7tqLEOVYsduSwbveoy2VYWbjtAnwD7PNWBR0ejjOosbg0Js16zXjcbgCbPuVlCWpY9xso33-JHg8SML4OzJD_IL_UHxymL0A0dN20TxYgJhFaogQ.jpeg)
The inspiration comes from providing a better Captcha user experience while keeping security also in mind.

## What it does 🤖
![alt text] (https://raw.githubusercontent.com/salman-moh/retail-super-market-sales/main/DEMO_clipdrop-enhance.png)
It shows a user an AI generated image and ask to select keywords/tags that are associated with the image.
Tags will have 3 correct tags/keywords (that are actually associated with the image and part of the prompt)
Tags will also have 3 negative tags/keywords (that are randomly generated and have nothing to do with the image)


 So here we use the fact that the human is supposed to decipher what sort of tags are associated with the image directly or indirectly. The image and keywords are associated in a more complex way than just literally asking to classify the image.

## How we built it 🛠️
![alt text](https://raw.githubusercontent.com/salman-moh/retail-super-market-sales/main/architecture.jpg)

We used AWS to host the API's, and we divided our product into 3 components described below:-


* AI component: We use diffusion models generated images from prompts | Convert prompts to tags using POS model and some preprocessing steps

* Backend component: We randomly pick Image and Prompt from an API | We convert prompt to tags from another API

* Frontend component: We display a Captcha like experience but with a modern touch to it using

## Challenges we ran into
1. Challenges were in creating a NLP pipeline so we can select truly relevant keywords from the prompt (which is used to generate the image). 
2. The Negative keywords were being selected from a random word generator we created. Even with carefully picking correct keywords from prompts and picking random words as negative keywords, we can sometimes look at the image and be confused as to what correct tags are. This needs further improvement.

## Accomplishments that we're proud of ✨
We proud to create something creative out of diffusion models in the security space that is scalable at internet scale.
Provides value to the internet security. 

## What we learned 🧠
More about language models, diffusion models and its ability to generate images. It was also our first Hackathon,  Amir and I learnt many things both from ML engineering and time-management.

## What's next for diCaptcha Diffusion Captcha For Creative Tastes 🔜
1. Make the Tag generation model better and more untuitive for making it easier. 
2. Protect our service from scraping and attacks. 
3. To add user specific Captcha, called personalized Captcha security. A user's intrests are used to show related images and asked to clear the task of selecting correct tags.
