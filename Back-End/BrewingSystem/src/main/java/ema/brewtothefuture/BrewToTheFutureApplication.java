package ema.brewtothefuture;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class BrewToTheFutureApplication {
    public static void main(String[] args) throws InterruptedException {
        SpringApplication.run(BrewToTheFutureApplication.class, args);
    }
}
