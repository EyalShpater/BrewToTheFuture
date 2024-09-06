package ema.brewtothefuture.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
//                .csrf().disable() // Disable CSRF for simplicity (use cautiously in production)
                .authorizeHttpRequests(authorizeRequests ->
                                               authorizeRequests
                                                       .requestMatchers("/api/public/**", "/", "api/embedded/**").permitAll() // Public endpoints
                                                       .anyRequest().authenticated() // Secure all other endpoints
                                      )
                .oauth2Login() // Enable OAuth2 Login
                .and()
                .oauth2ResourceServer(oauth2 ->
                                              oauth2.jwt()// Configuring the resource server to accept JWT tokens
                                     );

        return http.build();
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        // Replace this with your actual JWT issuer's public key or JWKS URI
        String jwkSetUri = "https://www.googleapis.com/oauth2/v3/certs";
        return NimbusJwtDecoder.withJwkSetUri(jwkSetUri)
                               .build();
    }
}
