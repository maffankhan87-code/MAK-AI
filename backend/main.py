from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from groq import Groq

from pypdf import PdfReader
from docx import Document
from PIL import Image


load_dotenv()


app = FastAPI(
    title="MAK AI"
)



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)





@app.get("/")
def home():

    return {
        "status":"MAK AI Backend Running"
    }






@app.get("/chat")
async def chat(message:str):

    try:


        response = client.chat.completions.create(

            model="llama-3.3-70b-versatile",

            messages=[

                {
                    "role":"user",
                    "content":message
                }

            ]

        )


        return {

            "reply":
            response.choices[0].message.content

        }



    except Exception as e:


        return {

            "error":str(e)

        }







@app.post("/upload")
async def upload_file(
    file:UploadFile = File(...)
):


    filename=file.filename.lower()


    content=""



    # PDF

    if filename.endswith(".pdf"):


        with open(
            "temp.pdf",
            "wb"
        ) as f:

            f.write(
                await file.read()
            )



        pdf=PdfReader("temp.pdf")


        for page in pdf.pages:

            text=page.extract_text()

            if text:

                content += text





    # DOCX

    elif filename.endswith(".docx"):


        with open(
            "temp.docx",
            "wb"
        ) as f:

            f.write(
                await file.read()
            )



        doc=Document("temp.docx")


        for para in doc.paragraphs:

            content += para.text + "\n"






    # TXT

    elif filename.endswith(".txt"):


        data = await file.read()

        content = data.decode(
            "utf-8"
        )







    # Image

    elif filename.endswith(
        (".png",".jpg",".jpeg")
    ):


        image=Image.open(file.file)


        content = (
            "User uploaded an image. "
            "Analyze the image and describe it."
        )






    else:


        return {

            "error":
            "File type not supported"

        }








    # Send file text to AI


    prompt = f"""

You are MAK AI.

Analyze this uploaded file:

{content}


Give a helpful answer.

"""




    response = client.chat.completions.create(

        model="llama-3.3-70b-versatile",

        messages=[

            {
                "role":"user",
                "content":prompt
            }

        ]

    )




    return {

        "filename":filename,

        "reply":
        response.choices[0].message.content

    }