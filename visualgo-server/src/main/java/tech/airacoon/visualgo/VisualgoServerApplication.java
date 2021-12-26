package tech.airacoon.visualgo;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * @author airacoon(li.guiyang@hotmail.com)
 */
@MapperScan({"tech.airacoon.visualgo.dao"})
@SpringBootApplication
@EnableTransactionManagement
public class VisualgoServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(VisualgoServerApplication.class, args);
	}

}
