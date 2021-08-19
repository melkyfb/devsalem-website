#!/bin/bash
aws s3 rm s3://beta.devsalem.com.br/ --recursive
aws s3 sync ./build s3://beta.devsalem.com.br/