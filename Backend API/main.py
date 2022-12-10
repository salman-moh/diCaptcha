from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import gunicorn
import numpy as np
from tag_generator_model import nlp_tags
import random
import pandas as pd
from fastapi.responses import FileResponse

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def initial_page():
    return {'Page':'Working!'}

@app.get("/get_tags/{prompt}")
def compute_tags(prompt: str):
    '''
    GET /get_tags/{prompt}
    '''

    print("Prompt: {}\n".format(prompt))

    print('Calculating correct and incorrect tags...')
    result = nlp_tags(prompt)
    print('Finished calculating')

    if not result:
        raise HTTPException(status_code=400)

    return result

@app.get('/get_image_prompt')
def randomly_obtain_image_prompts():

    df = pd.read_csv('/home/ubuntu/qna/full_midjourney_cleaned_prompts_imagefiles.csv', index_col=0)
    df = df.fillna('NAN')
    random_idx = random.choice(df['index'].values)
    selected_idx = df.index[df['index']==random_idx].to_list()[0]

    prompt = df.at[selected_idx, 'cleaned_prompt']
    image_filename = random.choice([df.at[selected_idx, 'image_filename_'+str(n+1)]  for n in range(8) if df.at[selected_idx, 'image_filename_'+str(n+1)] != 'NAN'])

    # image_full_path = '/home/ubuntu/qna/images/'+ image_filename
    
    return prompt, image_filename

if __name__ == "__main__":
    uvicorn.run(app)
