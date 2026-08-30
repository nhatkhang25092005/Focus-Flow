package com.zesk.focusflow.database.repository;

import org.jspecify.annotations.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import com.zesk.focusflow.database.entity.Task;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface TaskRepository extends JpaRepository<@NonNull Task, @NonNull Long> {

  @Query("""
    SELECT COALESCE(MAX(t.position), 0)
    FROM Task t
    WHERE t.user.userId = :userId
      AND t.group.groupId = :groupId
  """)
  Long findMaxPositionByGroup(@Param("userId") Long userId, @Param("groupId") Long groupId);

  @Query("""
    SELECT COALESCE(MAX(t.position), 0)
    FROM Task t
    WHERE t.user.userId = :userId
      AND t.group IS NULL
  """)
  Long findMaxPositionNoGroup(@Param("userId") Long userId);
}
