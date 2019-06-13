package pl.trello.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.trello.core.AlreadyExistsException;
import pl.trello.core.NotFoundException;
import pl.trello.core.UserData;
import pl.trello.model.Authority;
import pl.trello.model.User;
import pl.trello.repository.AuthorityRepository;
import pl.trello.repository.ImageRepository;
import pl.trello.repository.UserRepository;

import java.util.Collections;
import java.util.List;

@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    private UserRepository userRepository;
    private ImageRepository imageRepository;
    private AuthorityRepository authorityRepository;
    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, ImageRepository imageRepository,
                       AuthorityRepository authorityRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.imageRepository = imageRepository;
        this.authorityRepository = authorityRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User getById(String userId) throws NotFoundException {
        return userRepository.findById(userId).orElseThrow(() -> new NotFoundException("User not found"));
    }

    public void create(UserData userData) throws AlreadyExistsException, NotFoundException {
        if (userRepository.existsByUsername(userData.getUsername())) {
            throw new AlreadyExistsException("User with username '" + userData.getUsername() + "' already exists");
        } else if (userRepository.existsByEmail(userData.getEmail())) {
            throw new AlreadyExistsException("User with email '" + userData.getEmail() + "' already exists");
        }
        logger.info("username: {}", userData.getUsername());
        User u = userRepository.save(build(userData));
        logger.info("username u: {}", u.getPassword());
    }

    public void setImageId(String userId, String imageId) throws NotFoundException {
        User user = getById(userId);
        if (user.getImageId() != null) {
            imageRepository.deleteById(user.getImageId());
        }
        user.setImageId(imageId);
        userRepository.save(user);
    }

    public List<User> search(String pattern) {
        return userRepository.findAllByUsernameStartsWithIgnoreCase(pattern);
    }

    private User build(UserData userData) throws NotFoundException {
        return User.builder()
            .username(userData.getUsername())
            .email(userData.getEmail())
            .password(passwordEncoder.encode(userData.getPassword()))
            .authorities(Collections.singleton(getAuthority("USER")))
            .build();
    }

    private Authority getAuthority(String authority) throws NotFoundException {
        return authorityRepository.findByAuthority(authority)
                .orElseThrow(() -> new NotFoundException("Authority not found"));
    }
}
