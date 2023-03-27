#!/bin/bash
echo
echo '[TASK_09]: Network Policy'
echo '[TASK_09]: Environment cleanup in progress...'
if command -v minikube &> /dev/null
then
  echo '[TASK_09]: Disable ingress...'
  minikube addons disable ingress &> /dev/null
fi
echo '[TASK_09]: Delete lab nampespace...'
kubectl delete ns bat >/dev/null
echo '[TASK_09]: Cleaup complete!'
