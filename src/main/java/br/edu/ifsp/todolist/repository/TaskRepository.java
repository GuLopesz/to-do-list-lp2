package br.edu.ifsp.todolist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.edu.ifsp.todolist.model.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long>{

    
} 
