FROM bitnami/nginx:1.23.3

#EXPOSE 8080

ADD dist/ /app/
