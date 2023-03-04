import "./App.css"
import YtMP3Downloader from "./mp3/YtMP3Downloader";
import MenuAppBar from "./MenuAppBar";

const App = () => {
    return (
   <div>
       <MenuAppBar />
       <YtMP3Downloader />
   </div>
  );
}

export default App;
