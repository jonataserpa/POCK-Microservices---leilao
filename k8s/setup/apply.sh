#!/bin/bash

echo "Applying Traefik CRDs..."
kubectl apply -f ../traefik/00-crds.yaml

echo "Applying Traefik RBAC..."
kubectl apply -f ../traefik/01-rbac.yaml

echo "Applying Traefik Deployment..."
kubectl apply -f ../traefik/02-deployment.yaml

echo "Applying Traefik Middleware..."
kubectl apply -f ../traefik/03-middleware.yaml

echo "Applying Services..."
kubectl apply -f ../service/frontend.yaml

echo "Applying Deployments..."
kubectl apply -f ../deployment/frontend.yaml

echo "Applying IngressRoutes..."
kubectl apply -f ../ingress/frontend.yaml

echo "Done!"
