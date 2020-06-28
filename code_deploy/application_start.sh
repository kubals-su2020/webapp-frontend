#!/bin/bash
cd /home/ubuntu/webapp_frontend/dist/UI
http-server . > http.log 2>&1 &