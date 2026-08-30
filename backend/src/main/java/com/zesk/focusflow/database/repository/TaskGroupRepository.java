package com.zesk.focusflow.database.repository;

import org.jspecify.annotations.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import com.zesk.focusflow.database.entity.TaskGroup;

public interface TaskGroupRepository extends JpaRepository<@NonNull TaskGroup, @NonNull Long> {
}
