package tech.airacoon.visualgo;

import org.junit.Test;

import java.text.SimpleDateFormat;
import java.util.Date;

public class OtherTest {
    @Test
    public void datetest() {
        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        String dateStr = sdf.format(date);
        System.out.println(dateStr);
    }
}
