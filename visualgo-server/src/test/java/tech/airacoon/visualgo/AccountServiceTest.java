package tech.airacoon.visualgo;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import tech.airacoon.visualgo.pojo.Account;
import tech.airacoon.visualgo.service.AccountService;

@SpringBootTest
public class AccountServiceTest {
    @Autowired
    private AccountService accountService;
    private Logger logger = LoggerFactory.getLogger(AccountServiceTest.class);
    @Test
    public void regTest() {
        Account account = new Account();
            account.setEmail("teacher@airacoon.tech");
        account.setName("teacher");
        account.setPassword("123456");
        Integer a1 = accountService.regAccount(account);
        logger.info(a1.toString());
    }

}
