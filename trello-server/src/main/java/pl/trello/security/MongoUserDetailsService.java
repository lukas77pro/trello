package pl.trello.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.trello.model.Authority;
import pl.trello.model.User;
import pl.trello.repository.AuthorityRepository;
import pl.trello.repository.UserRepository;

import javax.annotation.PostConstruct;
import java.util.Collections;

@Service
public class MongoUserDetailsService implements UserDetailsService {

    private UserRepository userRepository;
    private AuthorityRepository authorityRepository;
    private PasswordEncoder passwordEncoder;

    public MongoUserDetailsService(UserRepository userRepository, AuthorityRepository authorityRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.authorityRepository = authorityRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository
                .findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User '" + username + "' not found"));
    }

    @PostConstruct
    public void init() {
        Authority authority = authorityRepository.findByAuthority("ADMIN")
                .orElseGet(() -> authorityRepository.save(Authority.builder().authority("ADMIN").build()));
        authorityRepository.findByAuthority("USER")
                .orElseGet(() -> authorityRepository.save(Authority.builder().authority("USER").build()));
        userRepository.findByUsername("trello").orElseGet(() ->
            userRepository.save(User.builder()
                    .username("trello")
                    .password(passwordEncoder.encode("trello"))
                    .email("admin@trello.pl")
                    .authorities(Collections.singleton(authority)).build()));
    }
}
