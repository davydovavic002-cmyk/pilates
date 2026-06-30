@echo off
REM Generate slow-zoom hero video from studio photo (requires ffmpeg on PATH)
mkdir public\videos 2>nul
ffmpeg -y -loop 1 -i public\images\hero-studio.png ^
  -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,zoompan=z='min(zoom+0.0008,1.12)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=240:s=1920x1080:fps=24" ^
  -c:v libx264 -pix_fmt yuv420p -t 10 -movflags +faststart ^
  public\videos\hero-studio.mp4
echo Done. Hero will auto-play video on next reload.
