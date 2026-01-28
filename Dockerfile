FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy the registry data
COPY registry.json /usr/share/nginx/html/registry.json
COPY plugins /usr/share/nginx/html/plugins
COPY themes /usr/share/nginx/html/themes

# Custom nginx config to handle CORS (optional but good for internal dev)
RUN echo "server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index registry.json; \
        add_header 'Access-Control-Allow-Origin' '*'; \
    } \
}" > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
