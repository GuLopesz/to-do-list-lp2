package br.edu.ifsp.todolist.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") //libera para todas as rotas
        .allowedOrigins("http://localhost:3000") //porta do front
        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
    }
}
