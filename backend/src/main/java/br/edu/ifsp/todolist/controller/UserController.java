package br.edu.ifsp.todolist.controller;

import br.edu.ifsp.todolist.controller.dto.CreateUserDTO;
import br.edu.ifsp.todolist.model.Role;
import br.edu.ifsp.todolist.model.User;
import br.edu.ifsp.todolist.repository.RoleRepository;
import br.edu.ifsp.todolist.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Set;

@RestController
public class UserController {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository, RoleRepository roleRepository, BCryptPasswordEncoder bCryptPasswordEncoder, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/users")
    @Transactional
    public ResponseEntity<Void> newUser(@RequestBody CreateUserDTO createUserDTO) {

        var basicRole = roleRepository.findByRoleName(Role.Values.USER.name());
        var userFromDb = userRepository.findByUsername(createUserDTO.username());
        if(userFromDb.isPresent()) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY);
        }

        var user = new User();
        user.setUsername(createUserDTO.username());
        user.setPassword(passwordEncoder.encode(createUserDTO.password()));
        user.setRoles(Set.of(basicRole));
        userRepository.save(user);

        return ResponseEntity.ok().build();
    }
}
