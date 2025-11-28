package br.edu.ifsp.todolist.model;



import jakarta.persistence.*;

@Entity
public class Role {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roleId;

    private String roleName;

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }


    public enum Values{
        USER(2L),
        ADMIN(1L);


        Long roleId;

        Values(Long roleId) {
            this.roleId = roleId;
        }

        public Long getRoleId() {
            return roleId;
        }
    }
}
