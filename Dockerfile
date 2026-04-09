# Dockerfile para To-Do List
# Imagem leve baseada em nginx para servir aplicação estática

# Imagem base oficial do nginx (alpine para menor tamanho)
FROM nginx:alpine

# Definir variável de ambiente
LABEL maintainer="Rodrigo Tenorio"
LABEL description="To-Do List Application - Static Site"
LABEL version="1.0"

# Copiar arquivos da aplicação para o diretório do nginx
COPY index.html /usr/share/nginx/html/index.html
COPY styles.css /usr/share/nginx/html/styles.css
COPY script.js /usr/share/nginx/html/script.js

# Expor a porta 80
EXPOSE 80

# Comando padrão do nginx
CMD ["nginx", "-g", "daemon off;"]
