package tech.airacoon.visualgo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 * @author airacoon(li.guiyang@hotmail.com)
 */
public class ServletInitializer extends SpringBootServletInitializer {
    private Logger logger = LoggerFactory.getLogger(ServletInitializer.class);

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        logger.info("----- ServletInitializer -----");
        return application.sources(VisualgoServerApplication.class);
    }

}
