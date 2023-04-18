#!/bin/bash
setupK8sLab() {
  echo '{"apiVersion":"v1","kind":"List","items":[{"apiVersion":"v1","kind":"Namespace","metadata":{"name":"bat"}},{"apiVersion":"apps/v1","kind":"Deployment","metadata":{"labels":{"appid":"webapp"},"name":"webapp","namespace":"bat"},"spec":{"replicas":2,"selector":{"matchLabels":{"appid":"webapp"}},"template":{"metadata":{"labels":{"appid":"webapp"}},"spec":{"containers":[{"image":"gcr.io/google-samples/node-hello:1.0","name":"nginx"}]}}}},{"apiVersion":"v1","kind":"Service","metadata":{"labels":{"appid":"webapp"},"name":"webapp","namespace":"bat"},"spec":{"ports":[{"port":80,"protocol":"TCP","targetPort":80}],"selector":{"app":"webapp"}}},{"kind":"Ingress","apiVersion":"networking.k8s.io/v1","metadata":{"name":"webapp","namespace":"bat"},"spec":{"ingressClassName":"ngnx","rules":[{"http":{"paths":[{"path":"/","pathType":"Prefix","backend":{"service":{"name":"webapp","port":{"number":80}}}}]}}]}}]}' | kubectl apply -f - >/dev/null
}
echo
echo '[TASK_09]: Network Policy'
echo '[TASK_09]: Environment setup in progress...'
if ! command -v kubectl &> /dev/null
then
  echo '[TASK_09]: Error - kubectl not found!'
  echo '[TASK_09]: Please install kubectl and try again!'
  exit
fi
if command -v minikube &> /dev/null
then
  minikube addons enable ingress &> /dev/null
  setupK8sLab
  echo '[TASK_09]: Setup complete!'
else
  setupK8sLab
  echo '[TASK_09]: Warning - minikube not found'
  echo '[TASK_09]: Warning - This lab relies on the Ingress Resource!'
  echo '[TASK_09]: Warning - Ensure you have an IngressController like ingress-nginx in your cluster!'
fi
