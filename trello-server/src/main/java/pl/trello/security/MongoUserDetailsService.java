package pl.trello.security;

import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.trello.model.Role;
import pl.trello.model.User;
import pl.trello.repository.RoleRepository;
import pl.trello.repository.UserRepository;

import javax.annotation.PostConstruct;
import java.util.Collections;

@Service
public class MongoUserDetailsService implements UserDetailsService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;

    public MongoUserDetailsService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
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
        Role role = roleRepository.findByName("ADMIN")
                .orElseGet(() -> roleRepository.save(Role.builder().name("ADMIN").build()));
        userRepository.findByUsername("trellox").orElseGet(() ->
            userRepository.save(User.builder()
                    .username("trellox")
                    .password(passwordEncoder.encode("trello"))
                    .email("admin@trello.pl")
                    .roles(Collections.singleton(role)).build()));
    }
}
