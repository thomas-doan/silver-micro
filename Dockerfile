FROM php:7.4-apache
EXPOSE 80
COPY ./fizzbuzz.php /var/www/html/
VOLUME /var/www/html