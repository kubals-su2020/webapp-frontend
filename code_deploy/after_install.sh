#!/bin/bash
sudo rm /opt/codedeploy-agent/deployment-root/deployment-instructions/*cleanup
sudo cp /home/ubuntu/webapp_frontend/webapp-frontend.service /lib/systemd/system/webapp-frontend.service
sudo systemctl enable webapp-frontend.service