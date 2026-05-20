package com.zesk.focusflow.database.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zesk.focusflow.database.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByUserId(Long userId);

  Optional<User> findByEmail(String email);
}
