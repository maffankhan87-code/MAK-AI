import "./FileUpload.css";

function FileUpload({onFile}) {


const upload=(e)=>{

const file=e.target.files[0];

if(file){

onFile(file);

}

};



return(

<label className="upload">

📎

<input

type="file"

accept=".pdf,.txt,.doc,.docx,image/*"

onChange={upload}

/>

</label>

);


}


export default FileUpload;