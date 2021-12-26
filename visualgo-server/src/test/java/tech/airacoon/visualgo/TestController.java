package tech.airacoon.visualgo;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class TestController {
    private Logger logger = LoggerFactory.getLogger(TestController.class);

    @Test
    public void testContextLoader(@Autowired MockMvc mvc) throws Exception {
        String result = mvc.perform(MockMvcRequestBuilders.get("/file/default?typeName=pdf")).andReturn().getResponse().getContentAsString();
        logger.debug("响应结果" + result);
    }
}
