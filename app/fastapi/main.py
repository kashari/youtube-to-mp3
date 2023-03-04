import shutil

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi_utils.tasks import repeat_every
from moviepy.editor import *
from pydantic import BaseModel
from pytube import YouTube

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# for JSON
class VideoInfo(BaseModel):
    link: str


class AudioInfo(BaseModel):
    link: str


@app.post("/download-mp3")
async def download_audio(audio_info: AudioInfo) -> FileResponse:
    url = audio_info.link

    video = YouTube(url)
    video_stream = video.streams.get_highest_resolution()
    video_stream.download(output_path='audios/')

    video_file = VideoFileClip('./audios/' + video_stream.default_filename)
    audio_file = video_file.audio
    audio_file.write_audiofile('./audios/' + video_stream.default_filename[:-4] + ".mp3")

    os.remove('./audios/' + video_stream.default_filename)
    file_path = './audios/' + video_stream.default_filename[:-4] + ".mp3"
    headers = {'Access-Control-Expose-Headers': 'Content-Disposition'}
    return FileResponse(file_path, media_type='audio/mpeg', filename=video_stream.default_filename[:-4] + ".mp3",
                        headers=headers)


@app.post("/download-mp4")
async def download_video(video_info: VideoInfo) -> FileResponse:
    url = video_info.link

    video = YouTube(url)
    video_stream = video.streams.get_highest_resolution()
    video_stream.download(output_path='audios/')

    file_path = './audios/' + video_stream.default_filename
    headers = {'Access-Control-Expose-Headers': 'Content-Disposition'}
    return FileResponse(file_path, media_type='audio/mpeg', filename=video_stream.default_filename,
                        headers=headers)


# every 5 minutes empty the directory save server space...
@app.on_event("startup")
@repeat_every(seconds=60 * 5)
def clear_dir() -> None:
    """
    This method clears the directory where the audio files are stored.
    """
    print('Deleting all files inside the ./audios/ directory.')
    folder = './audios'
    for filename in os.listdir(folder):
        file_path = os.path.join(folder, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            print('Failed to delete %s. Reason: %s' % (file_path, e))
    print('DONE deleting all files inside the ./audios/ directory.')
