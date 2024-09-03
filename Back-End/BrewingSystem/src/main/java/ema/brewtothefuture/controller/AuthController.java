package ema.brewtothefuture.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {


//    @GetMapping("/auth/google")
//    public void googleLogin(HttpServletResponse response) throws IOException {
//        String redirectUrl = "https://accounts.google.com/o/oauth2/auth?" +
//                "client_id=" + CLIENT_ID +
//                "&redirect_uri=" + REDIRECT_URI +
//                "&response_type=code" +
//                "&scope=profile email";
//        response.sendRedirect(redirectUrl);
//    }

    @GetMapping("/auth/callback")
    public ResponseEntity<?> callback(@RequestParam String code) {
        // Handle the OAuth2 callback, exchange code for tokens, and create a session
        // Return user information or tokens to the client
        return ResponseEntity.ok().build();
    }

//    @GetMapping("/login/oauth2/code/google")
//    public String handleGoogleCallback(Authentication authentication) {
//        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
//        // Log or process user information as needed
//        System.out.println("OAuth2 User: " + oauth2User.getAttributes());
//        return "redirect:/home"; // Redirect to a secured page after login
//    }
}