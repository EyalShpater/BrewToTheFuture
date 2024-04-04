package ema.brewtothefuture.Recipe;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Recipe {
    int counter = 0;

    @GetMapping("/hello")
    public String hello(@RequestParam String name) {
        counter++;
        System.out.println("Request number " + counter + " received");
        return "Hello, " + name + "!";
    }

    @GetMapping("/counter")
    public int counter()
    {
        return ++counter;
    }

}
