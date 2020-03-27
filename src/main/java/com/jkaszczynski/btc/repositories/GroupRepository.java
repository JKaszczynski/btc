package com.jkaszczynski.btc.repositories;

import com.jkaszczynski.btc.entities.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GroupRepository extends JpaRepository<Group, Long> {
    List<Group> findAllByTopicId(Long topicId);
}
