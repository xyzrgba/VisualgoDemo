package tech.airacoon.visualgo.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @author airacoon(li.guiyang@hotmail.com)
 * 配置静态资源
 */
@Configuration
public class FileStaticConfig implements WebMvcConfigurer {
    @Value("${customize.static.sources-path}")
    private String sourcePath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/sources/**").addResourceLocations(sourcePath);
    }
}
