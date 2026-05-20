package com.zesk.focusflow.database.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.zesk.focusflow.database.entity.UserHobbies;

public interface UserHobbiesRepository extends JpaRepository<UserHobbies, Long>{
  @Query("""
    select h.name
    from UserHobbies uh
    join uh.hobbies h
    where uh.user.userId = :userId
  """)
  List<String> findHobbynamesByUserId(@Param("userId") Long userId);
}
