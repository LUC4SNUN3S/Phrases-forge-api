#!/bin/bash

docker build -f Dockerfile.prod -t lucas/phrase-forge:latest .
docker save lucas/phrase-forge:latest | gzip > ./releases/phrase-forge.tar.gz
