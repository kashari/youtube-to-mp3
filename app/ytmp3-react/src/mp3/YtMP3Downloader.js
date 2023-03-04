import {useState} from "react";
import {Input, Button, InputLabel, CircularProgress, Link} from '@mui/material';

const YtMP3Downloader = () => {

    const [inputValue, setInputValue] = useState("");
    const [response, setResponse] = useState(null);
    const [filename, setFileName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        const res = await fetch('http://localhost:8000/download-mp3', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'link': inputValue})
        });


        const blob = await res.blob();
        setResponse(blob);
        setIsLoading(false);
        setInputValue("");
        const contentDisposition = res.headers.get('Content-Disposition') ?? 'Test file.mp3';
        const unDecoded = contentDisposition.toString().split("filename*=utf-8''")[1];
        setFileName(decodeURI(unDecoded));

    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <div>
            <h2>Youtube to MP3</h2>
            <InputLabel>
                URL:
            </InputLabel>
            {!isLoading && <Input type="text" value={inputValue} onChange={handleChange}/> }
            <br/> <br/>
            {isLoading && <CircularProgress size={56} /> }
            {!isLoading && !response && inputValue !== "" && <Button type="button" onClick={handleClick} variant="contained">
                Download
            </Button>}
            {response && (
                <Link underline="none" href={URL.createObjectURL(response)} download={filename}>
                    Download {filename}
                </Link>
            )}
        </div>
    );

};

export default YtMP3Downloader;