package br.edu.ifsp.todolist.config;


import br.edu.ifsp.todolist.model.Role;
import br.edu.ifsp.todolist.model.User;
import br.edu.ifsp.todolist.repository.RoleRepository;
import br.edu.ifsp.todolist.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

@Configuration
public class AdminUserConfig implements CommandLineRunner {

    private final PasswordEncoder passwordEncoder;
    private RoleRepository roleRepository;
    private UserRepository userRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public AdminUserConfig(RoleRepository roleRepository, UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {

        var roleAdmin = roleRepository.findByRoleName(Role.Values.ADMIN.name());

        if(roleAdmin == null){
            roleAdmin = new Role();
            roleAdmin.setRoleName(Role.Values.ADMIN.name());
            roleRepository.save(roleAdmin);
        }
        var userAdmin = userRepository.findByUsername("admin");

        final var roleFinal = roleAdmin;

        userAdmin.ifPresentOrElse(
                (user) -> {
                    System.out.println("Admin ja existe");

                },
                () -> {
                    var user = new User();
                    user.setUsername("admin");
                    user.setPassword(passwordEncoder.encode("123456"));
                    user.setRoles(Set.of(roleFinal));
                    userRepository.save(user);
                }
        );

        var roleUser = roleRepository.findByRoleName(Role.Values.USER.name());

        if(roleUser == null){
            roleUser = new Role();
            roleUser.setRoleName(Role.Values.USER.name());
            roleRepository.save(roleUser);
        }
        var userUser = userRepository.findByUsername("user");

        var userRole = roleRepository.findByRoleName(Role.Values.USER.name());

        userUser.ifPresentOrElse(
                (user) -> {
                    System.out.println("Usuario ja existe");

                },
                () -> {
                    var user = new User();
                    user.setUsername("user");
                    user.setPassword(passwordEncoder.encode("123456"));
                    user.setRoles(Set.of(userRole));
                    userRepository.save(user);
                }
        );
    }
}
