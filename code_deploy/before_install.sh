#!/bin/bash
if pids=$(sudo lsof -i:8080 -t); then
    sudo kill -9 $pids;
fi
sudo rm -rf /home/ubuntu/webapp_frontend