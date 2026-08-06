package com.zesk.focusflow.database.repository;

import org.jspecify.annotations.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;

import com.zesk.focusflow.database.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<@NonNull User, @NonNull Long> {
  Optional<User> findByUserId(Long userId);

  Optional<User> findByEmail(String email);

  void deleteByUserId(Long userId);
}
