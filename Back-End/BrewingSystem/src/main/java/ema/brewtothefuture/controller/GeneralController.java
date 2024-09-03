package ema.brewtothefuture.controller;

import ema.brewtothefuture.model.system.api.BrewingSystem;
import ema.brewtothefuture.service.BrewingSystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Random;

@RestController
public class GeneralController {
    private final BrewingSystem brewingSystem;

    @Autowired
    public GeneralController(BrewingSystemService brewingSystemService) {
        this.brewingSystem = brewingSystemService;
    }

    @GetMapping({ "api/health", "/", "health" })
    public String health() {
        List<String> sentences = List.of(
                "Why did the scarecrow win an award? Because he was outstanding in his field!",
                "I'm reading a book on the history of glue. I just can't seem to put it down!",
                "Why don't scientists trust atoms? Because they make up everything!",
                "What do you call a fish wearing a crown? A kingfish!",
                "Why did the tomato turn red? Because it saw the salad dressing!",
                "What do you call a factory that makes okay products? A satisfactory!",
                "Why did the math book look sad? Because it had too many problems!",
                "What do you call a belt made out of watches? A waist of time!",
                "Matan Ma Lo Purim Hayom?",
                "Adi Raza and Zodeket",
                "Eyal HaMelech",
                "BBZNOT");
        Random random = new Random();
        int index = random.nextInt(sentences.size());

        return sentences.get(index);
    }

    @GetMapping("/user/details")
    public String getUserDetails(@AuthenticationPrincipal OAuth2User principal) {
        String username = principal.getAttribute("name");
        String email = principal.getAttribute("email");
        String picture = principal.getAttribute("picture");
        return "Username: " + username + ", Email: " + email + ", Picture: " + picture;
    }

    /******* debug endpoint *******/
    @PostMapping("debug/notification/")
    public void debugNotification(@RequestParam String notification, @RequestParam String userId) {
        brewingSystem.addNotification(userId, notification);
    }

    @GetMapping("api/init/load_data")
    public void loadData() {
        brewingSystem.loadData();
    }
}
