package ema.brewtothefuture.recipe.impl;

import ema.brewtothefuture.recipe.api.Ingredient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class Recipe {
    private List<Ingredient> ingredients;





    int counter = 0;
    double temp = 0;

    @GetMapping("/hello")
    public String hello(@RequestParam String name) {
        counter++;
        System.out.println("Request number " + counter + " received");
        return "Hello, " + name + "!";
    }

    @GetMapping("/counter")
    public String counter()
    {
        return "Counter: " + (++counter);
    }

    @GetMapping("/decCounter")
    public String decCounter() {
        return "Counter: " + (--counter);
    }

    @PostMapping("/temp")
    public String temp(@RequestParam double temp)
    {
        this.temp = temp;

        return "Temperature set to " + temp + "°C";
    }

    @GetMapping("/showAttributes")
    public String showAttributes()
    {
        return "Counter: " + counter + "\nTemperature: " + temp + "°C";
    }
}
