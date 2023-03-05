import "./App.css"
import MenuAppBar from "./MenuAppBar";
import React, {useState} from "react";
import {
    Button,
    Container,
    Typography,
    TextField,
    ButtonGroup,
    CircularProgress,
    Alert,
    Link
} from "@mui/material";


const App = () => {
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [downloadType, setDownloadType] = useState('');
    const [fileName, setFileName] = useState('');
    const [response, setResponse] = useState(null);

    const handleInputChange = (event) => {
        setUrl(event.target.value);
    };

    const handleButtonClick = async () => {
        setIsLoading(true);
        setError('');
        try {
            const res = await fetch(`http://localhost:8000/download-${downloadType}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'link': url})
            });
            const blob = await res.blob();
            setResponse(blob);
            setIsLoading(false);
            setUrl("");
            const contentDisposition = res.headers.get('Content-Disposition') ?? 'Test file.mp3';
            const unDecoded = contentDisposition.toString().split("filename*=utf-8''")[1];
            setFileName(decodeURI(unDecoded));
        } catch (error) {
            setError('Error downloading video or audio.');
        }
        setIsLoading(false);
    };

    const handleDownloadTypeClick = (type) => {
        setDownloadType(type);
    };


    return (
        <React.Fragment>
            <MenuAppBar/>
            <meta name="viewport" content="width=device-width" initial-scale="1.00" maximum-scale="1.0"/>
            <Container
                style={{
                    marginTop: '50px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                maxWidth="sm"
            >
                <Typography variant="h4">YouTube to MP3/4</Typography>
                <div
                    style={{
                        marginTop: '20px',
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <TextField
                        style={{marginBottom: '10px', width: '100%'}}
                        label="Enter YouTube video URL"
                        variant="outlined"
                        value={url}
                        onChange={handleInputChange}
                    />
                    <ButtonGroup
                        style={{marginBottom: '20px'}}
                        color="primary"
                        aria-label="outlined primary button group"
                    >
                        <Button
                            style={{height: '100%', borderRadius: '0'}}
                            variant={downloadType === 'mp3' ? 'contained' : 'outlined'}
                            onClick={() => handleDownloadTypeClick('mp3')}
                        >
                            MP3
                        </Button>
                        <Button
                            style={{height: '100%', borderRadius: '0', marginRight: '5px'}}
                            variant={downloadType === 'mp4' ? 'contained' : 'outlined'}
                            onClick={() => handleDownloadTypeClick('mp4')}
                        >
                            MP4
                        </Button>
                    </ButtonGroup>
                    <Button
                        style={{height: '40px', borderRadius: '0', width: '100%'}}
                        color="primary"
                        variant="contained"
                        disabled={!url || !downloadType || isLoading}
                        onClick={handleButtonClick}
                    >
                        {isLoading ? (
                            <>
                                Converting...
                                <CircularProgress style={{marginLeft: '10px'}} size={20} color="inherit"/>
                            </>
                        ) : (
                            'Convert'
                        )}
                    </Button>
                    <br /><br />
                    {response && (
                            <Link underline="none" href={URL.createObjectURL(response)} download={fileName}>
                                Download {fileName}
                            </Link>
                        )}
                    {error && (
                        <Alert style={{marginTop: '20px', width: '100%'}} severity="error">
                            {error}
                        </Alert>
                    )}
                </div>
            </Container>
        </React.Fragment>
    );
}

export default App;
