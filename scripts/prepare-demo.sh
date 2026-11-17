#!/usr/bin/env bash
set -euo pipefail
if ! command -v ffmpeg >/dev/null 2>&1; then
  sudo apt-get update -qq
  sudo apt-get install -y -qq ffmpeg
fi
source_file="$(mktemp --suffix=.mp4)"
trap 'rm -f "$source_file"' EXIT
curl --fail --location --retry 3 --connect-timeout 20 --max-time 180 \
  https://www.hamsterhub.co/godang/hall-of-fame/videos/slash-speed.mp4 \
  --output "$source_file"
printf '%s  %s\n' 36ab46417dfb516082249d171e6ab49703bc4d3369c1658447b44007f4487068 "$source_file" | sha256sum --check
mkdir -p public/assets/demo
# Actual gameplay, seconds 5–25. Remove the recorded window bar and desktop taskbar.
ffmpeg -hide_banner -loglevel error -y -ss 5 -i "$source_file" -t 20 \
  -vf "crop=1280:650:0:20,fps=30" -an -c:v libx264 -preset medium -crf 25 \
  -pix_fmt yuv420p -movflags +faststart public/assets/demo/slash-gameplay.mp4
ffmpeg -hide_banner -loglevel error -y -ss 1 -i public/assets/demo/slash-gameplay.mp4 \
  -frames:v 1 -c:v libwebp -quality 85 public/assets/demo/slash-gameplay.webp
test -s public/assets/demo/slash-gameplay.mp4
test -s public/assets/demo/slash-gameplay.webp
