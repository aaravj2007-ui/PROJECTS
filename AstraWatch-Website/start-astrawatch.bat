@echo off
title Aapda Buddy Live Alert Server
cd /d "%~dp0"
start "Aapda Buddy Server" /b python server.py
timeout /t 2 /nobreak >nul
start "" http://127.0.0.1:4174/
echo Aapda Buddy is running at http://127.0.0.1:4174/
echo Keep this window open while using the website.
pause
