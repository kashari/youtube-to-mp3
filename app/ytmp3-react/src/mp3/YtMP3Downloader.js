import {useState} from "react";

const YtMP3Downloader = () => {

    const [inputValue, setInputValue] = useState("");
    const [response, setResponse] = useState(null);
    const [filename, setFileName] = useState("");

    const handleClick = async () => {

        const res = await fetch('http://0.0.0.0:8000/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'link': inputValue})
        });


        const blob = await res.blob();
        setResponse(blob);

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
            <label>
                Input:
                <input type="text" value={inputValue} onChange={handleChange}/>
            </label>
            <button type="button" onClick={handleClick}>
                Download
            </button>
            {response && (
                <a href={URL.createObjectURL(response)} download={filename}>
                    Download {filename}
                </a>
            )}
        </div>
    );

};

export default YtMP3Downloader;