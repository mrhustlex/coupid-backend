
# # # # Build stage 2
# # # Use an official NGINX image as a parent image
FROM nginx:alpine
COPY /servers/nginx.conf /etc/nginx/nginx.conf
# Expose the port that NGINX will listen on
EXPOSE 80

# Start NGINX when the container starts
CMD ["nginx", "-g", "daemon off;"]