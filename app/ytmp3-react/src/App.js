import "./App.css"
import YtMP3Downloader from "./mp3/YtMP3Downloader";
import MenuAppBar from "./MenuAppBar";
import React from "react";
import {Container, Grid} from "@mui/material";
import {YtMP4Downloader} from "./mp4/YtMP4Downloader";
import CardGrid from "./CardGrid";

const App = () => {
    return (
        <React.Fragment>
            <MenuAppBar/>
            <Container>
                <meta name="viewport" content="width=device-width" initial-scale="1.00" maximum-scale="1.0"/>
                {/*<Grid container spacing={2}>*/}
                {/*    <Grid item xs={6}>*/}
                {/*        <YtMP3Downloader/>*/}
                {/*    </Grid>*/}
                {/*    <Grid item xs={6}>*/}
                {/*        <YtMP4Downloader/>*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}
                <CardGrid>
                    <YtMP3Downloader />
                    <YtMP4Downloader />
                </CardGrid>
            </Container>
        </React.Fragment>
    );
}

export default App;
